import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/Price";
import { usePricing } from "@/context/PricingContext";
import { getCurrencySymbol } from "@/lib/pricing";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Check,
  ArrowRight,
  Plus,
  Radio,
  BarChart3,
  Layers,
  MessageCircle,
} from "lucide-react";

const WHOP_MONTHLY_URL =
  "https://whop.com/zento-collective/zento-collective-premium/?utm_source=store_page&funnelId=store_c45e4b4b-1cd0-4812-9b64-30890d429456";

const Collective = () => {
  const { currency, getPrice } = usePricing();
  const symbol = getCurrencySymbol(currency);

  useEffect(() => {
    document.title = "The Premium Collective | Zentō Collective";
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const monthlyPrice = getPrice("collective_monthly");
  const quarterlyPrice = getPrice("collective_quarterly");
  const annualPrice = getPrice("collective_annual");

  const quarterlyPerMonth = (quarterlyPrice / 3).toFixed(2);
  const annualPerMonth = (annualPrice / 12).toFixed(2);

  const tiers = [
    {
      id: "monthly",
      name: "Monthly",
      product: "collective_monthly",
      period: "/mo",
      perMonth: null,
      savings: null,
      highlighted: false,
      url: WHOP_MONTHLY_URL,
    },
    {
      id: "quarterly",
      name: "Quarterly",
      product: "collective_quarterly",
      period: "/qtr",
      perMonth: `${symbol}${quarterlyPerMonth}/mo`,
      savings: "Save ~10%",
      highlighted: true,
      url: "https://whop.com/zento-collective/zento-collective-premium/",
    },
    {
      id: "annual",
      name: "Annual",
      product: "collective_annual",
      period: "/yr",
      perMonth: `${symbol}${annualPerMonth}/mo`,
      savings: "Save ~25%",
      highlighted: false,
      url: "https://whop.com/zento-collective/zento-collective-premium/",
    },
  ];

  const features = [
    {
      icon: Radio,
      title: "Live Trading Sessions",
      description:
        "Real-time market analysis with annotated setups, live Q&A, and post-session recordings so you never miss a beat.",
    },
    {
      icon: BarChart3,
      title: "Trade Recaps & Market Breakdowns",
      description:
        "Detailed post-session recaps, market context, key levels, and the reasoning behind each setup. Learn from real trades, not theory.",
    },
    {
      icon: Layers,
      title: "Resources & Learning Reinforcement",
      description:
        "Strategy deep-dives, structured activities, and practice exercises designed to reinforce concepts and sharpen your edge over time.",
    },
    {
      icon: MessageCircle,
      title: "Direct Peer & Mentor Access",
      description:
        "Structured discussions, trade reviews, and accountability with a community of serious practitioners, not spectators.",
    },
  ];

  const faqItems = [
    {
      q: "Can I cancel anytime?",
      a: "Monthly memberships can be cancelled anytime, no lock-in. Quarterly and annual plans are billed upfront for the full period at a discounted rate.",
    },
    {
      q: "What's different from the free community?",
      a: "The Premium Collective includes live trading sessions, trade recaps, strategy deep-dives, learning reinforcement activities, and direct mentor access. The free community is a starting point. This is where serious development happens.",
    },
    {
      q: "Do I need to complete the Accelerator first?",
      a: "No, the Collective is open to all active traders. That said, if you're a complete beginner, the Accelerator will give you the foundational structure to get the most out of the Collective.",
    },
    {
      q: "What platforms do you use?",
      a: "Discord for community discussions and async analysis. Live sessions are conducted via video call with screen sharing for real-time chart walkthroughs.",
    },
    {
      q: "Is this a signals service?",
      a: "No. We don't tell you what to buy or sell. The Collective provides education, analytical frameworks, and live context so you can make better decisions yourself. The goal is independence, not dependence.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="container-studio relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
              <span className="text-primary font-medium text-sm tracking-widest uppercase">
                Monthly Membership
              </span>
            </div>
            <h1
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              The Premium{" "}
              <span className="text-primary">Collective</span>
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground mb-4 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Live analysis, advanced strategy, and a community of traders who
              take their craft seriously.
            </p>
            <p
              className="text-sm text-muted-foreground mb-10 animate-fade-in"
              style={{ animationDelay: "0.25s" }}
            >
              Finished the Accelerator? This is where the real development continues.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Button
                variant="hero"
                size="lg"
                className="group"
                onClick={() => scrollToSection("pricing")}
              >
                View Plans
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("whats-inside")}
              >
                See What's Inside
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing — immediately after hero */}
      <section id="pricing" className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="container-studio relative">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
                Choose Your Commitment
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
                Simple, Transparent{" "}
                <span className="text-primary">Pricing</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Same access at every tier. Commit longer, pay less.
              </p>
            </ScrollReveal>

            <ScrollRevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={120}>
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                    tier.highlighted
                      ? "border-primary/40 bg-primary/5 md:-mt-4 md:mb-4 shadow-lg shadow-primary/10"
                      : "border-border/50 bg-card/30 hover:border-primary/20"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full whitespace-nowrap">
                        Best Value
                      </span>
                    </div>
                  )}

                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                    {tier.name}
                  </h3>

                  <div className="mb-2">
                    <Price
                      product={tier.product}
                      className="font-heading text-4xl font-bold text-foreground"
                    />
                    <span className="text-muted-foreground text-lg ml-1">
                      {tier.period}
                    </span>
                  </div>

                  {tier.perMonth && (
                    <p className="text-sm text-muted-foreground mb-1">
                      {tier.perMonth}
                    </p>
                  )}

                  {tier.savings && (
                    <span className="inline-block mt-1 mb-4 px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                      {tier.savings}
                    </span>
                  )}

                  {!tier.savings && <div className="mb-4 mt-5" />}

                  <ul className="space-y-3 mb-8">
                    {[
                      "Live trading sessions",
                      "Trade recaps & breakdowns",
                      "Resources & reinforcement activities",
                      "Peer & mentor access",
                    ].map((feature, idx) => (
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
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section id="whats-inside" className="section-spacing">
        <div className="container-studio">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
                What You Get
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold">
                What's Inside the{" "}
                <span className="text-primary">Collective</span>
              </h2>
            </ScrollReveal>

            <ScrollRevealGroup className="grid md:grid-cols-2 gap-6" staggerDelay={100}>
              {features.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-2xl border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card transition-all duration-300"
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 w-fit mb-4">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </ScrollRevealGroup>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="container-studio relative">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-semibold">
                Built for{" "}
                <span className="text-primary">Active Traders</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <div className="p-8 rounded-2xl border border-primary/20 bg-primary/5 mb-6">
                <ul className="space-y-4">
                  {[
                    "Accelerator graduates ready to keep building momentum",
                    "You've moved past the basics and want ongoing sharpening",
                    "You want live market context, not just recorded content",
                    "You value discipline and peer accountability",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-center text-muted-foreground text-sm">
                New to trading? The{" "}
                <Link to="/start" className="text-primary hover:underline font-medium">
                  Accelerator
                </Link>{" "}
                builds your foundation in 30 days. The Collective is where you go next.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing">
        <div className="container-studio">
          <ScrollReveal className="text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Common Questions
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">
              Before You <span className="text-primary">Join</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <ScrollRevealGroup className="space-y-4" staggerDelay={80}>
              {faqItems.map((item, idx) => (
                <AccordionWrapper key={idx} item={item} idx={idx} />
              ))}
            </ScrollRevealGroup>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="container-studio relative">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6">
              Ready to <span className="text-primary">Join</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              Stop consuming. Start developing. Join traders who take their
              craft seriously.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="hero"
                size="lg"
                className="group"
                onClick={() => scrollToSection("pricing")}
              >
                View Plans
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Questions? Contact Us
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/** Accordion needs to be wrapped separately to work with ScrollRevealGroup */
const AccordionWrapper = ({ item, idx }: { item: { q: string; a: string }; idx: number }) => (
  <Accordion type="single" collapsible>
    <AccordionItem
      value={`faq-${idx}`}
      className="group border border-border/50 rounded-xl bg-card/30 overflow-hidden data-[state=open]:border-primary/30 transition-colors"
    >
      <AccordionTrigger className="px-6 py-5 hover:no-underline group-data-[state=open]:text-primary transition-colors [&>svg]:hidden">
        <div className="flex items-center justify-between w-full">
          <span className="font-medium text-left text-base md:text-lg">
            {item.q}
          </span>
          <div className="flex-shrink-0 ml-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-data-[state=open]:bg-primary/20 transition-colors">
            <Plus className="w-4 h-4 text-primary transition-transform duration-300 group-data-[state=open]:rotate-45" />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-5">
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {item.a}
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default Collective;
