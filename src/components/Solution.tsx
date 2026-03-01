import { Compass, Repeat, Users } from "lucide-react";

export const Solution = () => {
  const pillars = [
    {
      icon: Compass,
      title: "Systematic Framework",
      description:
        "A comprehensive trading architecture built around your edge — covering market conditions, setup criteria, risk parameters, and precise execution rules.",
      number: "01",
    },
    {
      icon: Repeat,
      title: "Repeatable Process",
      description:
        "Documented operating procedures that eliminate guesswork. Know exactly when to engage, when to sit out, and how to manage every position objectively.",
      number: "02",
    },
    {
      icon: Users,
      title: "Structured Accountability",
      description:
        "Peer-driven progression with shared standards and systematic review protocols. Stay aligned with your process through meaningful feedback loops.",
      number: "03",
    },
  ];

  return (
    <section id="solution" className="section-spacing relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

      <div className="container-studio relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <p
            className="text-primary font-medium text-sm tracking-widest uppercase mb-4"
>
            The Foundation
          </p>
          <h2
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
>
            Structure Before
            <br />
            <span className="text-primary">Strategy</span>
          </h2>
          <p
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto"
>
            Consistent results require consistent processes. We build the
            operational foundation that transforms reactive trading into
            deliberate execution.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full p-8 md:p-10 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  {/* Number */}
                  <span className="absolute top-6 right-6 text-6xl font-heading font-bold text-muted/30 select-none">
                    {pillar.number}
                  </span>

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl md:text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solution;
