import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Stagger children sequentially */
  stagger?: boolean;
  /** Stagger delay between children (ms) */
  staggerDelay?: number;
  /** Distance to translate from (px) */
  distance?: number;
  /** IntersectionObserver threshold */
  threshold?: number;
}

export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  distance = 30,
  threshold = 0.15,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

/** Wrapper that staggers its direct children with fade-in-up */
export const ScrollRevealGroup = ({
  children,
  className = "",
  staggerDelay = 100,
  distance = 30,
  threshold = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  distance?: number;
  threshold?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : `translateY(${distance}px)`,
                transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}ms`,
                willChange: isVisible ? "auto" : "opacity, transform",
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
};
