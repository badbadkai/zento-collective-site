import { useEffect, useState, useRef } from "react";
import { TrendingUp, Users, Target, Award, Zap, BarChart3 } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  label: string;
  value: string;
  suffix?: string;
  color?: string;
}

const stats: Stat[] = [
  { icon: Users, label: "Active Members", value: "500", suffix: "+", color: "text-primary" },
  { icon: TrendingUp, label: "Avg. Win Rate", value: "67", suffix: "%", color: "text-emerald-500" },
  { icon: Target, label: "Strategies Developed", value: "1,200", suffix: "+", color: "text-primary" },
  { icon: Award, label: "Success Stories", value: "340", suffix: "+", color: "text-amber-500" },
  { icon: Zap, label: "Live Sessions", value: "50", suffix: "/month", color: "text-primary" },
  { icon: BarChart3, label: "Trades Analyzed", value: "25K", suffix: "+", color: "text-primary" },
];

// Duplicate for infinite scroll effect
const duplicatedStats = [...stats, ...stats];

export const LiveStatsTicker = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-spacing-sm relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />

      <div className="container-studio relative">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 animate-fade-in">
            Community Impact
          </p>
          <h2
            className={`font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Real Results,{" "}
            <span className="text-primary">Real Traders</span>
          </h2>
          <p
            className={`text-muted-foreground text-base md:text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Join a community of traders who are systematically improving their
            performance through structured development.
          </p>
        </div>

        {/* Stats Grid - Desktop */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm text-center hover:border-primary/40 hover:bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  {/* Icon */}
                  <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className={`w-6 h-6 ${stat.color || "text-primary"}`} />
                  </div>

                  {/* Value */}
                  <div className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                    <span className="text-primary">{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    {stat.label}
                  </p>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Ticker - Mobile */}
        <div className="md:hidden relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="overflow-hidden">
            <div className="animate-ticker flex gap-4 py-2">
              {duplicatedStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[160px] p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm text-center"
                  >
                    <div className="mx-auto mb-2 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className={`w-5 h-5 ${stat.color || "text-primary"}`} />
                    </div>
                    <div className="font-heading text-xl font-bold text-foreground">
                      {stat.value}
                      <span className="text-primary">{stat.suffix}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live indicator */}
        <div
          className={`flex items-center justify-center gap-2 mt-10 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-sm text-muted-foreground">
            Updated in real-time
          </span>
        </div>
      </div>
    </section>
  );
};

export default LiveStatsTicker;
