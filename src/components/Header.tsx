import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { Moon, Sun, ChevronDown, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const goHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
        
        {/* Right side - Desktop Navigation + Theme toggle and Mobile Menu */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('solution')}
              aria-label="Go to Features"
            >
              Features
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('offerings')}
              aria-label="Go to Pricing"
            >
              Pricing
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  Resources
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/waitlist');
                }}>
                  Waitlist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  window.open('https://blog.greenridgestudios.com', '_blank');
                }}>
                  Articles
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('faq')}
              aria-label="Go to FAQ"
            >
              FAQ
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Mobile Hamburger Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="justify-start text-base"
                    onClick={() => scrollToSection('solution')}
                  >
                    Features
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="justify-start text-base"
                    onClick={() => scrollToSection('offerings')}
                  >
                    Pricing
                  </Button>
                </SheetClose>

                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-3 px-4">
                    Resources
                  </p>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="justify-start text-base w-full"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate('/waitlist');
                      }}
                    >
                      Waitlist
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="justify-start text-base w-full"
                      onClick={() => {
                        window.open('https://blog.greenridgestudios.com', '_blank');
                      }}
                    >
                      Articles
                    </Button>
                  </SheetClose>
                </div>

                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="justify-start text-base"
                    onClick={() => scrollToSection('faq')}
                  >
                    FAQ
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
