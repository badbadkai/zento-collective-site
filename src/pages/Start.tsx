import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/Price";
import { usePricing } from "@/context/PricingContext";
import { getCurrencySymbol } from "@/lib/pricing";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Check, ArrowRight, Clock, Plus, Info } from "lucide-react";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

const Start = () => {
  const { currency, getPrice, formatOldCombinedPrice } = usePricing();

  useEffect(() => {
    document.title = "Trading Accelerator | Zentō Collective";
  }, []);

  const price = getPrice("accelerator");
  const dailyCost = (price / 30).toFixed(2);
  const symbol = getCurrencySymbol(currency);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
                5-Week Programme
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <Clock className="w-3.5 h-3.5" />
                ~1-2 hrs/day
              </span>
            </div>
            <h1
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              The Trading{" "}
              <span className="text-primary">Accelerator</span>
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground mb-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Complete beginner to written strategy, demo execution, and the
              discipline to follow it.
            </p>
            <p
              className="text-base text-muted-foreground font-medium mb-10 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              No shortcuts. No signals. Just structure, rules, and clarity.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Link to="/apply?programme=accelerator">
                <Button variant="hero" size="lg" className="group">
                  Join the Waitlist
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("curriculum")}
              >
                See the Curriculum
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="container-studio relative">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-8">
              Investment
            </p>

            <p className="text-sm text-muted-foreground mb-3">
              Most structured trading programmes charge {symbol}2,000–{symbol}5,000
            </p>

            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-lg text-muted-foreground line-through">{formatOldCombinedPrice()}</span>
              <div className="relative group/tip inline-flex">
                <Info className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 px-3 py-2 rounded-lg bg-popover border border-border text-xs text-popover-foreground opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible transition-all duration-200 pointer-events-none z-10 text-center shadow-lg">
                  Previously two separate courses. Now combined into one programme at a lower price.
                </div>
              </div>
            </div>

            <Price
              product="accelerator"
              className="font-heading text-6xl md:text-7xl font-bold text-foreground block mt-1 mb-2"
            />

            <p className="text-primary font-medium text-sm mb-10">
              {symbol}{dailyCost}/day &middot; one-time payment
            </p>

            <div className="grid sm:grid-cols-2 gap-x-16 gap-y-2.5 max-w-lg mx-auto text-left mb-10">
              {[
                "30 days of structured daily lessons",
                "Weekly 1-to-1 coaching sessions",
                "Live Q&A and backtesting sessions",
                "Private community and peer accountability",
                "All templates, frameworks, and tools",
                "Demo execution with review and feedback",
                "Lifetime access to your materials",
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-center">
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Link to="/apply?programme=accelerator">
              <Button variant="hero" size="lg" className="group">
                Join the Waitlist &mdash; <Price product="accelerator" />
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>

            <p className="text-xs text-muted-foreground mt-4">
              No refunds. This is a programme you engage with, not a product you consume.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              After the Accelerator, continue with the{" "}
              <Link to="/collective" className="text-primary hover:underline font-medium">
                Collective ({symbol}99/mo)
              </Link>
              {" "}&mdash; ongoing live sessions, advanced analysis, and community.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What You Build */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="container-studio relative">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal className="mb-10 text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-semibold">
                What You Walk Away With
              </h2>
            </ScrollReveal>

            <ScrollRevealGroup className="grid md:grid-cols-2 gap-4" staggerDelay={80}>
              {[
                {
                  title: "Trading Blueprint",
                  description: "Your personal strategy. Entry logic, exit rules, market conditions, trade management. Written down, no ambiguity.",
                },
                {
                  title: "Risk Framework",
                  description: "Position sizing, daily loss limits, drawdown thresholds, stop loss placement. Non-negotiable rules.",
                },
                {
                  title: "Psychology System",
                  description: "If/then protocols for every emotional scenario. Anger, streaks, revenge impulses. Protocols, not willpower.",
                },
                {
                  title: "Journal & Review System",
                  description: "Trade logging, error tracking, pattern recognition. The feedback loop that turns experience into skill.",
                },
                {
                  title: "Demo Track Record",
                  description: "Real trades on demo, logged and reviewed. Evidence that your system works before risking real capital.",
                },
                {
                  title: "90-Day Forward Plan",
                  description: "What to do after the programme. Clear next steps for independent trading or prop firm preparation.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-primary/20 bg-primary/5 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                >
                  <h3 className="font-heading text-base font-semibold text-foreground mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </ScrollRevealGroup>
          </div>
        </div>
      </section>

      {/* Curriculum — progression timeline */}
      <section id="curriculum" className="section-spacing">
        <div className="container-studio">
          <ScrollReveal className="mb-14 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">
              The <span className="text-primary">Programme</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              {/* Desktop horizontal timeline */}
              <div className="hidden md:flex">
                {[
                  {
                    phase: "01",
                    title: "Foundations",
                    description: "Markets, sessions, instruments, platform setup, risk management, and trading psychology.",
                  },
                  {
                    phase: "02",
                    title: "Technicals",
                    description: "Timeframe alignment, market structure, liquidity, Power of 3, FVGs, and entry frameworks.",
                  },
                  {
                    phase: "03",
                    title: "Optimisation",
                    description: "Build, journal, backtest, and refine your strategy. Preparation for demo trading.",
                  },
                  {
                    phase: "04",
                    title: "Prop Firms",
                    description: "Prop firm mechanics, scaling plans, DJay's and Kai's models, and Tradovate setup.",
                  },
                  {
                    phase: "05",
                    title: "Live Trading",
                    description: "A full week of live sessions together, transitioning into the Collective.",
                  },
                ].map((item, idx, arr) => (
                  <div key={idx} className="relative flex-1 flex flex-col items-center text-center px-3">
                    {idx > 0 && (
                      <div className="absolute top-[9px] left-0 right-1/2 h-px bg-border/50" />
                    )}
                    {idx < arr.length - 1 && (
                      <div className="absolute top-[9px] left-1/2 right-0 h-px bg-border/50" />
                    )}
                    <div className="relative z-10 w-[18px] h-[18px] rounded-full border-2 border-primary/60 bg-background mb-5 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-1.5">{item.phase}</p>
                    <h3 className="font-heading text-sm font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Mobile vertical timeline */}
              <div className="md:hidden flex flex-col max-w-sm mx-auto">
                {[
                  {
                    phase: "01",
                    title: "Foundations",
                    description: "Markets, sessions, instruments, platform setup, risk management, and trading psychology.",
                  },
                  {
                    phase: "02",
                    title: "Technicals",
                    description: "Timeframe alignment, market structure, liquidity, Power of 3, FVGs, and entry frameworks.",
                  },
                  {
                    phase: "03",
                    title: "Optimisation",
                    description: "Build, journal, backtest, and refine your strategy. Preparation for demo trading.",
                  },
                  {
                    phase: "04",
                    title: "Prop Firms",
                    description: "Prop firm mechanics, scaling plans, DJay's and Kai's models, and Tradovate setup.",
                  },
                  {
                    phase: "05",
                    title: "Live Trading",
                    description: "A full week of live sessions together, transitioning into the Collective.",
                  },
                ].map((item, idx, arr) => (
                  <div key={idx} className="flex gap-5">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-primary/60 bg-background flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="w-px flex-1 bg-border/50 my-1.5" />
                      )}
                    </div>
                    <div className={idx < arr.length - 1 ? "pb-7" : ""}>
                      <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-1">{item.phase}</p>
                      <h3 className="font-heading text-sm font-semibold text-foreground mb-1.5">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing">
        <div className="container-studio">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal className="mb-10 text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-semibold">
                Common <span className="text-primary">Questions</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "Do I need any experience?",
                  a: "No. The Accelerator starts from zero. We cover markets, risk, psychology, and charts before moving into strategy and execution. The only requirement is the willingness to put in 1-2 hours per day for 30 days.",
                },
                {
                  q: "What tools do I need?",
                  a: "A charting platform (TradingView free tier works), a demo trading account with any broker, and something to journal with. No paid software required.",
                },
                {
                  q: "What happens after the 30 days?",
                  a: "Everything you build is yours to keep. Your blueprint, risk rules, journal system, and demo track record. If you want ongoing live sessions and community, the Collective is $99/mo. It's optional.",
                },
                {
                  q: "Will I be profitable?",
                  a: "We don't promise profits. Nobody honestly can. You'll have a complete written system, demo evidence it works, and the discipline framework to execute it. Results depend on your continued effort after the programme.",
                },
              ].map((item, idx) => (
                <AccordionItem
                  key={idx}
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
              ))}
            </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="container-studio relative">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6">
              Ready to <span className="text-primary">Start</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              30 days. One framework. Written rules for everything. Demo
              execution included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply?programme=accelerator">
                <Button variant="hero" size="lg" className="group">
                  Apply Now
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
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

export default Start;
