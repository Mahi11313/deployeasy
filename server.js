import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

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

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log("\n🚀 Backend server started");
  console.log(`   URL: http://localhost:${PORT}`);
  console.log(`   GitHub OAuth endpoint: http://localhost:${PORT}/oauth/github`);
  console.log(`   Health check: http://localhost:${PORT}/health\n`);
});

