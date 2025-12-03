import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
export const Hero = () => {
  const {
    theme
  } = useTheme();
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Content */}
      <div className="container-studio relative z-10 text-center animate-fade-in py-8">
        <img src={theme === "dark" ? logoLight : logoDark} alt="Greenridge Studios Logo" className="w-36 h-auto sm:w-52 md:w-64 mx-auto mb-6 md:mb-8 animate-fade-in" />
        <h1 className="font-hero text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 text-balance">
          Performance begins with yourself.
        </h1>
        
        <p className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto text-balance">
          <span className="inline-block bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground bg-[length:200%_auto] text-transparent bg-clip-text animate-shimmer">The Studio</span> helps traders achieve peak performance through cognitive restructuring and process-driven execution grounded in behavioral science.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8">
          <Button variant="hero" size="lg" className="group" onClick={() => {
          const waitlistSection = document.getElementById('waitlist');
          waitlistSection?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }}>
            Join the Waitlist Now
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="accent" size="lg">
            <span className="bg-gradient-to-r from-accent-foreground via-white to-accent-foreground bg-[length:200%_auto] text-transparent bg-clip-text animate-shimmer">Preview The Journal</span>
          </Button>
        </div>
      </div>
    </section>;
};