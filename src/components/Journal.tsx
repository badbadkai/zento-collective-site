import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import journalPreview from "@/assets/journal-preview.jpg";

export const Journal = () => {
  return (
    <section className="section-spacing">
      <div className="container-studio">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Behavior, Quantified
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              The Studio Journal tracks decision data, bias frequency, and performance metrics — transforming subjective reflection into measurable cognitive improvement.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-foreground">Automated performance calculations and expectancy tracking</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-foreground">Cognitive tagging to identify recurring bias patterns</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-foreground">Low-friction daily input designed for sustained use</p>
              </li>
            </ul>

            <Button variant="hero" size="lg" className="group">
              Get Early Access to The Journal
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={journalPreview}
                alt="Studio Journal interface showing organized metrics and trading data"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
