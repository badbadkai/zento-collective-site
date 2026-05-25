import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import logoMonogramLight from "@/assets/logo-dark.png";
import logoMonogramDark from "@/assets/logo-light.png";
import { useEffect, useRef, useState, useCallback } from "react";

// Grid configuration
const GRID_SIZE = 40;

interface GridCell {
  x: number;
  y: number;
  opacity: number;
}

const HoverGrid = ({ isVisible }: { isVisible: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const cellsRef = useRef<GridCell[]>([]);
  const isVisibleRef = useRef(isVisible);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Keep the ref in sync with the prop
  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  const initGrid = useCallback(() => {
    const cols = Math.ceil(dimensions.width / GRID_SIZE) + 1;
    const rows = Math.ceil(dimensions.height / GRID_SIZE) + 1;
    const cells: GridCell[] = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        cells.push({ x: x * GRID_SIZE, y: y * GRID_SIZE, opacity: 0 });
      }
    }
    cellsRef.current = cells;
  }, [dimensions]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (dimensions.width > 0) {
      initGrid();
    }
  }, [dimensions, initGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const animate = () => {
      // Pause the animation loop when the hero section is offscreen
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const radius = 200;

      cellsRef.current.forEach((cell) => {
        const cellCenterX = cell.x + GRID_SIZE / 2;
        const cellCenterY = cell.y + GRID_SIZE / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX - cellCenterX, 2) + Math.pow(mouseY - cellCenterY, 2)
        );

        // Calculate target opacity based on distance
        const targetOpacity = distance < radius ? 1 - distance / radius : 0;

        // Smooth transition
        cell.opacity += (targetOpacity - cell.opacity) * 0.1;

        if (cell.opacity > 0.01) {
          // Draw cell border with gold color
          ctx.strokeStyle = `hsla(38, 75%, 55%, ${cell.opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(cell.x, cell.y, GRID_SIZE, GRID_SIZE);

          // Fill with subtle gold
          ctx.fillStyle = `hsla(38, 75%, 55%, ${cell.opacity * 0.08})`;
          ctx.fillRect(cell.x, cell.y, GRID_SIZE, GRID_SIZE);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export const Hero = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch devices on mount — skip HoverGrid entirely on mobile
  useEffect(() => {
    const touch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);
  }, []);

  // IntersectionObserver to pause canvas animation when hero is offscreen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollToOfferings = () => {
    const offeringsSection = document.getElementById("offerings");
    offeringsSection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Interactive Grid Background — only rendered on non-touch devices */}
      {!isTouchDevice && <HoverGrid isVisible={isVisible} />}

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-40 pointer-events-none" />

      {/* Grain texture */}
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Content */}
      <div className="container-studio relative z-10 text-center px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Logo — both images stacked, crossfade on theme switch */}
        <div className="mb-10 md:mb-14 animate-fade-in">
          <div
            className="relative w-48 sm:w-56 md:w-72 mx-auto hero-logo-hover"
            style={{ animation: "logo-breathe 4s ease-in-out infinite, float 6s ease-in-out infinite" }}
          >
            <img
              src={logoMonogramLight}
              alt="Zentō Collective"
              className={`w-full h-auto transition-opacity duration-500 ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
            />
            <img
              src={logoMonogramDark}
              alt=""
              className={`absolute inset-0 w-full h-auto transition-opacity duration-500 ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
            />
          </div>
        </div>

        {/* Main Headline */}
        <h1
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-6 md:mb-8 text-balance leading-[1.1] animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="animate-shimmer-gold inline-block">Sharpen</span>{" "}your edge.
        </h1>

        {/* Subheadline */}
        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 md:mb-14 max-w-3xl mx-auto text-balance leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Structure your trading with systematic execution, psychological
          edge, and real accountability. Built for traders who value{" "}
          <span className="text-foreground font-medium">disciplined performance</span>.
        </p>

        {/* CTA */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            variant="hero"
            size="lg"
            className="group w-full sm:w-auto min-w-[200px]"
            onClick={scrollToOfferings}
          >
            Get Started
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Trust indicator */}
        <p
          className="mt-6 text-sm text-muted-foreground animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Instant access. 14-day free trial. Cancel anytime.
        </p>

        {/* Decorative divider */}
        <div
          className="mt-16 md:mt-24 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="divider-gold" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in z-10" style={{ animationDelay: "0.6s" }}>
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
