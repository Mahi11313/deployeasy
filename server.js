import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import simpleGit from "simple-git";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// In-memory storage for analysis results (in production, use a real database)
const analysisStorage = new Map();

// Verify required environment variables at startup
const clientId = process.env.VITE_GITHUB_CLIENT_ID;
const clientSecret = process.env.VITE_GITHUB_CLIENT_SECRET;
const redirectUri = process.env.VITE_GITHUB_REDIRECT_URI || "http://localhost:8080/auth/github/callback";

// Validate environment variables
if (!clientId || !clientSecret) {
  console.error("❌ ERROR: Missing required environment variables!");
  console.error("Required variables:");
  console.error("  - VITE_GITHUB_CLIENT_ID:", clientId ? "✓ Set" : "✗ Missing");
  console.error("  - VITE_GITHUB_CLIENT_SECRET:", clientSecret ? "✓ Set" : "✗ Missing");
  console.error("\nPlease add these to your .env file and restart the server.");
  process.exit(1);
}

// Log configuration (without exposing secrets)
console.log("✅ GitHub OAuth Configuration:");
console.log("  - Client ID:", clientId ? `${clientId.substring(0, 8)}...` : "Missing");
console.log("  - Client Secret:", clientSecret ? "✓ Set (hidden)" : "Missing");
console.log("  - Redirect URI:", redirectUri);

