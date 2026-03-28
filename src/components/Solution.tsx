import { X, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const useInView = (threshold = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

const TypeWriter = ({ text, speed = 45, onDone }: { text: string; speed?: number; onDone?: () => void }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplayed("");
    setDone(false);

    const interval = setInterval(() => {
      idx.current++;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onDone]);

  return (
    <span>
      {displayed}
      <span
        className={`inline-block w-[3px] h-[0.85em] bg-primary align-middle ml-1 ${
          done ? "animate-blink" : ""
        }`}
        style={{
          animation: done ? "blink 1s step-end infinite" : "blink 0.6s step-end infinite",
        }}
      />
    </span>
  );
};

export const Solution = () => {
  const headerView = useInView(0.5);
  const [typingDone, setTypingDone] = useState(false);
  const cardsView = useInView(0.2);
  const closerView = useInView(0.5);

  return (
    <section id="solution" className="section-spacing relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

      <div className="container-studio relative">
        {/* Header with typewriter */}
        <div ref={headerView.ref} className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <p
            className={`text-primary font-medium text-sm tracking-widest uppercase mb-4 transition-all duration-700 ${
              headerView.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            The Problem
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 min-h-[1.2em]">
            {headerView.inView ? (
              <TypeWriter
                text="Most traders fail because they skip the foundation."
                speed={50}
                onDone={() => setTypingDone(true)}
              />
            ) : null}
          </h2>
        </div>

        {/* Two-column contrast */}
        <div
          ref={cardsView.ref}
          className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16"
        >
          {/* WITHOUT */}
          <div
            className={`relative p-8 md:p-10 rounded-2xl border border-destructive/20 bg-destructive/5 transition-all duration-700 delay-100 ${
              cardsView.inView && typingDone
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-destructive/70 mb-6 block">
              Without structure
            </span>
            <ul className="space-y-4">
              {[
                "Random entries based on gut feeling",
                "No risk rules, no stop loss",
                "Revenge trading after losses",
                "No journal, no review, no improvement",
                "Blown accounts within weeks",
              ].map((item, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 transition-all duration-500 ${
                    cardsView.inView && typingDone
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WITH */}
          <div
            className={`relative p-8 md:p-10 rounded-2xl border border-primary/30 bg-primary/5 transition-all duration-700 delay-200 ${
              cardsView.inView && typingDone
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-6 block">
              With structure
            </span>
            <ul className="space-y-4">
              {[
                "Rule-based entries with a tested checklist",
                "1% risk per trade, every time",
                "Daily loss limit stops the spiral",
                "Journal every trade, review every week",
                "Consistent process, compounding results",
              ].map((item, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 transition-all duration-500 ${
                    cardsView.inView && typingDone
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closer */}
        <p
          ref={closerView.ref}
          className={`text-center text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto transition-all duration-700 ${
            closerView.inView && typingDone
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          We build the foundation first. Strategy comes after.
        </p>
      </div>
    </section>
  );
};

export default Solution;
