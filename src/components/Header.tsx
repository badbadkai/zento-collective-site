import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  const goHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-studio py-4 flex items-center justify-between">
        <button 
          onClick={goHome}
          className="transition-transform hover:scale-105 active:scale-95"
          aria-label="Go to home"
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                Others
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/waitlist')}>Waitlist</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
