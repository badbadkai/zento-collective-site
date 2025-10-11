import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Users } from "lucide-react";
import { ArrowRight } from "lucide-react";

export const Solution = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Structured Reflection",
      description: "Daily decision logging with cognitive tagging.",
    },
    {
      icon: TrendingUp,
      title: "Quantified Behavior",
      description: "Metrics that measure execution precision and bias frequency.",
    },
    {
      icon: Users,
      title: "Feedback Systems",
      description: "Peer calibration and process refinement loops.",
    },
  ];

  return (
    <section className="section-spacing bg-card/50">
      <div className="container-studio">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Structure Converts Thought Into Consistency
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            The Studio applies behavioral science to help traders regulate decision-making, automate discipline, and translate self-awareness into structured execution.
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
            Join The Studio Free
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
