import logoMonogramLight from "@/assets/logo-monogram-light.svg";
import logoMonogramDark from "@/assets/logo-monogram-dark.svg";
import { Moon, Sun, ChevronDown, Menu } from "lucide-react";
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
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { label: "Features", action: () => scrollToSection("solution") },
    { label: "Pricing", action: () => scrollToSection("offerings") },
    { label: "FAQ", action: () => scrollToSection("faq") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container-studio flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={goHome}
          className="relative group min-h-[44px] min-w-[44px] flex items-center"
          aria-label="Go to home"
        >
          <img
            src={theme === "dark" ? logoMonogramLight : logoMonogramDark}
            alt="Greenridge Studios"
            className="h-9 md:h-11 w-auto transition-all duration-300 group-hover:opacity-80"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute bottom-1 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          ))}

          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 group">
                Resources
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-[180px] bg-card/95 backdrop-blur-xl border-border/50"
            >
              <DropdownMenuItem
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/waitlist");
                }}
                className="cursor-pointer"
              >
                Waitlist
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/articles");
                }}
                className="cursor-pointer"
              >
                Articles
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative overflow-hidden"
          >
            <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
          </Button>

          {/* CTA Button - Desktop */}
          <Button
            variant="default"
            size="sm"
            onClick={() => scrollToSection("offerings")}
            className="hidden md:flex"
          >
            Get Started
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] sm:w-[350px] bg-background/95 backdrop-blur-xl border-l border-border/50"
            >
              <div className="flex flex-col h-full pt-8">
                {/* Mobile Nav Items */}
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.label}>
                      <button
                        onClick={item.action}
                        className="w-full text-left px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        {item.label}
                      </button>
                    </SheetClose>
                  ))}

                  {/* Resources Section */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Resources
                    </p>
                    <SheetClose asChild>
                      <button
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate("/waitlist");
                        }}
                        className="w-full text-left px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        Waitlist
                      </button>
                    </SheetClose>
                    <SheetClose asChild>
                      <button
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate("/articles");
                        }}
                        className="w-full text-left px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        Articles
                      </button>
                    </SheetClose>
                  </div>
                </nav>

                {/* Mobile CTA */}
                <div className="mt-auto pb-8">
                  <SheetClose asChild>
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={() => scrollToSection("offerings")}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
