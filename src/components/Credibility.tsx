import { Brain, Database, Users2 } from "lucide-react";

export const Credibility = () => {
  const pillars = [
    {
      icon: Database,
      title: "Feedback Architecture",
      description: "Continuous measurement of decision quality and execution precision.",
    },
    {
      icon: Brain,
      title: "Behavioral Regulation",
      description: "Cognitive frameworks that minimize bias-driven errors.",
    },
    {
      icon: Users2,
      title: "Collective Intelligence",
      description: "Shared process refinement through structured peer review.",
    },
  ];

  return (
    <section className="section-spacing">
      <div className="container-studio">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Grounded in Science,<br />Designed for Execution
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Built on cognitive-behavioral principles, The Studio translates research into practical systems for measurable performance improvement.
          </p>
          <p className="text-xl font-medium">
            Performance is trained, not found.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-lg bg-card border border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <pillar.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground">{pillar.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
