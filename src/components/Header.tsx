import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-studio py-4 flex items-center justify-between">
        <button 
          onClick={scrollToTop}
          className="transition-transform hover:scale-105 active:scale-95"
          aria-label="Scroll to top"
        >
          <img 
            src={theme === "dark" ? logoLight : logoDark} 
            alt="Greenridge Studios Logo" 
            className="h-10 w-auto md:h-12"
          />
        </button>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const faq = document.getElementById('faq');
              if (faq) faq.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            aria-label="Go to FAQ"
          >
            FAQ
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  );
};
