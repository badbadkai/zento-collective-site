import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  result?: string;
}

// Placeholder testimonials - replace with real ones
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The systematic approach fundamentally changed my relationship with the markets. No more reactive decisions — just clear framework execution.",
    author: "Alex M.",
    role: "Prop Trader",
    result: "+32% in 3 months",
  },
  {
    id: 2,
    quote:
      "I struggled with emotional trading for years. The accountability structures here finally gave me the discipline I couldn't build on my own.",
    author: "Sarah K.",
    role: "Swing Trader",
    result: "67% win rate",
  },
  {
    id: 3,
    quote:
      "The calibre of traders in this community accelerated my development faster than years of solo learning. Quality environment, quality results.",
    author: "James T.",
    role: "Day Trader",
    result: "Funded in 45 days",
  },
  {
    id: 4,
    quote:
      "Most communities focus on setups. This one focuses on the operator. That psychological edge was the missing variable in my trading equation.",
    author: "Michael R.",
    role: "Forex Trader",
    result: "Consistent profitability",
  },
  {
    id: 5,
    quote:
      "The Accelerator gave me a complete operating system — documented rules, risk protocols, and a repeatable process I can trust.",
    author: "Emma L.",
    role: "Futures Trader",
    result: "3 funded accounts",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="border border-border/50 bg-card/30 rounded-2xl p-6 md:p-8 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
    {/* Quote icon */}
    <Quote className="w-8 h-8 text-primary/30 mb-4" />

    {/* Quote text */}
    <blockquote className="text-foreground text-sm md:text-base leading-relaxed mb-6">
      "{testimonial.quote}"
    </blockquote>

    {/* Author info */}
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <span className="text-primary font-bold text-sm">
            {testimonial.author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">
            {testimonial.author}
          </p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>

      {/* Result badge */}
      {testimonial.result && (
        <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
          {testimonial.result}
        </span>
      )}
    </div>
  </div>
);

export const TestimonialsCarousel = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />

      <div className="relative">
        {/* Section Header */}
        <div className="container-studio text-center mb-12 md:mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            Member Outcomes
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
            Voices from the{" "}
            <span className="text-primary">Collective</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Real perspectives from traders who committed to systematic development.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="container-studio">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>

        {/* Note */}
        <p className="container-studio text-center text-xs text-muted-foreground mt-8 italic">
          Individual experiences shared. Trading results vary based on numerous factors.
        </p>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
