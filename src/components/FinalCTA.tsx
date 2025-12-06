import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="section-spacing bg-gradient-to-b from-background to-card/50">
      <div className="container-studio text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Structure Your Mind.<br />Execute With Control.
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
            Performance is trained. Join Greenridge Studios and start rewiring your process.
          </p>
          <Button variant="hero" size="lg" className="group w-full sm:w-auto" onClick={() => { window.location.href = 'https://whop.com/greenridge-studios/'; }}>
            Join Now
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
