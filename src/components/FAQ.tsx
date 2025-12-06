import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

export const FAQ = () => {
  const faqs = [
    {
      q: "What is Greenridge Studios?",
      a: "Greenridge Studios is a private trading community that blends market education with psychology and performance training. We focus on helping traders improve clarity, discipline, and decision-making using simple, practical frameworks"
    },
    {
      q: "Is this community suitable for beginners? ",
      a: "Yes. Traders of all levels are welcome, including complete beginners. We provide clear explanations, supportive discussions, and resources designed to help you learn step-by-step at your own pace."
    },
    {
      q: "What is included in the free community?",
      a: "Free members get access to general discussion channels, announcements, and limited educational posts. It’s a great place to connect with others, ask questions, and learn the basics before deciding if you want to go deeper."
    },
    {
      q: "Do you offer trade signals in the community?",
      a: "We do not solely offer signals and should not be viewed as such. Analysts sometimes offer trade ideas by their own discretion, but are not to be used directly as financial advice. We want our members to learn to make educated decisions instead of blindly following calls."
    },
    {
      q: "What kind of educational content are available?",
      a: "We offer a comprehensive library of educational materials covering our trading frameworks, psychology and risk management. You will also get access to recorded sessions and trade breakdowns to help you deepen your understanding of the markets."
    },
    {
      q: "Do you offer refunds?",
      a: "No, we do not offer refunds and all sales are final. If you are unsure, please subscribe to a monthly plan for no commitment."
    }
  ];

  return (
    <section id="faq" className="section-spacing bg-background">
      <div className="container-studio">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-2">Common questions about Greenridge Studios and our 1-to-1 mentorship.</p>
        </div>

        <div className="grid gap-4">
          {faqs.map((item, idx) => (
            <div key={idx} className="border rounded-md p-4 bg-card/50">
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${idx}`}>
                  <AccordionTrigger>
                    <span className="font-medium">{item.q}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
