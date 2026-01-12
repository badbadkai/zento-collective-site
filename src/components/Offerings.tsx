import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Offerings = () => {
  const navigate = useNavigate();
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  return (
    <section id="offerings" className="section-spacing bg-background">
      <div className="container-studio">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Which Path Is For You?
          </h2>
        </div>

        {/* SVG Paths Container */}
        <div className="relative mb-12 md:mb-16 h-24 flex justify-center pointer-events-none">
          <svg width="100%" height="100" viewBox="0 0 800 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-0">
            {/* Left path */}
            <path
              d="M 400 0 Q 300 30, 200 60"
              stroke={hoveredBox === "accelerator" ? "rgb(34, 197, 94)" : "rgb(200, 200, 200)"}
              strokeWidth="2"
              fill="none"
              className="transition-colors duration-300"
              strokeLinecap="round"
            />
            {/* Right path */}
            <path
              d="M 400 0 Q 500 30, 600 60"
              stroke={hoveredBox === "community" ? "rgb(34, 197, 94)" : "rgb(200, 200, 200)"}
              strokeWidth="2"
              fill="none"
              className="transition-colors duration-300"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* 30-Day Accelerator */}
          <div
            className="animate-fade-in p-8 md:p-10 border-2 border-border rounded-lg bg-card hover:shadow-lg transition-shadow flex flex-col"
            onMouseEnter={() => setHoveredBox("accelerator")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                The 30-Day Trading Accelerator
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-4">
                For intelligent beginners who feel overwhelmed, inconsistent, or stuck guessing.
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                Build your complete trading process in 30 structured days. No shortcuts. No signals. Just discipline, rules, and clarity.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-sm text-foreground">One written trading blueprint</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-sm text-foreground">Defined risk framework & psychology</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-sm text-foreground">Weekly live Q&A & community support</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-sm text-foreground">Prop firm readiness assessment</p>
              </li>
            </ul>

            <Button
              className="w-full group wave-hover mt-auto"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/start");
              }}
            >
              Apply to the Accelerator
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Exclusive Community */}
          <div
            className="animate-fade-in p-8 md:p-10 border-2 border-primary/20 rounded-lg bg-primary/5 hover:shadow-lg transition-shadow flex flex-col"
            onMouseEnter={() => setHoveredBox("community")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                The Exclusive Community
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-4">
                For traders who've moved beyond the basics.
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                Join a curated community of serious traders with ongoing market analysis, live trading discussions, and advanced strategies.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-sm text-foreground">Weekly live trading streams</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-sm text-foreground">Detailed market breakdowns & analysis</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-sm text-foreground">Advanced webinars & strategy discussions</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-sm text-foreground">Direct access to trading community</p>
              </li>
            </ul>

            <Button
              className="w-full group wave-hover mt-auto"
              onClick={() => {
                window.location.href = 'https://whop.com/greenridge-studios/greenridge-studios-premium/?utm_source=store_page&funnelId=store_c45e4b4b-1cd0-4812-9b64-30890d429456';
              }}
            >
              Join the Community
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
