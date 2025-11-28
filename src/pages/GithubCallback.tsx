import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function GithubCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const storedState = sessionStorage.getItem("github_oauth_state");
    const error = searchParams.get("error");

    // Handle OAuth error
    if (error) {
      toast({
        title: "Authentication Failed",
        description: "GitHub authentication was cancelled or failed.",
        variant: "destructive",
      });
      sessionStorage.removeItem("github_oauth_state");
      navigate("/auth");
      return;
    }

    // Validate state parameter
    if (!code || state !== storedState) {
      console.error("Invalid OAuth response:", { hasCode: !!code, stateMatch: state === storedState });
      toast({
        title: "Authentication Failed",
        description: "Invalid authentication response from GitHub.",
        variant: "destructive",
      });
      sessionStorage.removeItem("github_oauth_state");
      navigate("/auth");
      return;
    }

    // Exchange code for access token via backend
    const exchangeToken = async () => {
      try {
        console.log("🔄 Starting token exchange via backend");

        // Call backend endpoint to exchange code for token
        const tokenResponse = await fetch(`/oauth/github?code=${encodeURIComponent(code)}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        // Handle non-OK responses
        if (!tokenResponse.ok) {
          let errorData;
          try {
            errorData = await tokenResponse.json();
          } catch {
            errorData = { error: "Unknown error", error_description: `HTTP ${tokenResponse.status}` };
          }
          
          console.error("❌ Backend token exchange failed:", errorData);
          throw new Error(errorData.error_description || errorData.error || `Token exchange failed: ${tokenResponse.status}`);
        }

        // Parse response
        const tokenData = await tokenResponse.json();

        // Verify access_token is present
        if (!tokenData.access_token) {
          console.error("❌ No access_token in response:", tokenData);
          throw new Error("No access token received from backend");
        }

        console.log("✅ Token received, fetching user info");

        // Get user info from GitHub using the access token
        const userResponse = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            Accept: "application/json",
          },
        });

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user info: ${userResponse.status}`);
        }

        const userInfo = await userResponse.json();

        // Get user email (may need separate API call)
        let email = userInfo.email;
        if (!email) {
          try {
            const emailResponse = await fetch("https://api.github.com/user/emails", {
              headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
                Accept: "application/json",
              },
            });
            
            if (emailResponse.ok) {
              const emails = await emailResponse.json();
              email = emails.find((e: any) => e.primary)?.email || emails[0]?.email || "";
            }
          } catch (emailError) {
            console.error("Failed to fetch email:", emailError);
          }
          
          if (!email) {
            email = `${userInfo.login}@users.noreply.github.com`;
          }
        }

        // Format user data similar to Google auth
        const formattedUser = {
          name: userInfo.name || userInfo.login,
          email: email || `${userInfo.login}@users.noreply.github.com`,
          avatar: userInfo.avatar_url,
          login: userInfo.login,
        };

        console.log("✅ User authenticated:", formattedUser.login);

        toast({
          title: "GitHub Connected",
          description: `Welcome, ${formattedUser.name || formattedUser.login}!`,
        });

        // Store user info (never store client_secret)
        localStorage.setItem("user", JSON.stringify(formattedUser));
        localStorage.setItem("authToken", tokenData.access_token);
        localStorage.setItem("authProvider", "github");

        // Clean up
        sessionStorage.removeItem("github_oauth_state");

        navigate("/dashboard");
      } catch (error) {
        console.error("❌ GitHub auth error:", error);
        
        let errorMessage = "Failed to authenticate with GitHub. Please try again.";
        
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        toast({
          title: "Authentication Failed",
          description: errorMessage,
          variant: "destructive",
        });
        sessionStorage.removeItem("github_oauth_state");
        navigate("/auth");
      }
    };

    exchangeToken();
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg font-medium">Completing GitHub authentication...</p>
        <p className="text-sm text-muted-foreground mt-2">Please wait while we sign you in.</p>
      </div>
    </div>
  );
}

