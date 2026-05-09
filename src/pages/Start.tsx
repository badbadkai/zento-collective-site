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
                30-Day Programme
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
              discipline to follow it. In 30 days.
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
              <Button
                variant="hero"
                size="lg"
                className="group"
                onClick={() => scrollToSection("pricing")}
              >
                See Pricing
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
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
                  className="p-5 rounded-xl border border-primary/20 bg-primary/5 hover:border-primary/40 transition-colors"
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

      {/* Curriculum */}
      <section id="curriculum" className="section-spacing">
        <div className="container-studio">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="mb-10 text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-semibold">
                The <span className="text-primary">30-Day</span> Curriculum
              </h2>
            </ScrollReveal>

            <ScrollRevealGroup className="space-y-8" staggerDelay={150}>
              {[
                {
                  section: "Week 1 — Days 1–5",
                  title: "Foundations",
                  days: [
                    { day: "Day 1", topic: "Market Foundations" },
                    { day: "Day 2", topic: "Risk & Capital" },
                    { day: "Day 3", topic: "Trading Psychology" },
                    { day: "Day 4", topic: "Charts & Price Action" },
                    { day: "Day 5", topic: "Structure & Routine" },
                    { day: "6–7", topic: "Weekend Review", weekend: true },
                  ],
                },
                {
                  section: "Week 2 — Days 8–12",
                  title: "Strategy",
                  days: [
                    { day: "Day 8", topic: "Market Environment" },
                    { day: "Day 9", topic: "Setup Identification" },
                    { day: "Day 10", topic: "Entry Rules" },
                    { day: "Day 11", topic: "Exit & Management" },
                    { day: "Day 12", topic: "Blueprint Assembly" },
                    { day: "13–14", topic: "Weekend Review", weekend: true },
                  ],
                },
                {
                  section: "Week 3 — Days 15–19",
                  title: "Execution",
                  days: [
                    { day: "Day 15", topic: "Demo Trading Begins" },
                    { day: "Day 16", topic: "Trade Journaling" },
                    { day: "Day 17", topic: "Error Tracking" },
                    { day: "Day 18", topic: "Loss Management" },
                    { day: "Day 19", topic: "Consistency Protocol" },
                    { day: "20–21", topic: "Weekend Review", weekend: true },
                  ],
                },
                {
                  section: "Week 4 — Days 22–26",
                  title: "Performance",
                  days: [
                    { day: "Day 22", topic: "Expectancy & Edge" },
                    { day: "Day 23", topic: "Drawdown Rules" },
                    { day: "Day 24", topic: "Prop Firm Simulation" },
                    { day: "Day 25", topic: "Strategy Lock-In" },
                    { day: "Day 26", topic: "90-Day Plan" },
                    { day: "27–30", topic: "Final Review", weekend: true },
                  ],
                },
              ].map((sectionData, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      {sectionData.section}
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {sectionData.title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {sectionData.days.map((item, dayIdx) => (
                      <div
                        key={dayIdx}
                        className={`p-4 rounded-xl border text-center transition-colors ${
                          item.weekend
                            ? "border-primary/20 bg-primary/5"
                            : "border-border/50 bg-card/30 hover:border-primary/30"
                        }`}
                      >
                        <p className="text-xs font-semibold text-primary uppercase mb-2">
                          {item.day}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {item.topic}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollRevealGroup>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="container-studio relative">
          <ScrollReveal className="max-w-2xl mx-auto">
            <div className="p-8 md:p-12 rounded-2xl border border-primary/30 bg-primary/5 text-center">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-6">
                Investment
              </p>

              <p className="text-sm text-muted-foreground mb-4">
                Most structured trading programmes charge {symbol}2,000–{symbol}5,000
              </p>

              {/* Old price strikethrough */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-lg text-muted-foreground line-through">{formatOldCombinedPrice()}</span>
                <div className="relative group/tip inline-flex">
                  <Info className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 px-3 py-2 rounded-lg bg-popover border border-border text-xs text-popover-foreground opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible transition-all duration-200 pointer-events-none z-10 text-center shadow-lg">
                    Previously two separate courses. Now combined into one 30-day programme at a lower price.
                  </div>
                </div>
              </div>

              {/* Current price */}
              <Price
                product="accelerator"
                className="font-heading text-5xl md:text-6xl font-bold text-foreground block mb-2"
              />

              <p className="text-primary font-medium text-sm mb-6">
                {symbol}{dailyCost}/day &middot; one-time payment
              </p>

              {/* What's included */}
              <div className="space-y-2.5 text-left max-w-sm mx-auto mb-8">
                {[
                  "30 days of structured daily lessons",
                  "Weekly 1-to-1 coaching sessions",
                  "Live Q&A and backtesting sessions",
                  "Private community and peer accountability",
                  "All templates, frameworks, and tools",
                  "Demo execution with review and feedback",
                  "Lifetime access to your materials",
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/apply?programme=accelerator">
                <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                  Join the Waitlist &mdash; <Price product="accelerator" />
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground mt-4">
                No refunds. This is a programme you engage with, not a product you consume.
              </p>
            </div>

            {/* Post-programme path */}
            <div className="mt-6 p-5 rounded-xl border border-border/50 bg-card/30 text-center">
              <p className="text-sm text-muted-foreground">
                After the Accelerator, continue developing with the{" "}
                <Link to="/collective" className="text-primary hover:underline font-medium">
                  Collective ({symbol}99/mo)
                </Link>
                {" "}&mdash; ongoing live sessions, advanced analysis, and community.
              </p>
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
