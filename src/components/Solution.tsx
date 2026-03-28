import { X, Check } from "lucide-react";

export const Solution = () => {
  return (
    <section id="solution" className="section-spacing relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

      <div className="container-studio relative">
        {/* Header - punchy, problem-aware */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
            The Problem
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            Most traders{" "}
            <span className="text-primary">fail</span>
            <br />
            because they skip the foundation.
          </h2>
        </div>

        {/* Two-column contrast: Without vs With */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
          {/* WITHOUT */}
          <div className="relative p-8 md:p-10 rounded-2xl border border-destructive/20 bg-destructive/5">
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
                <li key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WITH */}
          <div className="relative p-8 md:p-10 rounded-2xl border border-primary/30 bg-primary/5">
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
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Single line closer */}
        <p className="text-center text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          We build the foundation first. Strategy comes after.
        </p>
      </div>
    </section>
  );
};

export default Solution;
