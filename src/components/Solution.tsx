import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Users } from "lucide-react";
import { ArrowRight } from "lucide-react";

export const Solution = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Structured Journaling",
      description: "Log, review, and iterate daily.",
    },
    {
      icon: TrendingUp,
      title: "Performance Metrics",
      description: "Win rate, expectancy, and R-multiple tracking.",
    },
    {
      icon: Users,
      title: "Accountability Loop",
      description: "Peer review and system refinement with traders who treat process as edge.",
    },
  ];

  return (
    <section className="section-spacing bg-card/50">
      <div className="container-studio">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Trade With Structure.<br />Refine With Data.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            The Studio transforms how you operate. Instead of reacting to the market, 
            you follow a designed system — reinforced by community, metrics, and cognitive discipline.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="group">
            Join the Community
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
