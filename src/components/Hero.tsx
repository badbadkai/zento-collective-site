import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-equity-curve.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Content */}
      <div className="container-studio relative z-10 text-center animate-fade-in">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
          Precision Is a Habit,<br />Not a Signal.
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-balance">
          The Studio trains price-action traders to systemize execution, remove emotion, 
          and operate like a process — not a guess.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button variant="hero" size="lg" className="group">
            Join The Studio Free
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="accent" size="lg">
            Preview The Journal
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Free to join. No signals. No spam — just structure.
        </p>
      </div>
    </section>
  );
};
