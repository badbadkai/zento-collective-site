import { Brain, ClipboardList, TrendingDown } from "lucide-react";

export const Problem = () => {
  const painPoints = [
    {
      icon: Brain,
      title: "Emotional Entries",
      description: "Reacting to candles, not context.",
    },
    {
      icon: ClipboardList,
      title: "No Review Process",
      description: "Trading blind without data feedback.",
    },
    {
      icon: TrendingDown,
      title: "Inconsistent Routine",
      description: "No daily structure or performance tracking.",
    },
  ];

  return (
    <section className="section-spacing">
      <div className="container-studio">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discipline fails when systems do not exist
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            You know your setups. You know your rules. Yet emotion, fatigue, and overconfidence ruin execution.
          </p>
          <p className="text-lg md:text-xl font-medium text-foreground">
            The Studio fixes the human variable with structure and systemization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {painPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 rounded-lg bg-card border border-border hover:border-primary transition-studio animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-24 h-24 mb-6 rounded-lg flex items-center justify-center bg-primary/10">
                  <IconComponent className="w-12 h-12 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3">{point.title}</h3>
                <p className="text-muted-foreground">{point.description}</p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          The data doesn't lie — 90% of losses trace back to process failure, not strategy.
        </p>
      </div>
    </section>
  );
};