// Middleware
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GitHub OAuth endpoint - accepts both GET (query) and POST (body)
app.get("/oauth/github", async (req, res) => {
  try {
    const { code } = req.query;

    console.log("📥 GET /oauth/github - Received request", {
      hasCode: !!code,
      codeLength: code ? String(code).length : 0,
      clientIdSet: !!clientId,
    });

    if (!code) {
      console.error("❌ Missing authorization code in request");
      return res.status(400).json({ 
        error: "Missing authorization code",
        error_description: "The 'code' parameter is required" 
      });
    }

    await handleGitHubTokenExchange(code, res);
  } catch (error) {
    console.error("❌ Error in GitHub OAuth GET endpoint:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
});

app.post("/oauth/github", async (req, res) => {
  try {
    const { code } = req.body;

    console.log("📥 POST /oauth/github - Received request", {
      hasCode: !!code,
      codeLength: code ? String(code).length : 0,
      clientIdSet: !!clientId,
    });

    if (!code) {
      console.error("❌ Missing authorization code in request body");
      return res.status(400).json({ 
        error: "Missing authorization code",
        error_description: "The 'code' parameter is required in request body" 
      });
    }

    await handleGitHubTokenExchange(code, res);
  } catch (error) {
    console.error("❌ Error in GitHub OAuth POST endpoint:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
});

// Helper function to exchange code for token
async function handleGitHubTokenExchange(code, res) {
  try {
    console.log("🔄 Starting GitHub token exchange", {
      codeLength: String(code).length,
      redirectUri,
    });

    // Exchange code for access token using native fetch (Node 18+)
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: String(code),
        redirect_uri: redirectUri,
      }).toString(),
    });

    console.log("📤 GitHub token exchange response:", {
      status: tokenResponse.status,
      statusText: tokenResponse.statusText,
      ok: tokenResponse.ok,
    });

    // Parse response
    let tokenData;
    try {
      const responseText = await tokenResponse.text();
      tokenData = JSON.parse(responseText);
      console.log("📋 GitHub response data:", {
        hasAccessToken: !!tokenData.access_token,
        hasError: !!tokenData.error,
        error: tokenData.error || null,
        errorDescription: tokenData.error_description || null,
      });
    } catch (parseError) {
      console.error("❌ Failed to parse GitHub response:", parseError);
      throw new Error("Invalid response format from GitHub");
    }

    // Handle GitHub error responses
    if (!tokenResponse.ok || tokenData.error) {
      const errorMsg = tokenData.error_description || tokenData.error || "Unknown error";
      console.error("❌ GitHub OAuth error:", {
        status: tokenResponse.status,
        error: tokenData.error,
        error_description: tokenData.error_description,
        fullResponse: tokenData,
      });
      
      return res.status(tokenResponse.ok ? 400 : tokenResponse.status).json({ 
        error: tokenData.error || "token_exchange_failed",
        error_description: errorMsg,
      });
    }

    // Verify access token is present
    if (!tokenData.access_token) {
      console.error("❌ No access token in response:", tokenData);
      return res.status(500).json({ 
        error: "invalid_response",
        error_description: "GitHub did not return an access token" 
      });
    }

    console.log("✅ Token exchange successful");

    // Return only the token data (never expose client_secret)
    res.json({
      access_token: tokenData.access_token,
      token_type: tokenData.token_type || "bearer",
      scope: tokenData.scope,
    });
  } catch (error) {
    console.error("❌ Error in GitHub token exchange:", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

// Repository Analysis Functions
async function generateRepoMetadata(projectPath) {
  const metadata = {
    packageJson: null,
    dockerfile: null,
    envFile: null,
    readme: null,
    fileTree: ""
  };

  try {
    // Read package.json
    const packageJsonPath = path.join(projectPath, "package.json");
    if (await fs.pathExists(packageJsonPath)) {
      metadata.packageJson = await fs.readFile(packageJsonPath, "utf8");
    }

    // Read Dockerfile
    const dockerfilePath = path.join(projectPath, "Dockerfile");
    if (await fs.pathExists(dockerfilePath)) {
      metadata.dockerfile = await fs.readFile(dockerfilePath, "utf8");
    }

    // Read .env or .env.example
    const envPaths = [".env", ".env.example", ".env.local"];
    for (const envPath of envPaths) {
      const fullEnvPath = path.join(projectPath, envPath);
      if (await fs.pathExists(fullEnvPath)) {
        metadata.envFile = await fs.readFile(fullEnvPath, "utf8");
        break;
      }
    }

    // Read README.md
    const readmePaths = ["README.md", "readme.md", "README.txt"];
    for (const readmePath of readmePaths) {
      const fullReadmePath = path.join(projectPath, readmePath);
      if (await fs.pathExists(fullReadmePath)) {
        metadata.readme = await fs.readFile(fullReadmePath, "utf8");
        break;
      }
    }

    // Generate file tree
    metadata.fileTree = await generateFileTree(projectPath);

    // Also check for other common files
    const otherFiles = ["requirements.txt", "pyproject.toml", "composer.json", "Procfile", "go.mod", "Cargo.toml"];
    for (const file of otherFiles) {
      const filePath = path.join(projectPath, file);
      if (await fs.pathExists(filePath)) {
        const content = await fs.readFile(filePath, "utf8");
        metadata[file.replace(".", "_")] = content;
      }
    }

  } catch (error) {
    console.error("Error generating repo metadata:", error);
  }

  return metadata;
}

async function generateFileTree(dirPath, prefix = "", maxDepth = 3, currentDepth = 0) {
  if (currentDepth >= maxDepth) return "";
  
  let tree = "";
  try {
    const items = await fs.readdir(dirPath);
    const filteredItems = items.filter(item => 
      !item.startsWith('.') || 
      ['.env', '.env.example', '.gitignore'].includes(item)
    ).slice(0, 20); // Limit items to prevent huge trees

    for (let i = 0; i < filteredItems.length; i++) {
      const item = filteredItems[i];
      const itemPath = path.join(dirPath, item);
      const isLast = i === filteredItems.length - 1;
      const currentPrefix = isLast ? "└── " : "├── ";
      
      try {
        const stats = await fs.stat(itemPath);
        tree += `${prefix}${currentPrefix}${item}\n`;
        
        if (stats.isDirectory() && currentDepth < maxDepth - 1) {
          const nextPrefix = prefix + (isLast ? "    " : "│   ");
          tree += await generateFileTree(itemPath, nextPrefix, maxDepth, currentDepth + 1);
        }
      } catch (err) {
        // Skip items that can't be accessed
        continue;
      }
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }
  
  return tree;
}

async function analyzeWithGemini(metadata) {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  
  if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }

  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are a deployment analysis engine. Return JSON only.

Repository metadata:
PACKAGE_JSON: ${metadata.packageJson || "none"}
DOCKERFILE: ${metadata.dockerfile || "none"}
ENV_FILE: ${metadata.envFile || "none"}
README: ${metadata.readme || "none"}
FILE_TREE: ${metadata.fileTree || "none"}

Extract and respond in JSON with:
- stack
- framework
- buildCommand
- startCommand
- requiredEnv
- recommendedEnvTemplate
- deploymentType
- notes`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up the response to extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in Gemini response");
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error analyzing with Gemini:", error);
    throw error;
  }
}

// Repository Analysis Endpoints
app.post("/api/analyze-repo", async (req, res) => {
  try {
    const { repoUrl } = req.body;
    
    if (!repoUrl) {
      return res.status(400).json({ error: "Repository URL is required" });
    }

    // Validate GitHub URL
    const githubUrlPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/;
    if (!githubUrlPattern.test(repoUrl)) {
      return res.status(400).json({ error: "Invalid GitHub repository URL" });
    }

    console.log("🔍 Starting repository analysis for:", repoUrl);

    // Create temporary directory
    const tempDir = path.join(__dirname, "temp", `repo-${Date.now()}`);
    await fs.ensureDir(tempDir);

    try {
      // Clone repository
      console.log("📥 Cloning repository...");
      const git = simpleGit();
      await git.clone(repoUrl, tempDir, ["--depth", "1"]);

      // Generate metadata
      console.log("📊 Generating metadata...");
      const metadata = await generateRepoMetadata(tempDir);

      // Analyze with Gemini
      console.log("🤖 Analyzing with Gemini...");
      const analysis = await analyzeWithGemini(metadata);

      // Store analysis result
      const repoId = repoUrl.replace("https://github.com/", "").replace("/", "-");
      analysisStorage.set(repoId, {
        ...analysis,
        repoUrl,
        analyzedAt: new Date().toISOString()
      });

      console.log("✅ Analysis completed successfully");

      res.json({
        success: true,
        repoId,
        analysis
      });

    } finally {
      // Clean up temporary directory
      try {
        await fs.remove(tempDir);
      } catch (cleanupError) {
        console.error("Warning: Failed to clean up temp directory:", cleanupError);
      }
    }

  } catch (error) {
    console.error("❌ Error analyzing repository:", error);
    res.status(500).json({ 
      error: "Analysis failed", 
      message: error.message 
    });
  }
});

app.get("/api/analysis/:repoId", (req, res) => {
  try {
    const { repoId } = req.params;
    const analysis = analysisStorage.get(repoId);
    
    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }
    
    res.json(analysis);
  } catch (error) {
    console.error("❌ Error fetching analysis:", error);
    res.status(500).json({ error: "Failed to fetch analysis" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok",
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY
  });
});

app.listen(PORT, () => {
  console.log("\n🚀 Backend server started");
  console.log(`   URL: http://localhost:${PORT}`);
  console.log(`   GitHub OAuth endpoint: http://localhost:${PORT}/oauth/github`);
  console.log(`   Repository analysis endpoint: http://localhost:${PORT}/api/analyze-repo`);
  console.log(`   Health check: http://localhost:${PORT}/health\n`);
});

