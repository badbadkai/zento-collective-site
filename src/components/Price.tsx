import React from "react";
import { usePricing } from "@/context/PricingContext";
import { getCurrencySymbol } from "@/lib/pricing";

interface PriceProps {
  product: string;
  className?: string;
  showCode?: boolean;
}

/**
 * Price Component
 * Displays localized price for a product based on user's detected region
 *
 * @param product - Product key (e.g., "accelerator")
 * @param className - Optional CSS class
 * @param showCode - If true, shows currency code (e.g., "$175 USD")
 *
 * Example:
 * <Price product="accelerator" />
 * <Price product="accelerator" showCode className="text-lg font-bold" />
 */
export const Price: React.FC<PriceProps> = ({
  product,
  className = "",
  showCode = false
}) => {
  const { currency, getPrice, formatPrice } = usePricing();

  const price = getPrice(product);
  const formatted = formatPrice(product);

  // Fallback display if price not found
  if (!price) {
    return <span className={className}>Price unavailable</span>;
  }

  const displayText = showCode ? `${formatted} ${currency}` : formatted;

  return <span className={className}>{displayText}</span>;
};

export default Price;
