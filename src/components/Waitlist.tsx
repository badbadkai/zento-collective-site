import { WaitlistForm } from "@/components/WaitlistForm";

export const Waitlist = () => {
  return (
    <section id="waitlist" className="section-spacing bg-card/30">
      <div className="container-studio">
        <div className="max-w-4xl mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Join the Waiting List Now.
          </h2>
          
          <p className="text-base sm:text-xl md:text-2xl text-foreground mb-6 md:mb-8 font-medium">
            Turn behaviour into your edge. No excuses.
          </p>
        </div>

        <WaitlistForm />
      </div>
    </section>
  );
};
