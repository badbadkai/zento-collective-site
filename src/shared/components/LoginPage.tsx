import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/shared/hooks/useAuth";
import { Check, Loader2, Mail } from "lucide-react";
import logoLight from "@/assets/logo-dark.png";
import logoDark from "@/assets/logo-light.png";
import { useTheme } from "next-themes";

interface LoginPageProps {
  portalName: string;
}

export default function LoginPage({ portalName }: LoginPageProps) {
  const { theme } = useTheme();
  const { signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await signInWithMagicLink(email, rememberMe);

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative h-14">
            <img
              src={logoLight}
              alt="Zento Collective"
              className={`h-14 w-auto transition-opacity duration-500 ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
            />
            <img
              src={logoDark}
              alt=""
              className={`absolute inset-0 h-14 w-auto transition-opacity duration-500 ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-semibold mb-1">{portalName}</h1>
          <p className="text-muted-foreground text-sm">Sign in with your email</p>
        </div>

        {sent ? (
          <div className="text-center p-6 rounded-xl border border-primary/20 bg-primary/5">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-semibold text-lg mb-2">Check your email</h2>
            <p className="text-muted-foreground text-sm">
              We sent a magic link to <strong>{email}</strong>. Click the link to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">
                Remember me for 30 days
              </span>
            </label>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending link...
                </>
              ) : (
                "Send Magic Link"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
