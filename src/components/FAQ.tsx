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
      q: "What exactly is Greenridge Studios?",
      a: "Greenridge Studios is a private trading collective that integrates market education with psychological performance training. Our focus is developing systematic traders who execute with clarity, discipline, and measurable consistency.",
    },
    {
      q: "Is this suitable for beginners?",
      a: "Absolutely. We welcome traders at every stage. Our structured curriculum provides clear progression paths, and our community offers supportive discussions designed to help you develop at your own pace.",
    },
    {
      q: "What does free membership include?",
      a: "Free members gain access to general discussion channels, community announcements, and select educational content. It's an ideal starting point to experience our environment before committing further.",
    },
    {
      q: "Do you provide trading signals?",
      a: "We do not operate as a signals service. While analysts may share trade ideas at their discretion, our emphasis is on developing your independent analytical capability rather than creating dependency on external calls.",
    },
    {
      q: "What educational resources are available?",
      a: "Premium members access our complete educational library covering systematic frameworks, trading psychology, and risk management protocols. This includes recorded sessions, live breakdowns, and structured learning modules.",
    },
    {
      q: "What is your refund policy?",
      a: "All sales are final with no refunds offered. If uncertain, we recommend starting with a monthly subscription to evaluate whether our approach aligns with your development goals.",
    },
  ];

  return (
    <section id="faq" className="section-spacing relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-muted/10" />

      <div className="container-studio relative">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 animate-fade-in">
            Common Questions
          </p>
          <h2
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Before You <span className="text-primary">Decide</span>
          </h2>
          <p
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Clear answers to help you evaluate if this environment is right for you.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="group border border-border/50 rounded-xl bg-card/30 backdrop-blur-sm overflow-hidden data-[state=open]:border-primary/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${0.2 + idx * 0.05}s` }}
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
  );
};
