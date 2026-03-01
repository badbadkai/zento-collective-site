import React from "react";
import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePricing } from "@/context/PricingContext";
import { formatPrice, convertUSDToCurrency } from "@/lib/pricing";

interface Tier {
  name: string;
  baseUSD: number;
  billingMonths: number;
  savingsPercent: number;
  features: string[];
  highlight?: boolean;
}

const BASE_MONTHLY_USD = 90;

export const PricingTiers: React.FC = () => {
  const navigate = useNavigate();
  const { currency } = usePricing();

  const tiers: Tier[] = [
    {
      name: "Monthly",
      baseUSD: BASE_MONTHLY_USD,
      billingMonths: 1,
      savingsPercent: 0,
      features: [
        "Live market analysis & trade breakdowns",
        "Weekly streams & educational webinars",
        "Complete resource library & templates",
        "Private community workspace",
        "Priority support channel",
        "Full flexibility. Cancel anytime",
      ],
    },
    {
      name: "Quarterly",
      baseUSD: Math.round(BASE_MONTHLY_USD * (1 - 0.15)),
      billingMonths: 3,
      savingsPercent: 15,
      features: [
        "Live market analysis & trade breakdowns",
        "Weekly streams & educational webinars",
        "Complete resource library & templates",
        "Private community workspace",
        "Priority support channel",
        "Full flexibility. Cancel anytime",
      ],
      highlight: true,
    },
    {
      name: "Annual",
      baseUSD: Math.round(BASE_MONTHLY_USD * (1 - 0.2)),
      billingMonths: 12,
      savingsPercent: 20,
      features: [
        "Live market analysis & trade breakdowns",
        "Weekly streams & educational webinars",
        "Complete resource library & templates",
        "Private community workspace",
        "Priority support channel",
        "Full flexibility. Cancel anytime",
      ],
    },
  ];

  const handleTierClick = () => {
    window.scrollTo(0, 0);
    navigate("/collective");
  };

  return (
    <section className="section-spacing relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />

      <div className="container-studio relative">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 animate-fade-in">
            Investment
          </p>
          <h2
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Premium <span className="text-primary">Membership</span>
          </h2>
          <p
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Select your commitment horizon. Access remains consistent across all tiers.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, i) => {
            const monthlyUSD = tier.baseUSD;
            const monthlyLocal = convertUSDToCurrency(monthlyUSD, currency);
            const totalLocal = monthlyLocal * tier.billingMonths;

            return (
              <div
                key={tier.name}
                onClick={handleTierClick}
                className={`group relative cursor-pointer animate-fade-in ${
                  tier.highlight ? "md:-mt-4 md:mb-4 z-10" : ""
                }`}
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div
                  className={`relative h-full rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${
                    tier.highlight
                      ? "border-primary/50 bg-primary/5 hover:border-primary hover:bg-primary/10 hover:shadow-xl hover:shadow-primary/10"
                      : "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
                  }`}
                >
                  {/* Popular badge */}
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 bg-primary text-primary-foreground rounded-full">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">Most Popular</span>
                    </div>
                  )}

                  {/* Savings badge */}
                  {tier.savingsPercent > 0 && (
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          tier.highlight
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                        } transition-colors`}
                      >
                        Save {tier.savingsPercent}%
                      </span>
                    </div>
                  )}

                  <div className="p-8 md:p-10">
                    {/* Tier name */}
                    <h3 className="font-heading text-xl md:text-2xl font-semibold mb-2 text-foreground">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Billed{" "}
                      {tier.billingMonths === 1
                        ? "monthly"
                        : tier.billingMonths === 3
                        ? "every 3 months"
                        : "annually"}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                          {formatPrice(monthlyLocal, currency)}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /month
                        </span>
                      </div>
                      {tier.billingMonths !== 1 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {formatPrice(totalLocal, currency)}{" "}
                          {tier.billingMonths === 3
                            ? "every 3 months"
                            : "per year"}
                        </p>
                      )}
                      {tier.savingsPercent > 0 && (
                        <p className="text-sm text-primary font-semibold mt-2">
                          Save{" "}
                          {formatPrice(
                            convertUSDToCurrency(
                              (BASE_MONTHLY_USD - tier.baseUSD) *
                                tier.billingMonths,
                              currency
                            ),
                            currency
                          )}
                        </p>
                      )}
                      {tier.savingsPercent === 0 && (
                        <p className="text-sm text-transparent mt-2 select-none">
                          Placeholder
                        </p>
                      )}
                    </div>

                    {/* CTA */}
                    <Button
                      className={`w-full mb-8 ${
                        tier.highlight ? "" : "group-hover:bg-primary group-hover:text-primary-foreground"
                      }`}
                      variant={tier.highlight ? "hero" : "outline"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTierClick();
                      }}
                    >
                      Get Started
                    </Button>

                    {/* Features */}
                    <ul className="space-y-3">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-sm text-muted-foreground">
            Seeking individualised guidance?{" "}
            <a
              href="/waitlist"
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              Request private mentorship
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
