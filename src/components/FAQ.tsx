import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

export const FAQ = () => {
  const faqs = [
    {
      q: "What is Zentō Collective?",
      a: "Zentō Collective is a trading education company focused on building disciplined, systematic traders. We offer structured programmes and an ongoing community designed to develop your process, risk management, and execution — not sell you signals or shortcuts.",
    },
    {
      q: "Is this suitable for beginners?",
      a: "Yes. If you're new to trading, the 30-Day Accelerator is built specifically for you. It takes you from zero to a complete trading system with written rules, risk frameworks, and a journaling process — all in 30 focused days.",
    },
    {
      q: "I already know the basics but I'm not consistent. Which programme is right for me?",
      a: "The 30-Day Bootcamp is designed for exactly this. It's a high-contact programme where we audit your current approach, rebuild what's broken, and develop your execution discipline through daily personal feedback and live trading sessions.",
    },
    {
      q: "What is the Premium Collective?",
      a: "The Collective is our ongoing monthly membership for active traders. It includes weekly live trading sessions, institutional-grade market analysis, advanced strategy deep-dives, and direct peer and mentor access. It's where traders go after completing a programme — or if they already have a system and want continuous sharpening.",
    },
    {
      q: "Do you provide trading signals?",
      a: "No. We don't tell you what to buy or sell. Every programme and the Collective itself is built around developing your independent decision-making. The goal is to make you self-sufficient, not dependent on someone else's calls.",
    },
    {
      q: "What is your refund policy?",
      a: "All sales are final. Our programmes require active engagement to deliver results, and we're upfront about this. If you're unsure which path is right for you, visit each programme's page for full details or contact us directly.",
    },
  ];

  return (
    <section id="faq" className="section-spacing relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-muted/10" />

      <div className="container-studio relative">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
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
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
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
        </div>
      </div>
    </section>
  );
};
