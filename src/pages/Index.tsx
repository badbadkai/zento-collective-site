import { useEffect } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Offerings } from "@/components/Offerings";
import { Community } from "@/components/Community";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { FAQ } from "@/components/FAQ";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const Index = () => {
  useEffect(() => {
    document.title = "Zentō Collective | Master the Process";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Offerings />
      <Community />
      <ProcessTimeline />

      {/* Who It's For */}
      <section className="section-spacing border-t border-border/20">
        <div className="container-studio">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
                Built for <span className="text-primary">Active Traders</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <ul className="space-y-5 mb-8">
                {[
                  "Traders who want structured development, not just signals",
                  "You have a foundation and want live input to keep developing it",
                  "You want to be in the room when trades are being called, not watching replays",
                  "You want to be around traders who hold each other to a standard",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-center text-base text-muted-foreground">
                Whether you're starting from zero or refining an existing edge, the Collective is built to meet you where you are.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Final CTA */}
      <section className="section-spacing relative border-t border-border/20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="container-studio relative">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6">
              Most trading content is{" "}
              <span className="text-primary">entertainment</span>.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              This is the work. Come in if you're ready for it.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="group"
              onClick={() =>
                document.getElementById("offerings")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Plans
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
