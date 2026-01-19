import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/Price";
import { Check, X, ArrowRight } from "lucide-react";

const Start = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="container-studio relative">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-6 animate-fade-in">
              30-Day Program
            </p>
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
              A structured, beginner-focused program designed to help you build
              a complete trading process that suits you.
            </p>
            <p
              className="text-base text-muted-foreground font-medium mb-10 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              No shortcuts. No signals. Just discipline, rules, and clarity.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Button variant="hero" size="lg" className="group">
                Join the Accelerator
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Disqualification Section */}
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
                    "You're willing to do the work without guarantees",
                    "You want clear rules, not hope or signals",
                    "You can follow a structured process for 30 days",
                    "You understand risk before reward",
                    "You're ready to document what you learn",
                    "You see trading as a skill to build, not wealth to grab",
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
                    "You want guaranteed profits or shortcuts",
                    "You expect someone to tell you when to trade",
                    "You're not willing to paper trade first",
                    "You can't tolerate losing trades",
                    "You're looking for secrets or special indicators",
                    "You want to start trading with real money immediately",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Real Problem Section */}
      <section className="section-spacing">
        <div className="container-studio">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 text-center">
              The Challenge
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12 text-center">
              The Real Problem{" "}
              <span className="text-primary">Beginners Face</span>
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "Overinformation",
                  description:
                    "Endless strategies, indicators, and YouTube videos. You don't need more information. You need one coherent framework.",
                },
                {
                  title: "Strategy Hopping",
                  description:
                    "You test something, lose once, then abandon it for the next thing. You never develop mastery.",
                },
                {
                  title: "Emotional Decisions",
                  description:
                    "Without written rules, every trade becomes a vote based on how you feel. Fear and greed take over.",
                },
                {
                  title: "No Operating Rules",
                  description:
                    "You don't have answers to basic questions: When do I enter? When do I exit? How much do I risk? What's my max loss per day?",
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

      {/* What the Accelerator Builds */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="container-studio relative">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 text-center">
              The Outcome
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12 text-center">
              What You Build in{" "}
              <span className="text-primary">30 Days</span>
            </h2>

            <div className="space-y-4">
              {[
                {
                  number: "01",
                  title: "One Trading Blueprint",
                  description:
                    "A single, written strategy with specific entry logic, market conditions, and setup definitions. No ambiguity.",
                },
                {
                  number: "02",
                  title: "One Risk Framework",
                  description:
                    "Defined position sizing, maximum daily loss, stop loss placement, and risk-to-reward requirements. Written.",
                },
                {
                  number: "03",
                  title: "One Psychological Operating System",
                  description:
                    "Rules for how you think, decide, and act when prices move. This replaces emotion with discipline.",
                },
                {
                  number: "04",
                  title: "One Journaling Process",
                  description:
                    "A system to record every trade, decision, and lesson. This is your feedback loop. Without it, you repeat mistakes.",
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

      {/* Calendar Section */}
      <section className="section-spacing">
        <div className="container-studio">
          <div className="max-w-5xl mx-auto">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 text-center">
              The Roadmap
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12 text-center">
              Your <span className="text-primary">30-Day</span> Journey
            </h2>

            <div className="space-y-8">
              {[
                {
                  week: "Week 1",
                  title: "Foundations",
                  days: [
                    { day: "Mon", topic: "Market Mechanics" },
                    { day: "Tue", topic: "Risk Foundations" },
                    { day: "Wed", topic: "Trader Psychology" },
                    { day: "Thu", topic: "Platform & Charts" },
                    { day: "Fri", topic: "Community" },
                  ],
                },
                {
                  week: "Week 2",
                  title: "Strategy Blueprint",
                  days: [
                    { day: "Mon", topic: "Market Environment" },
                    { day: "Tue", topic: "Setup Logic" },
                    { day: "Wed", topic: "Entry Framework" },
                    { day: "Thu", topic: "Risk & Exit Rules" },
                    { day: "Fri", topic: "Strategy Assembly" },
                  ],
                },
                {
                  week: "Week 3",
                  title: "Execution & Discipline",
                  days: [
                    { day: "Mon", topic: "Demo Execution" },
                    { day: "Tue", topic: "Journaling System" },
                    { day: "Wed", topic: "Error Tracking" },
                    { day: "Thu", topic: "Loss Management" },
                    { day: "Fri", topic: "Consistency Check" },
                  ],
                },
                {
                  week: "Week 4",
                  title: "Prop Firm Readiness",
                  days: [
                    { day: "Mon", topic: "Expectancy Review" },
                    { day: "Tue", topic: "Drawdown Rules" },
                    { day: "Wed", topic: "Prop Simulation" },
                    { day: "Thu", topic: "Strategy Lock" },
                    { day: "Fri", topic: "90-Day Plan" },
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

      {/* Community & Support Section */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="container-studio relative">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 text-center">
              Support System
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12 text-center">
              Live & Community{" "}
              <span className="text-primary">Support</span>
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "Weekly Group Q&A",
                  description:
                    "Live sessions to discuss concepts, test your understanding, and learn from peer questions.",
                },
                {
                  title: "Structured Community Discussions",
                  description:
                    "Guided conversations on trading psychology, risk management, and decision-making under pressure.",
                },
                {
                  title: "Guided Backtesting Sessions",
                  description:
                    "Step through historical price action together. See how your rules would have performed in real market conditions.",
                },
                {
                  title: "Accountability Check-Ins",
                  description:
                    "Regular touchpoints to keep you on track, not to hold your hand. This program requires effort.",
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
              These support structures exist to deepen your learning and keep you
              disciplined—not to replace your own thinking or provide trading
              signals.
            </p>
          </div>
        </div>
      </section>

      {/* Day 30 Deliverables */}
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
                "A written trading strategy with defined entry logic and market conditions",
                "A risk management framework with position sizing and stop loss rules",
                "Documented psychological operating rules for how you decide when to trade",
                "A journaling system and 4 weeks of trade records showing your decision process",
                "A clear assessment of whether you're ready for prop firm evaluation or need more practice",
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

      {/* What This Does NOT Promise */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="container-studio relative">
          <div className="max-w-3xl mx-auto">
            <p className="text-destructive font-medium text-sm tracking-widest uppercase mb-4 text-center">
              Important
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12 text-center">
              What This Does{" "}
              <span className="text-destructive">NOT Promise</span>
            </h2>

            <div className="space-y-4 mb-8">
              {[
                {
                  title: "No Profit Guarantees",
                  description:
                    "Trading involves risk. You can lose money. We don't promise returns. We teach risk management.",
                },
                {
                  title: "No Trading Signals",
                  description:
                    "You won't receive 'buy now' or 'sell now' messages. You'll learn how to make those decisions yourself.",
                },
                {
                  title: "No Funded Account Promises",
                  description:
                    "Proprietary firms evaluate traders individually. This program prepares you. Passing their tests is your responsibility.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-destructive/20 bg-destructive/5"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-card/30">
              <p className="text-foreground font-medium mb-2">
                This clarity builds trust.
              </p>
              <p className="text-muted-foreground text-sm">
                We're not interested in flashy promises. We're interested in
                serious traders who want structure, discipline, and real skill
                development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Commitment */}
      <section className="section-spacing">
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
                30 days. One coherent framework. Written rules for everything.
              </p>
              <Price
                product="accelerator"
                className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-2 block"
              />
              <p className="text-muted-foreground">
                One-time investment. Lifetime access to your work and community
                support.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-primary/20 bg-primary/5 mb-10">
              <p className="text-foreground font-medium mb-4">
                This price reflects what this program is: intensive, structured,
                and focused.
              </p>
              <p className="text-muted-foreground text-sm">
                It's not cheap because it requires effort. It's not expensive
                because the real cost of trading without a system is far
                higher—in capital lost, in time wasted, and in lessons relearned.
              </p>
            </div>

            <div className="space-y-3 mb-12">
              {[
                "30 days of structured curriculum",
                "Weekly live Q&A sessions",
                "Community access and backtesting support",
                "All materials and templates included",
                "Accountability check-ins",
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 justify-center items-center">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="group">
              Join the Accelerator — <Price product="accelerator" />
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="container-studio relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6">
              You're Ready to <span className="text-primary">Start</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
              Structure beats motivation. Rules beat hope. Discipline beats
              guessing.
            </p>

            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              You've spent enough time wondering if you can trade. Thirty days of
              structured, focused work will answer that question. You'll either
              have a system that works or clarity that you need more time. Either
              way, you'll know.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="hero" size="lg" className="group">
                Start Your 30 Days
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Questions? Contact Us
              </Button>
            </div>

            <p className="text-sm text-muted-foreground italic">
              There's no refund because this isn't a product to consume. It's a
              program to engage with. You get out what you put in.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Start;
