import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/shared/hooks/useAuth";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import logoLight from "@/assets/logo-dark.png";
import logoDark from "@/assets/logo-light.png";
import { useTheme } from "next-themes";
import GlitchBorder from "./GlitchBorder";

interface LoginPageProps {
  portalName: string;
}

export default function LoginPage({ portalName }: LoginPageProps) {
  const { theme } = useTheme();
  const { sendOtp, verifyOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [step, setStep] = useState<"email" | "code">("email");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first code input when step changes
  useEffect(() => {
    if (step === "code") {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await sendOtp(email);

    if (error) {
      setError(error.message);
    } else {
      setStep("code");
    }

    setLoading(false);
  };

  const handleVerifyCode = async (fullCode?: string) => {
    const codeStr = fullCode || code.join("");
    if (codeStr.length !== 6) return;

    setLoading(true);
    setError("");

    const { error } = await verifyOtp(email, codeStr, rememberMe);

    if (error) {
      setError("Invalid code. Please try again.");
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }

    setLoading(false);
  };

  const handleCodeInput = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    // Auto-advance to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (digit && index === 5) {
      const fullCode = newCode.join("");
      if (fullCode.length === 6) {
        handleVerifyCode(fullCode);
      }
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newCode = pasted.split("");
      setCode(newCode);
      inputRefs.current[5]?.focus();
      handleVerifyCode(pasted);
    }
  };

  const handleResend = async () => {
    setError("");
    setLoading(true);
    const { error } = await sendOtp(email);
    if (error) {
      setError(error.message);
    } else {
      setError("");
    }
    setLoading(false);
  };

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
                    Sending code...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Back button */}
              <button
                onClick={() => { setStep("email"); setCode(["", "", "", "", "", ""]); setError(""); }}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {email}
              </button>

              {/* 6-digit code input */}
              <div className="flex justify-center gap-2" onPaste={handleCodePaste}>
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
                    className="w-11 h-13 text-center text-xl font-semibold rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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
