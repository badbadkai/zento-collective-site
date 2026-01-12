import React from "react";
import { Check } from "lucide-react";
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

const BASE_MONTHLY_USD = 90; // Tier 1 base

export const PricingTiers: React.FC = () => {
  const { currency } = usePricing();

  const tiers: Tier[] = [
    { name: "Monthly", baseUSD: BASE_MONTHLY_USD, billingMonths: 1, savingsPercent: 0, features: ["Real-time market analysis & insights", "Live streams & webinars", "Educational materials & journal templates", "Exclusive community", "Direct support access", "Cancel anytime"] },
    { name: "Quarterly", baseUSD: Math.round(BASE_MONTHLY_USD * (1 - 0.15)), billingMonths: 3, savingsPercent: 15, features: ["Real-time market analysis & insights", "Live streams & webinars", "Educational materials & journal templates", "Exclusive community", "Direct support access", "Cancel anytime"], highlight: true },
    { name: "Annual", baseUSD: Math.round(BASE_MONTHLY_USD * (1 - 0.2)), billingMonths: 12, savingsPercent: 20, features: ["Real-time market analysis & insights", "Live streams & webinars", "Educational materials & journal templates", "Exclusive community", "Direct support access", "Cancel anytime"] }
  ];

  const handleTierClick = () => {
    window.location.href = 'https://whop.com/greenridge-studios/greenridge-studios-premium/?utm_source=store_page&funnelId=store_c45e4b4b-1cd0-4812-9b64-30890d429456';
  };

  return (
    <section className="section-spacing bg-background">
      <div className="container-studio">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">The Exclusive Community</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">Choose your commitment level and unlock exclusive trading insights.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, i) => {
            const monthlyUSD = tier.baseUSD; // already reduced where needed
            const monthlyLocal = convertUSDToCurrency(monthlyUSD, currency);
            const totalLocal = monthlyLocal * tier.billingMonths;

            return (
              <div
                key={tier.name}
                onClick={handleTierClick}
              className={`animate-fade-in rounded-lg border-2 transition-all hover:shadow-lg cursor-pointer group relative ${tier.highlight ? "border-primary bg-primary/5 md:scale-105 md:z-10 hover:bg-primary/10" : "border-border bg-card hover:bg-muted"}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {/* Popular badge on Quarterly */}
                {tier.name === 'Quarterly' && (
                  <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-3 py-1 rounded-br-lg text-xs sm:text-sm font-bold">Popular</div>
                )}

                {/* Savings badge: primary for Quarterly, muted and shown on hover for Annual */}
                {tier.savingsPercent > 0 && tier.name !== 'Annual' && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg text-xs sm:text-sm font-bold">Save {tier.savingsPercent}%</div>
                )}
                {tier.savingsPercent > 0 && tier.name === 'Annual' && (
                  <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-xs sm:text-sm font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Save {tier.savingsPercent}%</div>
                )}

                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Billed {tier.billingMonths === 1 ? 'monthly' : tier.billingMonths === 3 ? 'every 3 months' : 'annually'}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl md:text-5xl font-bold text-foreground">{formatPrice(monthlyLocal, currency)}</span>
                      <span className="text-muted-foreground text-sm md:text-base">/month</span>
                    </div>
                    {tier.billingMonths !== 1 && (
                      <p className="text-sm text-muted-foreground mt-2">{formatPrice(totalLocal, currency)} {tier.billingMonths === 3 ? 'every 3 months' : 'per year'}</p>
                    )}
                    {tier.savingsPercent > 0 && (
                      (() => {
                        const savingsUSD = (BASE_MONTHLY_USD - tier.baseUSD) * tier.billingMonths;
                        const savingsLocal = convertUSDToCurrency(savingsUSD, currency);
                        return (
                          <p className="text-sm text-primary font-semibold mt-2">Save {formatPrice(savingsLocal, currency)}</p>
                        );
                      })()
                    )}
                    {tier.savingsPercent === 0 && (
                      <>
                        <p className="text-sm text-muted-foreground mt-2 invisible">placeholder</p>
                        <p className="text-sm text-primary font-semibold mt-2 invisible">placeholder</p>
                      </>
                    )}
                  </div>

                  <Button
                    className={`w-full mb-8 group-hover:wave-hover ${tier.name !== 'Quarterly' ? 'group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground' : ''}`}
                    variant={tier.highlight ? 'default' : 'outline'}
                    onClick={(e) => { e.stopPropagation(); handleTierClick(); }}
                  >
                    Get Started
                  </Button>

                  <div className="space-y-3">
                    {tier.features.map((f, idx) => (
                      <div key={idx} className="flex gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">Need a more personalised mentorship? <a href="/waitlist" className="text-primary font-semibold hover:underline">Book a 1 to 1 here</a>.</p>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
