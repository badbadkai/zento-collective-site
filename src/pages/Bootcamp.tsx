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
import { Check, X, ArrowRight, Clock, Plus } from "lucide-react";

const Bootcamp = () => {
  const { currency, getPrice } = usePricing();

  useEffect(() => {
    document.title = "30-Day Bootcamp — Greenridge Studios";
  }, []);

  const price = getPrice("bootcamp");
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="container-studio relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
              <span className="text-primary font-medium text-sm tracking-widest uppercase">
                Performance Programme
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <Clock className="w-3.5 h-3.5" />
                ~7–10 hrs/week
              </span>
            </div>
            <h1
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              30-Day{" "}
              <span className="text-primary">Bootcamp</span>
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground mb-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              You know the basics. Now build the edge.
            </p>
            <p
              className="text-base text-muted-foreground font-medium mb-10 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              For traders who understand the fundamentals but can't find
              consistency. High-contact. Performance-focused. Results-driven.
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
                Apply Now
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("programme")}
              >
                See the Programme
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For / Not For */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="container-studio relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12 text-center">
              Who This Is For.{" "}
              <span className="text-primary">Who It Isn't.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* For */}
              <div className="p-8 rounded-2xl border border-primary/20 bg-primary/5">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                  This Is For You If:
                </h3>
                <ul className="space-y-4">
                  {[
                    "You understand the basics but aren't consistently profitable",
                    "You've taken a prop firm challenge and failed",
                    "You know something is missing from your process",
                    "You're willing to journal and review trades daily",
                    "You want direct, personal feedback on your trading",
                    "You're ready to commit fully for 30 days",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not For */}
              <div className="p-8 rounded-2xl border border-border/50 bg-card/30">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                  This Is Not For You If:
                </h3>
                <ul className="space-y-4">
                  {[
                    "You're a complete beginner — start with the Accelerator",
                    "You're looking for signals or copy trading",
                    "You're not willing to journal and review daily",
                    "You want guaranteed results without effort",
                    "You can't commit 1–2 hours per day for 30 days",
                    "You think you just need one more indicator",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-center text-muted-foreground text-sm mt-8">
              Brand new to trading?{" "}
              <Link
                to="/start"
                className="text-primary hover:underline font-medium"
              >
                The 30-Day Accelerator
              </Link>{" "}
              is designed to build your foundation first.
            </p>
          </div>
        </div>
      </section>

      {/* The Real Problem */}
      <section className="section-spacing">
        <div className="container-studio">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 text-center">
              The Challenge
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12 text-center">
              The Gap Between{" "}
              <span className="text-primary">Knowing and Doing</span>
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "Inconsistent Execution",
                  description:
                    "You know what a good setup looks like, but you still take bad trades. Your rules exist on paper but not in practice.",
                },
                {
                  title: "No Feedback Loop",
                  description:
                    "You journal sporadically or not at all. Without systematic review, the same mistakes repeat. You can't fix what you don't measure.",
                },
                {
                  title: "Prop Firm Failures",
                  description:
                    "You've attempted funded challenges and blown the drawdown limit. The strategy might work, but your risk management and psychology don't hold under pressure.",
                },
                {
                  title: "Trading in Isolation",
                  description:
                    "No one reviews your trades. No one challenges your reasoning. You're operating in a vacuum where bad habits go unchecked.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="container-studio relative">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 text-center">
              What You Get
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12 text-center">
              Everything Inside the{" "}
              <span className="text-primary">Bootcamp</span>
            </h2>

            <div className="space-y-4">
              {[
                {
                  number: "01",
                  title: "Full Strategy Audit & Rebuild",
                  description:
                    "We tear apart your current approach and rebuild it around a proven methodology. Clear entry logic, defined risk parameters, and a system you can actually execute.",
                },
                {
                  number: "02",
                  title: "Advanced Market Breakdowns",
                  description:
                    "Systematic, institutional-level analysis that goes beyond surface patterns. Learn to read the market the way professionals do.",
                },
                {
                  number: "03",
                  title: "Weekly Live Trading Sessions",
                  description:
                    "Trade together in real time. See how decisions are made under live conditions, ask questions, and get immediate feedback on your reads.",
                },
                {
                  number: "04",
                  title: "Daily Journal Review with Personal Feedback",
                  description:
                    "Submit your trade journal daily. Receive direct, written feedback on your decisions, mistakes, and improvements. This is where the real development happens.",
                },
                {
                  number: "05",
                  title: "Prop Firm Challenge Preparation",
                  description:
                    "Simulated challenge conditions, drawdown management drills, and the mental framework to pass funded account evaluations.",
                },
                {
                  number: "06",
                  title: "Community Accountability",
                  description:
                    "Train alongside other Bootcamp traders. Shared accountability, peer reviews, and the pressure that drives real progress.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative p-6 rounded-xl border border-primary/20 bg-primary/5 hover:border-primary/40 transition-colors"
                >
                  <span className="absolute top-4 right-4 text-4xl font-heading font-bold text-primary/20">
                    {item.number}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm pr-12">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programme Structure */}
      <section id="programme" className="section-spacing">
        <div className="container-studio">
          <div className="max-w-5xl mx-auto">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 text-center">
              The Roadmap
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12 text-center">
              Your <span className="text-primary">30-Day</span> Programme
            </h2>

            <div className="space-y-8">
              {[
                {
                  week: "Week 1",
                  title: "Audit & Reset",
                  days: [
                    { day: "Mon", topic: "Strategy Deep Dive" },
                    { day: "Tue", topic: "Journal Setup" },
                    { day: "Wed", topic: "Risk Framework" },
                    { day: "Thu", topic: "Process Mapping" },
                    { day: "Fri", topic: "Live Session #1" },
                  ],
                },
                {
                  week: "Week 2",
                  title: "Rebuild & Refine",
                  days: [
                    { day: "Mon", topic: "Entry Logic Rebuild" },
                    { day: "Tue", topic: "Exit & Target Rules" },
                    { day: "Wed", topic: "Session Analysis" },
                    { day: "Thu", topic: "Backtesting Drills" },
                    { day: "Fri", topic: "Live Session #2" },
                  ],
                },
                {
                  week: "Week 3",
                  title: "Execution Under Pressure",
                  days: [
                    { day: "Mon", topic: "Drawdown Management" },
                    { day: "Tue", topic: "Psychology Protocols" },
                    { day: "Wed", topic: "Prop Firm Simulation" },
                    { day: "Thu", topic: "Journal Deep Review" },
                    { day: "Fri", topic: "Live Session #3" },
                  ],
                },
                {
                  week: "Week 4",
                  title: "Performance & Launch",
                  days: [
                    { day: "Mon", topic: "Full System Review" },
                    { day: "Tue", topic: "Challenge Prep" },
                    { day: "Wed", topic: "Edge Validation" },
                    { day: "Thu", topic: "Final Adjustments" },
                    { day: "Fri", topic: "Live Session #4" },
                  ],
                },
              ].map((weekData, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      {weekData.week}
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {weekData.title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {weekData.days.map((item, dayIdx) => (
                      <div
                        key={dayIdx}
                        className="p-4 rounded-xl border border-border/50 bg-card/30 text-center hover:border-primary/30 transition-colors"
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
            </div>
          </div>
        </div>
      </section>

      {/* Support System */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="container-studio relative">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 text-center">
              Support System
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12 text-center">
              High-Contact{" "}
              <span className="text-primary">Support</span>
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "Personal Journal Feedback",
                  description:
                    "Every trade you log gets reviewed. Direct, written feedback on your decisions, not generic advice. This is the core of the programme.",
                },
                {
                  title: "Weekly Live Sessions",
                  description:
                    "Trade alongside your cohort in real time. Live analysis, real-time decision-making, and immediate feedback on your reads.",
                },
                {
                  title: "Strategy Office Hours",
                  description:
                    "Dedicated time to work through your specific challenges. Bring your trade journal, your questions, and your edge for direct review.",
                },
                {
                  title: "Cohort Accountability",
                  description:
                    "You're not doing this alone. Your cohort keeps you honest, challenges your thinking, and creates the pressure that drives improvement.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground text-sm mt-8 italic">
              This is not a passive course. The Bootcamp demands daily engagement
              and rewards it with personalised development you won't find anywhere else.
            </p>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section-spacing">
        <div className="container-studio">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 text-center">
              Your Deliverables
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12 text-center">
              What You'll Have by{" "}
              <span className="text-primary">Day 30</span>
            </h2>

            <div className="space-y-4">
              {[
                "A rebuilt, battle-tested trading strategy with clear rules for every scenario",
                "30 days of reviewed trade journals with personalised feedback and tracked improvement",
                "A risk management system calibrated for prop firm challenge conditions",
                "Documented psychological protocols for handling drawdowns, FOMO, and revenge trading",
                "A clear, data-backed assessment of your readiness for funded account evaluation",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-5 rounded-xl border border-primary/20 bg-primary/5"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-foreground text-sm pt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Commitment */}
      <section id="pricing" className="section-spacing">
        <div className="container-studio">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Investment
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-8">
              Investment &{" "}
              <span className="text-primary">Commitment</span>
            </h2>

            <div className="mb-8">
              <p className="text-muted-foreground mb-6">
                30 days. Personal feedback. Strategy rebuild. Prop firm ready.
              </p>

              {/* Value anchor */}
              <p className="text-sm text-muted-foreground mb-3">
                Private coaching typically runs {symbol}2,000–{symbol}5,000+ per month
              </p>

              <Price
                product="bootcamp"
                className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-2 block"
              />

              {/* Daily cost reframe */}
              <p className="text-primary font-medium text-sm mb-4">
                That's ~{symbol}{dailyCost}/day for 30 days of high-contact development
              </p>

              <p className="text-muted-foreground">
                One-time investment. Walk away with a complete, reviewed system.
              </p>
            </div>

            {/* Loss aversion frame */}
            <div className="p-8 rounded-2xl border border-primary/20 bg-primary/5 mb-10">
              <p className="text-foreground font-medium mb-4">
                One failed prop firm challenge costs more than this programme.
              </p>
              <p className="text-muted-foreground text-sm">
                Between challenge fees, blown accounts, and months of wasted time,
                the cost of staying inconsistent far exceeds the cost of fixing it.
                This programme pays for itself the first time you pass a challenge
                you would have previously failed.
              </p>
            </div>

            <div className="space-y-3 mb-12">
              {[
                "Full strategy audit and personalised rebuild",
                "Daily trade journal review with written feedback",
                "4 live trading sessions with real-time analysis",
                "Prop firm challenge simulation and preparation",
                "Cohort accountability and peer review",
                "All frameworks, templates, and tools included",
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 justify-center items-center">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* TODO: Replace with actual Whop link for Bootcamp */}
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg" className="group">
                Apply Now - <Price product="bootcamp" />
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="container-studio relative">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
              Common Questions
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
              Before You <span className="text-primary">Apply</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Straight answers so you can make an informed decision.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "How is this different from the Accelerator?",
                  a: "The Accelerator is for beginners building their first trading system from scratch. The Bootcamp is for traders who already have experience but aren't consistent. It assumes you know the basics and focuses on auditing your existing approach, rebuilding what's broken, and developing execution discipline through daily personal feedback.",
                },
                {
                  q: "Do I need trading experience?",
                  a: "Yes. This programme is designed for traders who understand basic market concepts, have traded before (even if unsuccessfully), and know what a strategy is even if theirs isn't working. If you're brand new, the 30-Day Accelerator is the right starting point.",
                },
                {
                  q: "What markets does this cover?",
                  a: "The principles and methodology apply across forex, indices, and commodities. The focus is on developing your process and execution discipline, which transfers across any liquid market. During the programme, we'll work with whatever markets you're actively trading.",
                },
                {
                  q: "What happens after 30 days?",
                  a: "You leave with a rebuilt strategy, 30 days of reviewed journals, and a clear assessment of your readiness. To continue developing with ongoing live sessions and advanced analysis, you can join the Premium Collective, our monthly membership for active traders.",
                },
                {
                  q: "Is there a refund policy?",
                  a: "All sales are final. This is a high-contact programme with limited spots per cohort. We invest significant time in each participant from day one. If you're unsure, read through the full programme breakdown above and reach out with questions before committing.",
                },
                {
                  q: "How many hours per day does this take?",
                  a: "Plan for 1–2 hours per day. This includes reviewing material, executing trades on your demo or live account, journaling, and engaging with feedback. The live sessions are weekly. The daily commitment is the journal review cycle, which is where most of the development happens.",
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
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="container-studio relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6">
              Ready to Break{" "}
              <span className="text-primary">Through</span>?
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
              You've done the learning. Now it's time for the doing.
            </p>

            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              Thirty days of personal feedback, live trading, and systematic
              rebuilding. You'll either emerge with a system that performs or
              have complete clarity on exactly what needs to change. Either way,
              you stop guessing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {/* TODO: Replace with actual Whop link for Bootcamp */}
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg" className="group">
                  Apply for the Bootcamp
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Questions? Contact Us
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground italic">
              Limited spots per cohort. We keep numbers small so every
              participant gets genuine personal attention.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bootcamp;
