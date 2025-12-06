import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
export const Hero = () => {
  const {
    theme
  } = useTheme();
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Content */}
      <div className="container-studio relative z-10 text-center animate-fade-in px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <img src={theme === "dark" ? logoLight : logoDark} alt="Greenridge Studios Logo" className="w-32 h-auto sm:w-44 md:w-56 mx-auto mb-8 md:mb-10 animate-fade-in" />
        <h1 className="font-hero text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-5 md:mb-8 text-balance leading-tight">
          Performance begins with yourself.
    
        </h1>
        
        <p className="text-base sm:text-lg md:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto text-balance leading-relaxed text-center">
          <span className="inline-block bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground bg-[length:200%_auto] text-transparent bg-clip-text animate-shimmer">Greenridge Studios</span> helps traders achieve peak performance through cognitive restructuring and process-driven execution grounded in behavioral science.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Button variant="hero" size="lg" className="group w-full sm:w-auto" onClick={() => {
          window.location.href = 'https://whop.com/greenridge-studios/greenridge-studios-premium/?utm_source=store_page&funnelId=store_c45e4b4b-1cd0-4812-9b64-30890d429456';
        }}>
            Join Now
            <ArrowRight className="animate-arrow-bounce" />
          </Button>

          <div className="text-sm text-muted-foreground font-medium">OR</div>

          <Button variant="accent" size="lg" className="w-full sm:w-auto" onClick={() => {
            const waitlistSection = document.getElementById('waitlist');
            waitlistSection?.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }}>
            Book a 1-to-1 session
          </Button>
        </div>
      </div>
    </section>;
};