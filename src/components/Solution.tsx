import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Users } from "lucide-react";
import { ArrowRight } from "lucide-react";
export const Solution = () => {
  const features = [{
    icon: BookOpen,
    title: "Structured Reflection",
    description: "Daily decision logging with cognitive tagging."
  }, {
    icon: TrendingUp,
    title: "Quantified Behavior",
    description: "Metrics that measure execution precision and bias frequency."
  }, {
    icon: Users,
    title: "Feedback Systems",
    description: "Peer calibration and process refinement loops."
  }];
  return <section className="section-spacing bg-card/50">
      <div className="container-studio">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">The First Market Is Your Mind</h2>
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">Most trading errors originate from cognitive errors, not strategy failure. 
Greenridge Studios applies behavioral science to help traders regulate decision-making, automate discipline, and translate self-awareness into structured execution.</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          {features.map((feature, index) => <div key={index} className="flex flex-col items-center text-center p-5 md:p-8 animate-fade-in" style={{
          animationDelay: `${index * 0.2}s`
        }}>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
            </div>)}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="group" onClick={() => {
          window.location.href = 'https://whop.com/greenridge-studios/greenridge-studios-premium/?utm_source=store_page&funnelId=store_c45e4b4b-1cd0-4812-9b64-30890d429456';
        }}>
            Join Now
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>;
};