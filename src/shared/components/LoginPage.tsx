import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/shared/hooks/useAuth";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import logoLight from "@/assets/logo-dark.png";
import logoDark from "@/assets/logo-light.png";
import { useTheme } from "next-themes";
import GlitchBorder from "./GlitchBorder";

const CODE_LENGTH = 8;
const EMPTY_CODE = Array(CODE_LENGTH).fill("");

interface LoginPageProps {
  portalName: string;
}

export default function LoginPage({ portalName }: LoginPageProps) {
  const { theme } = useTheme();
  const { sendOtp, verifyOtp, session, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [step, setStep] = useState<"email" | "code">("email");
  const [code, setCode] = useState<string[]>([...EMPTY_CODE]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { document.title = `${portalName} — Sign In`; }, [portalName]);

  // Redirect once fully authenticated (session exists and auth finished loading)
  useEffect(() => {
    if (!authLoading && session) {
      navigate("/", { replace: true });
    }
  }, [session, authLoading, navigate]);

  // Focus first code input when switching to code step
  useEffect(() => {
    if (step === "code") {
      const timer = setTimeout(() => inputRefs.current[0]?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await sendOtp(email);
      if (result.error) {
        setError(result.error.message);
      } else {
        setStep("code");
        setCode([...EMPTY_CODE]);
      }
    } catch (err) {
      setError("Failed to send code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitCode = async (fullCode: string) => {
    if (fullCode.length !== CODE_LENGTH) return;

    setLoading(true);
    setError("");

    try {
      const result = await verifyOtp(email, fullCode, rememberMe);
      if (result.error) {
        setError("Invalid code. Please try again.");
        setCode([...EMPTY_CODE]);
        inputRefs.current[0]?.focus();
        setLoading(false);
      }
      // On success, the onAuthStateChange listener in useAuth will set session,
      // which triggers the redirect useEffect above.
    } catch (err) {
      setError("Verification failed. Please try again.");
      setCode([...EMPTY_CODE]);
      inputRefs.current[0]?.focus();
      setLoading(false);
    }
  };

  const handleCodeInput = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (digit && index === CODE_LENGTH - 1) {
      const full = newCode.join("");
      if (full.length === CODE_LENGTH) {
        submitCode(full);
      }
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (pasted.length === CODE_LENGTH) {
      setCode(pasted.split(""));
      inputRefs.current[CODE_LENGTH - 1]?.focus();
      submitCode(pasted);
    }
  };

  const handleResend = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await sendOtp(email);
      if (result.error) {
        setError(result.error.message);
      }
    } catch {
      setError("Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  // Don't render login form if already authenticated
  if (!authLoading && session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative h-20">
            <img
              src={logoLight}
              alt="Zento Collective"
              className={`h-20 w-auto transition-opacity duration-500 ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
            />
            <img
              src={logoDark}
              alt=""
              className={`absolute inset-0 h-20 w-auto transition-opacity duration-500 ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
            />
          </div>
        </div>

        <GlitchBorder>
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-semibold mb-1">{portalName}</h1>
            <p className="text-muted-foreground text-sm">
              {step === "email" ? "Sign in with your email" : "Enter your verification code"}
            </p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendCode} className="space-y-4">
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
                    Sending code...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-5">
              <button
                type="button"
                onClick={() => { setStep("email"); setCode([...EMPTY_CODE]); setError(""); }}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {email}
              </button>

              <div className="flex justify-center gap-1.5" onPaste={handleCodePaste}>
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeInput(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                    disabled={loading}
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    className="w-10 h-12 text-center text-lg font-semibold rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                ))}
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              {loading && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </div>
              )}

              <p className="text-center text-sm text-muted-foreground">
                Didn't receive a code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                  className="text-primary hover:underline"
                >
                  Resend
                </button>
              </p>
            </div>
          )}
        </GlitchBorder>
      </div>
    </div>
  );
}
