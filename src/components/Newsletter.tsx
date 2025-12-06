import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: integrate with your email provider / API
    console.log("Newsletter signup:", email);
    setSubmitted(true);
  };

  return (
    <section className="section-spacing bg-card/10">
      <div className="container-studio">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Join our newsletter</h3>
          <p className="text-muted-foreground mb-6">Get updates, research notes, and early access to mentorship slots. Cancel anytime.</p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Input
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto"
                aria-label="Email address"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          ) : (
            <div className="text-primary font-medium">Thanks — you’re subscribed.</div>
          )}
        </div>
      </div>
    </section>
  );
};
