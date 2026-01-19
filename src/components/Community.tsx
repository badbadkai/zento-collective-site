import { BarChart3, BookOpen, FileText } from "lucide-react";

export const Community = () => {
  const channels = [
    {
      icon: BarChart3,
      name: "Live Market Intelligence",
      description:
        "Real-time analysis, annotated setups, and post-trade reviews from active practitioners.",
    },
    {
      icon: BookOpen,
      name: "Structured Education",
      description:
        "Modular learning paths covering foundational concepts through advanced technical frameworks.",
    },
    {
      icon: FileText,
      name: "Performance Documentation",
      description:
        "Systematic journaling protocols and pattern recognition tools for continuous improvement.",
    },
  ];

  return (
    <section className="section-spacing relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container-studio relative">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 animate-fade-in">
            The Environment
          </p>
          <h2
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            What You'll{" "}
            <span className="text-primary">Access</span>
          </h2>
          <p
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            A curated workspace designed for deliberate practice and measurable
            progression.
          </p>
        </div>

        {/* Channels */}
        <div className="max-w-3xl mx-auto space-y-4">
          {channels.map((channel, index) => {
            const IconComponent = channel.icon;
            return (
              <div
                key={index}
                className="group relative p-6 md:p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/60 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-heading text-lg md:text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {channel.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {channel.description}
                    </p>
                  </div>
                </div>

                {/* Hover accent */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary rounded-r-full group-hover:h-12 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
