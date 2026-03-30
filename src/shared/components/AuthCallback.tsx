import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

/** Handles the magic link redirect — extracts tokens, creates session, redirects */
export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth callback error:", error);
        navigate("/login?error=auth_failed");
        return;
      }

      // Check remember-me preference
      const rememberMe = localStorage.getItem("zento_remember_me");
      if (rememberMe === "false") {
        // Session-only: will expire when browser closes
        // Supabase doesn't natively support session-only, but we can
        // set a flag to clear on beforeunload
        window.addEventListener("beforeunload", () => {
          supabase.auth.signOut();
        }, { once: true });
      }

      // Redirect based on hostname context
      const hostname = window.location.hostname;
      if (hostname.startsWith("admin")) {
        navigate("/");
      } else {
        navigate("/");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Signing you in...</p>
      </div>
    </div>
  );
}
