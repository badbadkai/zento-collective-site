import React from "react";
import { Compass, Repeat, Users } from "lucide-react";

export const Solution = () => {
  const pillars = [
    {
      icon: Compass,
      title: "Your Personal Trading Blueprint",
      description: "A fully defined trading framework tailored to your style, covering market conditions, setup logic, risk parameters, and execution rules."
    },
    {
      icon: Repeat,
      title: "A Repeatable Execution Process",
      description: "Clear operating rules that govern when you trade, when you stop, and how you manage risk. This replaces emotional decisions with consistency and control."
    },
    {
      icon: Users,
      title: "A Structured Environment for Accountability",
      description: "Guided progression, shared standards, and structured review systems designed to keep you aligned with your process, not distracted by noise or shortcuts."
    }
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-studio">
        {/* Heading and Subheadline */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            The First Market Is Your Mind
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Before performance can be improved, decision-making must be structured. In Greenridge Studios, we provide three foundational pillars to make this possible:
          </p>
        </div>

        {/* Three Value Pillars */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 md:p-8 rounded-lg border-2 bg-card/50 border-border hover:border-primary/50 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-primary mb-4 md:mb-5" />
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
                  {pillar.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solution;