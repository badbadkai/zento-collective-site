import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import journalPreview from "@/assets/journal-preview.png";
export const Journal = () => {
  return <section className="section-spacing">
      <div className="container-studio">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="animate-fade-in order-2 lg:order-1">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">Your Edge, 
Quantified</h2>
            <p className="text-sm sm:text-lg text-muted-foreground mb-6 md:mb-8">The Greenridge Studios Journal helps you track your trades with clarity and consistency without overcomplicating the process. Designed to make daily journaling effortless, you can focus on improving your edge and decision-making over time.</p>

            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground">Straightforward performance tracking</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground">Cognitive tagging to identify recurring bias patterns</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground">Low-friction daily input designed for sustained use</p>
              </li>
            </ul>

            <Button variant="hero" size="lg" className="group w-full sm:w-auto">
              Get Early Access to The Journal
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="animate-fade-in order-1 lg:order-2" style={{
          animationDelay: '0.2s'
        }}>
            <div className="rounded-lg overflow-hidden border border-border">
              <img src={journalPreview} alt="Studio Journal interface showing organized metrics and trading data" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};