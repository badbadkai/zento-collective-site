import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/Price";
import { CheckCircle2, XCircle } from "lucide-react";

const Start = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-32 px-4 bg-background">
        <div className="container-studio max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
            The 30-Day Trading Accelerator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            A structured, beginner-focused program designed to help you build a complete trading process that suits you
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-12 font-medium">
            No shortcuts. No signals. Just discipline, rules, and clarity.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="text-base">
              Join the Accelerator
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Disqualification Section */}
      <section className="py-20 px-4 bg-card border-t-2 border-border">
        <div className="container-studio max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Who This Is For. Who It Isn't.</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* For */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">This Is For You If:</h3>
              <ul className="space-y-3">
                {[
                  "You're willing to do the work without guarantees",
                  "You want clear rules, not hope or signals",
                  "You can follow a structured process for 30 days",
                  "You understand risk before reward",
                  "You're ready to document what you learn",
                  "You see trading as a skill to build, not wealth to grab"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not For */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">This Is Not For You If:</h3>
              <ul className="space-y-3">
                {[
                  "You want guaranteed profits or shortcuts",
                  "You expect someone to tell you when to trade",
                  "You're not willing to paper trade first",
                  "You can't tolerate losing trades",
                  "You're looking for secrets or special indicators",
                  "You want to start trading with real money immediately"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Real Problem Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container-studio max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">The Real Problem Beginners Face</h2>
          
          <div className="space-y-6">
            {[
              {
                title: "Overinformation",
                description: "Endless strategies, indicators, and YouTube videos. You don't need more information. You need one coherent framework."
              },
              {
                title: "Strategy Hopping",
                description: "You test something, lose once, then abandon it for the next thing. You never develop mastery."
              },
              {
                title: "Emotional Decisions",
                description: "Without written rules, every trade becomes a vote based on how you feel. Fear and greed take over."
              },
              {
                title: "No Operating Rules",
                description: "You don't have answers to basic questions: When do I enter? When do I exit? How much do I risk? What's my max loss per day?"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 border-2 border-border rounded-lg bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What the Accelerator Builds */}
      <section className="py-20 px-4 bg-card border-y-2 border-border">
        <div className="container-studio max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What You Build in 30 Days</h2>
          
          <div className="space-y-4">
            {[
              {
                title: "One Trading Blueprint",
                description: "A single, written strategy with specific entry logic, market conditions, and setup definitions. No ambiguity."
              },
              {
                title: "One Risk Framework",
                description: "Defined position sizing, maximum daily loss, stop loss placement, and risk-to-reward requirements. Written."
              },
              {
                title: "One Psychological Operating System",
                description: "Rules for how you think, decide, and act when prices move. This replaces emotion with discipline."
              },
              {
                title: "One Journaling Process",
                description: "A system to record every trade, decision, and lesson. This is your feedback loop. Without it, you repeat mistakes."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 border-2 border-primary/20 bg-primary/5 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container-studio max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Your 30-Day Roadmap</h2>
          
          <div className="space-y-8">
            {/* Week 1 */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Week 1: Foundations</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  { day: "Mon", topic: "Market Mechanics" },
                  { day: "Tue", topic: "Risk Foundations" },
                  { day: "Wed", topic: "Trader Psychology" },
                  { day: "Thu", topic: "Platform & Charts" },
                  { day: "Fri", topic: "Community" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border border-border rounded-lg bg-card text-center">
                    <p className="text-xs font-semibold text-primary uppercase mb-2">{item.day}</p>
                    <p className="text-sm font-medium text-foreground">{item.topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Week 2 */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Week 2: Strategy Blueprint</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  { day: "Mon", topic: "Market Environment" },
                  { day: "Tue", topic: "Setup Logic" },
                  { day: "Wed", topic: "Entry Framework" },
                  { day: "Thu", topic: "Risk & Exit Rules" },
                  { day: "Fri", topic: "Strategy Assembly" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border border-border rounded-lg bg-card text-center">
                    <p className="text-xs font-semibold text-primary uppercase mb-2">{item.day}</p>
                    <p className="text-sm font-medium text-foreground">{item.topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Week 3 */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Week 3: Execution & Discipline</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  { day: "Mon", topic: "Demo Execution" },
                  { day: "Tue", topic: "Journaling System" },
                  { day: "Wed", topic: "Error Tracking" },
                  { day: "Thu", topic: "Loss Management" },
                  { day: "Fri", topic: "Consistency Check" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border border-border rounded-lg bg-card text-center">
                    <p className="text-xs font-semibold text-primary uppercase mb-2">{item.day}</p>
                    <p className="text-sm font-medium text-foreground">{item.topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Week 4 */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Week 4: Prop Firm Readiness</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  { day: "Mon", topic: "Expectancy Review" },
                  { day: "Tue", topic: "Drawdown Rules" },
                  { day: "Wed", topic: "Prop Simulation" },
                  { day: "Thu", topic: "Strategy Lock" },
                  { day: "Fri", topic: "90-Day Plan" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border border-border rounded-lg bg-card text-center">
                    <p className="text-xs font-semibold text-primary uppercase mb-2">{item.day}</p>
                    <p className="text-sm font-medium text-foreground">{item.topic}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Support Section */}
      <section className="py-20 px-4 bg-card border-t-2 border-border">
        <div className="container-studio max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Live & Community Support</h2>
          
          <div className="space-y-4">
            {[
              {
                title: "Weekly Group Q&A",
                description: "Live sessions to discuss concepts, test your understanding, and learn from peer questions."
              },
              {
                title: "Structured Community Discussions",
                description: "Guided conversations on trading psychology, risk management, and decision-making under pressure."
              },
              {
                title: "Guided Backtesting Sessions",
                description: "Step through historical price action together. See how your rules would have performed in real market conditions."
              },
              {
                title: "Accountability Check-Ins",
                description: "Regular touchpoints to keep you on track, not to hold your hand. This program requires effort."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 border-2 border-border rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground text-sm mt-8 italic">
            These support structures exist to deepen your learning and keep you disciplined—not to replace your own thinking or provide trading signals.
          </p>
        </div>
      </section>

      {/* Day 30 Deliverables */}
      <section className="py-20 px-4 bg-background">
        <div className="container-studio max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What You'll Have by Day 30</h2>
          
          <div className="space-y-4">
            {[
              "A written trading strategy with defined entry logic and market conditions",
              "A risk management framework with position sizing and stop loss rules",
              "Documented psychological operating rules for how you decide when to trade",
              "A journaling system and 4 weeks of trade records showing your decision process",
              "A clear assessment of whether you're ready for prop firm evaluation or need more practice"
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
                <div className="w-6 h-6 rounded-full bg-primary text-background flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                  {idx + 1}
                </div>
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What This Does NOT Promise */}
      <section className="py-20 px-4 bg-card border-y-2 border-border">
        <div className="container-studio max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What This Does NOT Promise</h2>
          
          <div className="space-y-4">
            {[
              {
                title: "No Profit Guarantees",
                description: "Trading involves risk. You can lose money. We don't promise returns. We teach risk management."
              },
              {
                title: "No Trading Signals",
                description: "You won't receive 'buy now' or 'sell now' messages. You'll learn how to make those decisions yourself."
              },
              {
                title: "No Funded Account Promises",
                description: "Proprietary firms evaluate traders individually. This program prepares you. Passing their tests is your responsibility."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 border-2 border-destructive/20 bg-destructive/5 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 border-2 border-border rounded-lg bg-background">
            <p className="text-foreground font-medium mb-2">This clarity builds trust.</p>
            <p className="text-muted-foreground">
              We're not interested in flashy promises. We're interested in serious traders who want structure, discipline, and real skill development.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing & Commitment */}
      <section className="py-20 px-4 bg-background">
        <div className="container-studio max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Investment & Commitment</h2>
          
          <div className="mb-8">
            <p className="text-muted-foreground mb-4">30 days. One coherent framework. Written rules for everything.</p>
            <Price product="accelerator" className="text-5xl font-bold text-foreground mb-2 block" />
            <p className="text-muted-foreground">One-time investment. Lifetime access to your work and community support.</p>
          </div>

          <div className="p-8 border-2 border-primary/20 rounded-lg bg-primary/5 mb-8">
            <p className="text-foreground font-medium mb-4">
              This price reflects what this program is: intensive, structured, and focused.
            </p>
            <p className="text-muted-foreground">
              It's not cheap because it requires effort. It's not expensive because the real cost of trading without a system is far higher—in capital lost, in time wasted, and in lessons relearned.
            </p>
          </div>

          <div className="space-y-3 mb-12">
            {[
              "30 days of structured curriculum",
              "Weekly live Q&A sessions",
              "Community access and backtesting support",
              "All materials and templates included",
              "Accountability check-ins"
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 justify-center items-center">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <Button size="lg" className="text-base px-8">
            Join the Accelerator — <Price product="accelerator" />
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-card border-t-2 border-border">
        <div className="container-studio max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">You're Ready to Start</h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            Structure beats motivation. Rules beat hope. Discipline beats guessing.
          </p>

          <p className="text-base text-muted-foreground mb-12 max-w-2xl mx-auto">
            You've spent enough time wondering if you can trade. Thirty days of structured, focused work will answer that question. You'll either have a system that works or clarity that you need more time. Either way, you'll know.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-base">
              Start Your 30 Days
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Questions? Contact Us
            </Button>
          </div>

          <p className="text-sm text-muted-foreground italic">
            There's no refund because this isn't a product to consume. It's a program to engage with. You get out what you put in.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Start;
