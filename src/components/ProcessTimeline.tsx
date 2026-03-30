import { UserPlus, BookOpen, Target, TrendingUp } from "lucide-react";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

export const ProcessTimeline = () => {
  const steps = [
    {
      icon: UserPlus,
      step: "01",
      title: "Enter the Environment",
      description:
        "Gain immediate access to our private workspace, curated resources, and proven frameworks.",
    },
    {
      icon: BookOpen,
      step: "02",
      title: "Absorb the Foundations",
      description:
        "Navigate our structured curriculum, from market mechanics and psychology to advanced risk protocols.",
    },
    {
      icon: Target,
      step: "03",
      title: "Construct Your System",
      description:
        "Develop a personalised trading architecture with documented rules, defined setups, and clear parameters.",
    },
    {
      icon: TrendingUp,
      step: "04",
      title: "Execute with Precision",
      description:
        "Deploy your framework in live conditions with peer accountability and continuous refinement.",
    },
  ];

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />

      <div className="container-studio relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            The Progression
          </p>
          <h2
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-4"
>
            Four Phases to{" "}
            <span className="text-primary">Operational Mastery</span>
          </h2>
          <p
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto"
>
            A systematic pathway from foundational understanding to
            confident, disciplined execution.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line - desktop */}
            <div className="hidden md:block absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {/* Steps */}
            <ScrollRevealGroup className="grid md:grid-cols-4 gap-8 md:gap-4" staggerDelay={150}>
              {steps.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="relative"
                  >
                    {/* Mobile connecting line */}
                    {index < steps.length - 1 && (
                      <div className="md:hidden absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary/40 to-primary/10" />
                    )}

                    {/* Step content */}
                    <div className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center">
                      {/* Icon circle */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors">
                          <IconComponent className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                        </div>
                        {/* Step number badge */}
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                      </div>

                      {/* Text content */}
                      <div className="md:mt-6">
                        <h3 className="font-heading text-lg md:text-xl font-semibold mb-2 text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollRevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
