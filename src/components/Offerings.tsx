import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { usePricing } from "@/context/PricingContext";

export const Offerings = () => {
  const navigate = useNavigate();
  const { formatPrice } = usePricing();

  const collectivePrice = formatPrice("collective_monthly");

  const features = [
    "Live trading sessions",
    "Trade recaps and market breakdowns",
    "Strategy deep-dives and resources",
    "Activities for learning reinforcement",
    "Direct peer and mentor access",
    "Risk management framework",
    "Psychology and discipline system",
  ];

  return (
    <section id="offerings" className="section-spacing relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container-studio relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            One Community
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
            Everything in <span className="text-primary">One Place.</span>
          </h2>
        </ScrollReveal>

        {/* Single Product Card */}
        <ScrollReveal className="max-w-lg mx-auto">
          <div className="group relative">
            <div className="relative flex flex-col h-full p-6 md:p-8 rounded-2xl border border-primary/40 bg-primary/5 hover:border-primary/60 hover:bg-primary/10 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500">

              {/* Most Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                  Monthly Membership
                </span>
              </div>

              {/* Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  The Collective
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-3 text-foreground">
                The Collective
              </h3>

              {/* Subtitle */}
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                One membership. Full access to live sessions, community, education, and ongoing support.
              </p>

              {/* Price */}
              <div className="mb-6">
                <p className="text-2xl font-semibold text-foreground">
                  {collectivePrice}
                  <span className="text-sm font-normal text-muted-foreground ml-1">/mo</span>
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Spacer + CTA */}
              <div className="flex-1 min-h-8" />
              <Button
                variant="hero"
                size="lg"
                className="w-full group/btn mt-8"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/collective");
                }}
              >
                Join the Collective
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
