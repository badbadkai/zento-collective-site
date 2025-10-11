import { Button } from "@/components/ui/button";
import { Hash, ArrowRight } from "lucide-react";

export const Community = () => {
  const channels = [
    {
      name: "#charts and #setups",
      description: "Daily market structure sharing.",
    },
    {
      name: "#journals",
      description: "Trade logs and weekly performance posts.",
    },
    {
      name: "#education",
      description: "Price-action and mindset materials curated weekly.",
    },
  ];

  return (
    <section className="section-spacing bg-card/50">
      <div className="container-studio">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            A Network of<br />Disciplined Operators.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Inside The Studio Discord, traders share trade reviews, refine their routines, 
            and build mechanical consistency through repetition and feedback.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          {channels.map((channel, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 mb-4 rounded-lg bg-background border border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Hash className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold mb-2">{channel.name}</h3>
                <p className="text-muted-foreground">{channel.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="group">
            Join The Studio Free
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
