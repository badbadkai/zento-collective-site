import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setSubmitted(true);
  };

  return (
    <section className="section-spacing-sm relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container-studio relative">
        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="relative p-8 md:p-12 rounded-2xl border border-primary/20 bg-card/30 backdrop-blur-sm text-center">
            {/* Icon */}
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-7 h-7 text-primary" />
            </div>

            {/* Content */}
            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
              Stay <span className="text-primary">Connected</span>
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-md mx-auto">
              Receive market insights, research notes, and priority access to
              mentorship availability. Unsubscribe anytime.
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 justify-center max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background/50 border-border/50 focus:border-primary/50 h-12"
                  aria-label="Email address"
                  required
                />
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full sm:w-auto group"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 text-primary font-medium animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span>You're on the list.</span>
              </div>
            )}

            {/* Decorative glow */}
            <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-2xl -z-10 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};
