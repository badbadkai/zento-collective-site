import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import heroImage from "@/assets/hero-equity-curve.jpg";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
export const Hero = () => {
  const {
    theme
  } = useTheme();
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-30" style={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Content */}
      <div className="container-studio relative z-10 text-center animate-fade-in">
        <img src={theme === "dark" ? logoLight : logoDark} alt="Greenridge Studios Logo" className="w-52 h-auto md:w-64 mx-auto mb-8 animate-fade-in" />
        <h1 className="font-hero text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
          Performance begins with yourself.
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-balance">
          <span className="inline-block bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground bg-[length:200%_auto] text-transparent bg-clip-text animate-shimmer">The Studio</span> helps traders achieve peak performance through cognitive restructuring and process-driven execution grounded in behavioral science.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button variant="hero" size="lg" className="group" onClick={() => {
          const waitlistSection = document.getElementById('waitlist');
          waitlistSection?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }}>
            Join Us Now!
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="accent" size="lg">
            <span className="bg-gradient-to-r from-accent-foreground via-white to-accent-foreground bg-[length:200%_auto] text-transparent bg-clip-text animate-shimmer">Preview The Journal</span>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Free to join -- No shortcuts, just structure.
        </p>
      </div>
    </section>;
};