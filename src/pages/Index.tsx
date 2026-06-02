import { useEffect } from "react";
import { Check } from "lucide-react";
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

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
