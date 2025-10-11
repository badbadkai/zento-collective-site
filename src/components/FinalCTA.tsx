import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="section-spacing bg-gradient-to-b from-background to-card/50">
      <div className="container-studio text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Get Mechanical.<br />Join The Studio.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            No signals. No noise. No hype.<br />
            Just structure, data, and the discipline to execute.
          </p>
          <Button variant="hero" size="lg" className="group">
            Join Free on Discord
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
