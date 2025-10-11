import { Brain, Database, Users2 } from "lucide-react";

export const Credibility = () => {
  const pillars = [
    {
      icon: Database,
      title: "Data Discipline",
      description: "Every decision recorded, reviewed, refined.",
    },
    {
      icon: Brain,
      title: "Cognitive Control",
      description: "Systems that reduce emotional variance.",
    },
    {
      icon: Users2,
      title: "Peer Calibration",
      description: "Learn from other process-driven traders.",
    },
  ];

  const stats = [
    "Over 500 traders joined the early access waitlist.",
    "Average journaling time per day: 6 minutes.",
  ];

  return (
    <section className="section-spacing">
      <div className="container-studio">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Built on Process,<br />Not Promises.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            The Studio applies principles from cognitive psychology, habit formation, 
            and performance science to the craft of trading.
          </p>
          <p className="text-xl font-medium">
            You don't need motivation — you need a mechanism.
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

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="px-8 py-4 rounded-lg bg-muted text-center animate-fade-in"
              style={{ animationDelay: `${0.6 + index * 0.2}s` }}
            >
              <p className="text-sm font-medium">{stat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
