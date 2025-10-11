import { WaitlistForm } from "@/components/WaitlistForm";

export const Waitlist = () => {
  return (
    <section id="waitlist" className="section-spacing bg-card/30">
      <div className="container-studio">
        <div className="max-w-4xl mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Join the Cognitive Performance Waitlist.
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground mb-8 font-medium">
            The Studio is building systems that apply neuroscience and behavioral data to trading performance — structured tools designed to train consistency, decision control, and measurable improvement.
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your behavior is the edge. Join early to access research-based frameworks and data-driven tools engineered for traders who value precision over emotion.
          </p>
        </div>

        <WaitlistForm />
      </div>
    </section>
  );
};
