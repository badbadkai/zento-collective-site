import { Hash } from "lucide-react";
export const Community = () => {
  const channels = [{
    name: "#charts and #setups",
    description: "Market structure analysis and execution review."
  }, {
    name: "#journals",
    description: "Performance logs and cognitive pattern tracking."
  }, {
    name: "#education",
    description: "Behavioral frameworks and process design resources."
  }];
  return <section className="section-spacing bg-card/50">
      <div className="container-studio">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Calibrate Performance With Precision
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">Join a community of traders applying our frameworks to refine process control and reduce behavioral variance.</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8 md:mb-12">
          {channels.map((channel, index) => <div key={index} className="flex items-start gap-3 md:gap-4 p-4 md:p-6 mb-3 md:mb-4 rounded-lg bg-background border border-border animate-fade-in" style={{
          animationDelay: `${index * 0.15}s`
        }}>
              <Hash className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">{channel.name}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{channel.description}</p>
              </div>
            </div>)}
        </div>

      </div>
    </section>;
};