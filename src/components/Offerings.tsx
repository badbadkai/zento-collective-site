import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Check, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";
import { usePricing } from "@/context/PricingContext";

export const Offerings = () => {
  const navigate = useNavigate();
  const { formatPrice, formatOldCombinedPrice } = usePricing();

  const acceleratorPrice = formatPrice("accelerator");
  const collectivePrice = formatPrice("collective_monthly");
  const oldCombinedPrice = formatOldCombinedPrice();

  const offerings = [
    {
      id: "accelerator",
      icon: Sparkles,
      badge: "30-Day Programme",
      title: "The Accelerator",
      subtitle: "For complete beginners ready to build real trading foundations in 30 days.",
      featuresLabel: "",
      features: [
        "Structured daily lessons",
        "Complete trading blueprint",
        "Risk management framework",
        "Psychology and discipline system",
        "Demo execution practice",
      ],
      price: acceleratorPrice,
      priceNote: "one-time",
      cta: "Learn More",
      action: () => {
        window.scrollTo(0, 0);
        navigate("/start");
      },
      highlighted: false,
    },
    {
      id: "community",
      icon: Users,
      badge: "Monthly Membership",
      title: "The Collective",
      subtitle: "For traders who want ongoing sharpening, community, and advanced resources.",
      featuresLabel: "",
      features: [
        "Weekly live trading sessions",
        "Market analysis and breakdowns",
        "Advanced strategy deep-dives",
        "Direct peer and mentor access",
      ],
      price: collectivePrice,
      priceNote: "/mo",
      cta: "Join the Collective",
      action: () => {
        window.scrollTo(0, 0);
        navigate("/collective");
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
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            Select Your Entry
          </p>
          <h2
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4"
>
            Two Paths. <span className="text-primary">One Standard.</span>
          </h2>
        </ScrollReveal>

        {/* Offerings Grid */}
        <ScrollRevealGroup className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto" staggerDelay={150}>
          {offerings.map((offering) => {
            const IconComponent = offering.icon;
            return (
              <div
                key={offering.id}
                className="group relative h-full"
              >
                <div
                  className={`relative flex flex-col h-full p-6 md:p-8 rounded-2xl border transition-all duration-500 ${
                    offering.highlighted
                      ? "border-primary/40 bg-primary/5 hover:border-primary/60 hover:bg-primary/10"
                      : "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card"
                  } hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1`}
                >
                  {/* Highlighted indicator */}
                  {offering.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className={`p-2 rounded-lg ${offering.highlighted ? "bg-primary/20" : "bg-primary/10"}`}>
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {offering.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-3 text-foreground">
                    {offering.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-base md:text-lg text-muted-foreground mb-2">
                    {offering.subtitle}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    {offering.id === "accelerator" && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base text-muted-foreground line-through">{oldCombinedPrice}</span>
                        <div className="relative group/tip">
                          <Info className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 px-3 py-2 rounded-lg bg-popover border border-border text-xs text-popover-foreground opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible transition-all duration-200 pointer-events-none z-10 text-center shadow-lg">
                            Previously offered as two separate courses. Now combined into a single 30-day programme at a lower price.
                          </div>
                        </div>
                      </div>
                    )}
                    <p className="text-2xl font-semibold text-foreground">
                      {offering.price}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {offering.priceNote}
                      </span>
                    </p>
                  </div>

                  {/* Features */}
                  {offering.featuresLabel ? (
                    <p className="text-sm font-medium text-foreground mb-3">{offering.featuresLabel}</p>
                  ) : null}
                  <ul className="space-y-3">
                    {offering.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Spacer + CTA pinned to bottom */}
                  <div className="flex-1 min-h-8" />
                  <Button
                    variant={offering.highlighted ? "hero" : "premium"}
                    size="lg"
                    className="w-full group/btn"
                    onClick={offering.action}
                  >
                    {offering.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            );
          })}
        </ScrollRevealGroup>

        {/* Progression note */}
        <ScrollReveal className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Complete the Accelerator, then continue with the Collective.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
