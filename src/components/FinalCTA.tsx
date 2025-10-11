import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="section-spacing bg-gradient-to-b from-background to-card/50">
      <div className="container-studio text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Structure Your Mind.<br />Execute With Control.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Performance is trained. Join The Studio and start rewiring your process.
          </p>
          <Button variant="hero" size="lg" className="group">
            Join The Studio Free
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
