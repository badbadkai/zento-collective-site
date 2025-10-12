import { WaitlistForm } from "@/components/WaitlistForm";

export const Waitlist = () => {
  return (
    <section id="waitlist" className="section-spacing bg-card/30">
      <div className="container-studio">
        <div className="max-w-4xl mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Join the Waiting List Now.
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground mb-8 font-medium">
            Structured tools designed to train consistency, decision control, and measurable improvement.
          </p>
        </div>

        <WaitlistForm />
      </div>
    </section>
  );
};
