/**
 * Pricing and localization utilities
 * Handles currency detection, mapping, and price formatting
 */

export type CurrencyCode = "USD" | "SGD" | "GBP" | "EUR";

// Eurozone country codes (ISO 3166-1 alpha-2)
const EUROZONE_COUNTRIES = new Set([
  "AT", "BE", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES"
]);

// Fixed pricing table (in each currency)
const PRICING_TABLE: Record<string, Record<string, number>> = {
  accelerator: {
    USD: 329,
    SGD: 433,
    GBP: 249,
    EUR: 299
  },
  bootcamp: {
    USD: 599,
    SGD: 779,
    GBP: 449,
    EUR: 539
  },
  collective_monthly: {
    USD: 129,
    SGD: 169,
    GBP: 99,
    EUR: 119
  },
  collective_quarterly: {
    USD: 329,
    SGD: 429,
    GBP: 249,
    EUR: 299
  },
  collective_annual: {
    USD: 999,
    SGD: 1299,
    GBP: 749,
    EUR: 899
  }
};

// Currency symbols
const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  SGD: "S$",
  GBP: "£",
  EUR: "€"
};

export interface GeoData {
  countryCode?: string;
  currency?: string;
  timeZone?: string;
  ts?: number;
}

/**
 * Map country/region to currency code
 * Uses explicit country codes, Eurozone allowlist, and falls back to USD
 */
export function mapRegionToCurrency(
  countryCode?: string,
  currency?: string
): CurrencyCode {
  if (!countryCode) {
    return "USD";
  }

  // Explicit mappings
  if (countryCode === "SG") return "SGD";
  if (countryCode === "US") return "USD";
  if (countryCode === "GB") return "GBP";

  // Eurozone check
  if (EUROZONE_COUNTRIES.has(countryCode)) {
    return "EUR";
  }

  // Fallback to currency from API if it's EUR
  if (currency === "EUR") {
    return "EUR";
  }

  // Default to USD
  return "USD";
}

/**
 * Get currency symbol for a currency code
 */
export function getCurrencySymbol(currencyCode: CurrencyCode): string {
  return CURRENCY_SYMBOLS[currencyCode] || "$";
}

/**
 * Get product price in a specific currency
 * @param product - Product key (e.g., "accelerator")
 * @param currencyCode - Currency code
 * @returns Price as integer (no decimals)
 */
export function getProductPrice(
  product: string,
  currencyCode: CurrencyCode
): number {
  return PRICING_TABLE[product]?.[currencyCode] ?? PRICING_TABLE[product]?.USD ?? 0;
}

/**
 * Format price with currency symbol and no decimals
 * @param amount - Numeric price
 * @param currencyCode - Currency code
 * @returns Formatted string (e.g., "$175", "£139", "€159")
 */
export function formatPrice(amount: number, currencyCode: CurrencyCode): string {
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${Math.round(amount)}`;
}

/**
 * Load cached geo data from localStorage
 * Returns null if cache doesn't exist, is expired, or invalid
 */
export function loadCachedGeo(): GeoData | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }

    const cached = window.localStorage.getItem("_geo_cache");
    if (!cached) {
      return null;
    }

    const data: GeoData = JSON.parse(cached);
    const now = Date.now();
    const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

    // Check if cache is expired
    if (data.ts && now - data.ts > CACHE_TTL) {
      window.localStorage.removeItem("_geo_cache");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error loading cached geo data:", error);
    return null;
  }
}

/**
 * Save geo data to localStorage with timestamp
 */
export function saveCachedGeo(data: GeoData): void {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }

    window.localStorage.setItem(
      "_geo_cache",
      JSON.stringify({
        ...data,
        ts: Date.now()
      })
    );
  } catch (error) {
    console.error("Error saving cached geo data:", error);
  }
}

/**
 * Detect user's timezone via Intl API
 */
function detectTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.warn("Could not detect timezone:", error);
    return "UTC";
  }
}

/**
 * Fetch geo data from ipapi.co (async, background)
 * Returns country code and currency info
 */
async function fetchGeoFromIP(): Promise<{
  countryCode?: string;
  currency?: string;
} | null> {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (!response.ok) {
      console.warn("IP geolocation API returned:", response.status);
      return null;
    }

    const data = await response.json();

    return {
      countryCode: data.country_code,
      currency: data.currency
    };
  } catch (error) {
    console.warn("IP geolocation fetch failed:", error);
    return null;
  }
}

/**
 * Main detection function
 * Checks cache first, then fetches geo data in background
 * Always returns immediately with timezone and either cached or default values
 */
export async function detectGeo(): Promise<GeoData> {
  const timeZone = detectTimeZone();

  // Try cache first
  const cached = loadCachedGeo();
  if (cached) {
    return {
      ...cached,
      timeZone // Always refresh timezone
    };
  }

  // Fetch in background (don't wait)
  const ipData = await fetchGeoFromIP();

  const geoData: GeoData = {
    countryCode: ipData?.countryCode,
    currency: ipData?.currency,
    timeZone
  };

  // Cache the result
  saveCachedGeo(geoData);

  return geoData;
}
