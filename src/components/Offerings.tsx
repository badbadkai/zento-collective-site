import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Offerings = () => {
  const navigate = useNavigate();

  const offerings = [
    {
      id: "accelerator",
      icon: Sparkles,
      badge: "Intensive Programme",
      title: "30-Day Accelerator",
      subtitle: "For committed beginners seeking structure over chaos.",
      description:
        "Construct your complete trading system in 30 focused days. Emerge with documented rules, defined risk parameters, and operational clarity.",
      features: [
        "Personalised trading blueprint",
        "Risk framework & psychology protocols",
        "Weekly live sessions & direct feedback",
        "Prop firm readiness evaluation",
      ],
      cta: "Apply Now",
      action: () => {
        window.scrollTo(0, 0);
        navigate("/start");
      },
      highlighted: false,
    },
    {
      id: "community",
      icon: Users,
      badge: "Continuous Access",
      title: "Premium Collective",
      subtitle: "For traders who demand more than surface-level content.",
      description:
        "An exclusive environment of serious practitioners. Live analysis, advanced discussions, and the accountability that drives real progress.",
      features: [
        "Weekly live trading sessions",
        "Institutional-grade market analysis",
        "Advanced strategy deep-dives",
        "Direct peer and mentor access",
      ],
      cta: "Join the Collective",
      action: () => {
        window.location.href =
          "https://whop.com/greenridge-studios/greenridge-studios-premium/?utm_source=store_page&funnelId=store_c45e4b4b-1cd0-4812-9b64-30890d429456";
      },
      highlighted: true,
    },
  ];

  return (
    <section id="offerings" className="section-spacing relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container-studio relative">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 animate-fade-in">
            Select Your Entry
          </p>
          <h2
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Two Paths. <span className="text-primary">One Standard.</span>
          </h2>
        </div>

        {/* Offerings Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {offerings.map((offering, index) => {
            const IconComponent = offering.icon;
            return (
              <div
                key={offering.id}
                className={`group relative animate-fade-in ${
                  offering.highlighted ? "md:-mt-4 md:mb-4" : ""
                }`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div
                  className={`relative h-full p-8 md:p-10 rounded-2xl border transition-all duration-500 ${
                    offering.highlighted
                      ? "border-primary/40 bg-primary/5 hover:border-primary/60 hover:bg-primary/10"
                      : "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card"
                  } hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1`}
                >
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <div
                      className={`p-2 rounded-lg ${
                        offering.highlighted
                          ? "bg-primary/20"
                          : "bg-primary/10"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {offering.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-3 text-foreground">
                    {offering.title}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground mb-3">
                    {offering.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground mb-8">
                    {offering.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {offering.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant={offering.highlighted ? "hero" : "premium"}
                    size="lg"
                    className="w-full group/btn"
                    onClick={offering.action}
                  >
                    {offering.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>

                  {/* Highlighted indicator */}
                  {offering.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
