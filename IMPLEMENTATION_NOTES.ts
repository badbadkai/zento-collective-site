/**
 * IMPLEMENTATION SUMMARY: Localized Pricing System
 * 
 * This document describes the automatic region/timezone detection
 * and localized pricing implementation for the Vite + React app.
 * 
 * ============================================================
 * FILES CREATED/MODIFIED
 * ============================================================
 * 
 * 1. src/lib/pricing.ts (CREATED)
 *    - CurrencyCode type: "USD" | "SGD" | "GBP" | "EUR"
 *    - EUROZONE_COUNTRIES: Set of ISO country codes
 *    - PRICING_TABLE: Fixed prices per currency
 *    - CURRENCY_SYMBOLS: Symbol mapping
 *    
 *    Functions:
 *    - mapRegionToCurrency(countryCode?, currency?): CurrencyCode
 *      Maps country codes to currencies with explicit logic:
 *      SG -> SGD, US -> USD, GB -> GBP, Eurozone -> EUR, else USD
 *    
 *    - getCurrencySymbol(currencyCode): string
 *      Returns symbol ($, S$, £, €)
 *    
 *    - getProductPrice(product, currencyCode): number
 *      Returns price from PRICING_TABLE
 *    
 *    - formatPrice(amount, currencyCode): string
 *      Formats as "S$229", "£139", etc. (no decimals)
 *    
 *    - loadCachedGeo(): GeoData | null
 *      Retrieves geo data from localStorage (7-day TTL)
 *    
 *    - saveCachedGeo(data): void
 *      Saves geo data with timestamp
 *    
 *    - detectGeo(): Promise<GeoData>
 *      Main detection function:
 *      1. Detects timezone via Intl API (sync)
 *      2. Checks localStorage cache (7-day TTL)
 *      3. If cached, returns immediately
 *      4. If not cached, fetches from ipapi.co (async)
 *      5. Saves result to cache
 *      6. Falls back to USD on any error
 * 
 * 2. src/context/PricingContext.tsx (CREATED)
 *    - PricingProvider: Wraps entire app, calls detectGeo() on mount
 *    - usePricing(): Hook to access pricing context
 *    - Context provides:
 *      * currency: CurrencyCode
 *      * countryCode?: string
 *      * timeZone?: string
 *      * isLoading: boolean
 *      * formatPrice(product): string
 *      * getPrice(product): number
 *    - Uses useRef to prevent double-fetch in StrictMode
 *    - Non-blocking: detectGeo() runs async, doesn't delay render
 * 
 * 3. src/components/Price.tsx (CREATED)
 *    - <Price product="accelerator" />
 *    - Props:
 *      * product: string (required) - key in PRICING_TABLE
 *      * className?: string - optional CSS class
 *      * showCode?: boolean - shows "£139 GBP" if true
 *    - Reads from usePricing() context
 *    - Displays formatted price (e.g., "£139")
 * 
 * 4. src/main.tsx (MODIFIED)
 *    - Wrapped <App /> with <PricingProvider>
 *    - Geo detection starts on first render
 * 
 * 5. src/pages/Start.tsx (MODIFIED)
 *    - Added import: import { Price } from "@/components/Price"
 *    - Pricing section:
 *      <Price product="accelerator" className="text-5xl font-bold..." />
 *    - CTA button:
 *      Join the Accelerator — <Price product="accelerator" />
 *    - Replaces hardcoded "£199" with dynamic localized price
 * 
 * ============================================================
 * DETECTION FLOW
 * ============================================================
 * 
 * On first page load:
 * 
 * 1. PricingProvider mounts
 * 2. Initial state: currency = "USD", isLoading = true
 * 3. detectGeo() called:
 *    - Detect timezone immediately (sync)
 *    - Check localStorage cache (looks for "_geo_cache")
 *    - If cache exists and not expired (< 7 days):
 *      Return { countryCode, currency, timeZone } immediately
 *    - If no cache or expired:
 *      Fetch https://ipapi.co/json/ (5 second timeout)
 *      Returns: { country_code, currency, ... }
 * 4. mapRegionToCurrency() maps country -> currency
 * 5. State updated with currency, countryCode, timeZone
 * 6. isLoading -> false
 * 
 * On subsequent page loads:
 * - Cache hit -> instant load with cached region
 * - Cache miss or expired -> fetch in background (doesn't block render)
 * 
 * ============================================================
 * PRICING TABLE
 * ============================================================
 * 
 * Base product: "accelerator"
 * 
 * USD:  $175
 * SGD:  S$229
 * GBP:  £139
 * EUR:  €159
 * 
 * All formatted without decimals.
 * 
 * ============================================================
 * CURRENCY MAPPING LOGIC
 * ============================================================
 * 
 * mapRegionToCurrency(countryCode, currency) returns:
 * 
 * if countryCode === "SG"             -> SGD
 * else if countryCode === "US"        -> USD
 * else if countryCode === "GB"        -> GBP
 * else if countryCode in Eurozone     -> EUR (explicit list: 20 countries)
 * else if currency === "EUR"          -> EUR (fallback from API)
 * else                                -> USD (default)
 * 
 * Eurozone countries (ISO codes):
 * AT, BE, HR, CY, EE, FI, FR, DE, GR, IE, IT, LV, LT, LU, MT, NL, PT, SK, SI, ES
 * 
 * ============================================================
 * EDGE CASES & ERROR HANDLING
 * ============================================================
 * 
 * 1. IP geolocation fetch fails:
 *    -> Falls back to USD
 *    -> Console warning logged
 *    -> Doesn't block page load
 * 
 * 2. localStorage unavailable:
 *    -> Gracefully handled
 *    -> Fetch happens every time (no cache)
 *    -> Still returns valid pricing
 * 
 * 3. Invalid cached data:
 *    -> try/catch block removes it
 *    -> Fetches fresh data
 * 
 * 4. Timezone detection fails:
 *    -> Defaults to "UTC"
 *    -> Doesn't affect currency mapping
 * 
 * 5. React StrictMode (dev):
 *    -> useRef(detectionStarted) prevents double-fetch
 *    -> detectGeo() called only once
 * 
 * 6. Missing product in PRICING_TABLE:
 *    -> Returns 0
 *    -> <Price /> shows "Price unavailable"
 * 
 * ============================================================
 * USAGE EXAMPLES
 * ============================================================
 * 
 * // In any component (must be within PricingProvider):
 * import { usePricing } from "@/context/PricingContext";
 * 
 * function MyComponent() {
 *   const { currency, getPrice, formatPrice } = usePricing();
 *   
 *   return (
 *     <div>
 *       <p>Your currency: {currency}</p>
 *       <p>Price: {formatPrice("accelerator")}</p>
 *     </div>
 *   );
 * }
 * 
 * // Using <Price /> component:
 * <Price product="accelerator" />
 * // Output: "$175" (or "£139", "€159", "S$229" depending on region)
 * 
 * <Price product="accelerator" showCode className="font-bold" />
 * // Output: "£139 GBP"
 * 
 * ============================================================
 * TESTING CHECKLIST
 * ============================================================
 * 
 * [ ] Load app in browser
 *     - Network tab should show ipapi.co/json/ request
 *     - localStorage should contain "_geo_cache"
 *     - Price should display based on detected region
 * 
 * [ ] Test different regions:
 *     - Singapore: Shows S$229
 *     - USA: Shows $175
 *     - UK: Shows £139
 *     - Eurozone (e.g., Germany): Shows €159
 *     - Other region: Shows $175 (default)
 * 
 * [ ] Test cache:
 *     - Reload page: Should use cached price
 *     - Network tab: No ipapi.co request on cached load
 *     - localStorage "_geo_cache" has recent timestamp
 * 
 * [ ] Test error handling:
 *     - Block ipapi.co requests in DevTools
 *     - Page should still load
 *     - Default to USD pricing
 *     - Console warning logged
 * 
 * [ ] Test React StrictMode:
 *     - No double IP lookups in dev mode
 *     - Single fetch only
 * 
 * [ ] Test on Start page:
 *     - Hero price displays
 *     - Pricing section shows <Price />
 *     - CTA button shows price dynamically
 * 
 * ============================================================
 * DEPLOYMENT NOTES
 * ============================================================
 * 
 * - No API keys required (ipapi.co free tier)
 * - Client-side detection only (works in SPA)
 * - Cache reduces API calls (7-day TTL)
 * - Graceful fallback on network errors
 * - No user prompts (fully automatic)
 * - Can add more products to PRICING_TABLE
 * - Can add more currencies following existing pattern
 * 
 * ============================================================
 */

export {};
