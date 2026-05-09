import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  CurrencyCode,
  detectGeo,
  GeoData,
  mapRegionToCurrency,
  formatPrice,
  getProductPrice,
  getOldCombinedPrice
} from "@/lib/pricing";

interface PricingContextType {
  currency: CurrencyCode;
  countryCode?: string;
  timeZone?: string;
  isLoading: boolean;
  formatPrice: (product: string) => string;
  getPrice: (product: string) => number;
  formatOldCombinedPrice: () => string;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

interface PricingProviderProps {
  children: React.ReactNode;
}

/**
 * PricingProvider
 * Detects user's geo location on mount and provides pricing context
 * Uses useRef to prevent double-fetches in StrictMode
 */
export const PricingProvider: React.FC<PricingProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [countryCode, setCountryCode] = useState<string | undefined>();
  const [timeZone, setTimeZone] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  // Guard against double-fetch in StrictMode
  const detectionStarted = useRef(false);

  useEffect(() => {
    if (detectionStarted.current) {
      return;
    }

    detectionStarted.current = true;

    // Detect geo and update state
    detectGeo()
      .then((geoData: GeoData) => {
        const detectedCurrency = mapRegionToCurrency(
          geoData.countryCode,
          geoData.currency
        );

        setCountryCode(geoData.countryCode);
        setTimeZone(geoData.timeZone);
        setCurrency(detectedCurrency);
      })
      .catch((error) => {
        console.error("Error detecting geo:", error);
        // Fall back to USD on error
        setCurrency("USD");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const contextValue: PricingContextType = {
    currency,
    countryCode,
    timeZone,
    isLoading,
    formatPrice: (product: string) => {
      const price = getProductPrice(product, currency);
      return formatPrice(price, currency);
    },
    getPrice: (product: string) => {
      return getProductPrice(product, currency);
    },
    formatOldCombinedPrice: () => {
      const oldPrice = getOldCombinedPrice(currency);
      return formatPrice(oldPrice, currency);
    }
  };

  return (
    <PricingContext.Provider value={contextValue}>
      {children}
    </PricingContext.Provider>
  );
};

/**
 * Hook to access pricing context
 * Must be used within a PricingProvider
 */
export function usePricing(): PricingContextType {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error("usePricing must be used within a PricingProvider");
  }
  return context;
}
