import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PricingProvider } from "./context/PricingContext";
import "./index.css";

// Ensure the browser tab shows the concise site title
document.title = "Zentō Collective";

createRoot(document.getElementById("root")!).render(
  <PricingProvider>
    <App />
  </PricingProvider>
);
