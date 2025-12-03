import { Brain, ClipboardList, TrendingDown } from "lucide-react";

export const Problem = () => {
  const painPoints = [
    {
      icon: Brain,
      title: "Cognitive Bias",
      description: "Decision-making distorted by emotion and pattern-seeking errors.",
    },
    {
      icon: ClipboardList,
      title: "No Feedback Loop",
      description: "Execution without data creates behavioral drift.",
    },
    {
      icon: TrendingDown,
      title: "Process Variability",
      description: "Inconsistent routines produce inconsistent outcomes.",
    },
  ];

  return (
    <section className="section-spacing">
      <div className="container-studio">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            The Mind Is the First Market
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-3 md:mb-4">
            Most trading errors originate from cognitive bias, not strategy failure.
          </p>
          <p className="text-sm sm:text-lg md:text-xl font-medium text-foreground">
            The Studio targets those distortions through structured reflection and feedback-based behavior systems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          {painPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-5 md:p-8 rounded-lg bg-card border border-border hover:border-primary transition-studio animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 md:w-24 md:h-24 mb-4 md:mb-6 rounded-lg flex items-center justify-center bg-primary/10 animate-pulse">
                  <IconComponent className="w-8 h-8 md:w-12 md:h-12 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{point.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{point.description}</p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Behavioral variance accounts for the majority of performance inconsistency.
        </p>
      </div>
    </section>
  );
};
