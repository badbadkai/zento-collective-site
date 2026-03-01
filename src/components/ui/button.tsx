import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary gold button with glow
        default:
          "bg-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]",
        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Elegant outlined button
        outline:
          "border-2 border-border bg-transparent hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10",
        // Subtle secondary
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Ghost - minimal hover effect
        ghost:
          "hover:bg-muted hover:text-foreground",
        // Link style with animated underline
        link:
          "text-primary underline-offset-4 hover:underline font-medium",
        // Hero CTA - premium gold with strong glow
        hero:
          "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] tracking-wide",
        // Premium - gold border with fill on hover
        premium:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground font-semibold",
        // Dark - inverted for light backgrounds
        dark:
          "bg-foreground text-background hover:bg-foreground/90 font-semibold",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-13 rounded-lg px-8 py-3 text-base",
        xl: "h-14 rounded-lg px-10 py-4 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
