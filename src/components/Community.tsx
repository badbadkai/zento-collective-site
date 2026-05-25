import { Radio, BarChart3, Layers, MessageCircle } from "lucide-react";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

export const Community = () => {
  const features = [
    {
      icon: Radio,
      title: "Live Trading Sessions",
      description:
        "Real-time market analysis with annotated setups, live Q&A, and recordings for sessions you can't attend.",
    },
    {
      icon: BarChart3,
      title: "Trade Recaps & Market Breakdowns",
      description:
        "Post-session recaps with key levels and reasoning behind each setup. Every trade has a story — you learn it.",
    },
    {
      icon: Layers,
      title: "Resources & Learning Reinforcement",
      description:
        "Strategy deep-dives, structured activities, and practice exercises that build execution quality over time.",
    },
    {
      icon: MessageCircle,
      title: "Direct Peer & Mentor Access",
      description:
        "Trade reviews, structured discussions, and accountability with people who are actually trading — not lurking.",
    },
  ];

  return (
    <section className="section-spacing relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container-studio relative">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            What You Get
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
            What's Inside the{" "}
            <span className="text-primary">Collective</span>
          </h2>
        </ScrollReveal>

        <ScrollRevealGroup
          className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-10"
          staggerDelay={100}
        >
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div key={idx} className="flex gap-5">
                <div className="flex-shrink-0 mt-0.5">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </ScrollRevealGroup>
      </div>
    </section>
  );
};
