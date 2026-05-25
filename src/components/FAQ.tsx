import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const FAQ = () => {
  const faqs = [
    {
      q: "What is Zentō Collective?",
      a: "Zentō Collective is a trading education company focused on building disciplined, systematic traders. We offer structured programmes and an ongoing community designed to develop your process, risk management, and execution — not sell you signals or shortcuts.",
    },
    {
      q: "Is this suitable for beginners?",
      a: "Yes. The Collective is built to develop traders from the ground up. If you're new, we cover markets, risk, psychology, and execution before moving into advanced strategy. The only requirement is the willingness to put in the work.",
    },
    {
      q: "I already know the basics but I'm not consistent. Is this for me?",
      a: "Absolutely. The Collective is where inconsistency gets addressed directly. Weekly live sessions, institutional-grade analysis, and peer accountability help you rebuild what's broken and develop real execution discipline.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Monthly memberships can be cancelled anytime — no lock-in. Quarterly plans are billed upfront for the full period. Lifetime is a one-time payment with no recurring fees.",
    },
    {
      q: "What's different from the free community?",
      a: "The Collective includes live trading sessions, trade recaps, strategy deep-dives, reinforcement activities, and direct mentor access. The free community is a starting point. This is where the real work happens.",
    },
    {
      q: "What platforms do you use?",
      a: "Discord for community and async analysis. Live sessions run via video call with screen sharing for real-time chart walkthroughs.",
    },
    {
      q: "Do you provide trading signals?",
      a: "No. We don't tell you what to buy or sell. The Collective is built around developing your independent decision-making. The goal is to make you self-sufficient, not dependent on someone else's calls.",
    },
    {
      q: "What is your refund policy?",
      a: "All sales are final. The Collective requires active engagement to deliver results, and we're upfront about this. If you have questions before joining, contact us directly.",
    },
  ];

  return (
    <section id="faq" className="section-spacing relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-muted/10" />

      <div className="container-studio relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            Common Questions
          </p>
          <h2
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-4"
>
            Before You <span className="text-primary">Decide</span>
          </h2>
          <p
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto"
>
            Clear answers to help you evaluate if this environment is right for you.
          </p>
        </ScrollReveal>

        {/* FAQ Accordion */}
        <ScrollReveal className="max-w-4xl mx-auto" delay={100}>
          <Accordion type="single" collapsible className="space-y-5">
            {faqs.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="group border border-border/50 rounded-xl bg-card/30 backdrop-blur-sm overflow-hidden data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline group-data-[state=open]:text-primary transition-colors [&>svg]:hidden">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-left text-lg md:text-xl">
                      {item.q}
                    </span>
                    <div className="flex-shrink-0 ml-4 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-data-[state=open]:bg-primary/20 transition-colors">
                      <Plus className="w-4 h-4 text-primary transition-transform duration-300 group-data-[state=open]:rotate-45" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
};
