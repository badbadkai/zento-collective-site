import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";
import { usePricing } from "@/context/PricingContext";
import { getCurrencySymbol } from "@/lib/pricing";
import { Price } from "@/components/Price";

const WHOP_URL = "https://whop.com/zento-collective/zentocollective-premium/";

const features = [
  "Live trading sessions",
  "Trade recaps & breakdowns",
  "Resources & reinforcement activities",
  "Peer & mentor access",
];

export const Offerings = () => {
  const navigate = useNavigate();
  const { currency, getPrice } = usePricing();
  const symbol = getCurrencySymbol(currency);

  const quarterlyPerMonth = Math.round(getPrice("collective_quarterly") / 3);

  const tiers = [
    {
      id: "monthly",
      name: "Monthly",
      product: "collective_monthly",
      period: "/mo",
      sub: null,
      badge: null,
      highlighted: false,
      url: WHOP_URL,
    },
    {
      id: "quarterly",
      name: "Quarterly",
      product: "collective_quarterly",
      period: "/qtr",
      sub: `${symbol}${quarterlyPerMonth}/mo · Save ~11%`,
      badge: "Best Value",
      highlighted: true,
      url: WHOP_URL,
    },
    {
      id: "lifetime",
      name: "Lifetime",
      product: "collective_lifetime",
      period: "one-time",
      sub: null,
      badge: "One-time Payment",
      highlighted: false,
      url: WHOP_URL,
    },
  ];

  return (
    <section id="offerings" className="section-spacing relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container-studio relative">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            Choose Your Commitment
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
            Pick your <span className="text-primary">pace.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Same access at every tier. Commit longer, pay less.
          </p>
        </ScrollReveal>

        <ScrollRevealGroup
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          staggerDelay={120}
        >
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 ${
                tier.highlighted
                  ? "border-primary/40 bg-primary/5 md:-mt-4 md:mb-4 shadow-lg shadow-primary/10"
                  : "border-border/50 bg-card/30 hover:border-primary/20"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`px-4 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                      tier.highlighted
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground border border-border/60"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                {tier.name}
              </h3>

              <div className="mb-1">
                <Price
                  product={tier.product}
                  className="font-heading text-4xl font-bold text-foreground"
                />
                <span className="text-muted-foreground text-base ml-1">{tier.period}</span>
              </div>

              <div className="h-7 mb-4 flex items-center">
                {tier.sub && (
                  <p className="text-sm text-muted-foreground">{tier.sub}</p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href={tier.url} target="_blank" rel="noopener noreferrer">
                <Button
                  variant={tier.highlighted ? "hero" : "premium"}
                  size="lg"
                  className="w-full group/btn"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </a>
            </div>
          ))}
        </ScrollRevealGroup>

        {/* 1-to-1 guidance note */}
        <ScrollReveal className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            Need 1-to-1 guidance?{" "}
            <button
              onClick={() => navigate("/waitlist")}
              className="text-primary hover:underline font-medium"
            >
              Join the coaching waitlist.
            </button>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
