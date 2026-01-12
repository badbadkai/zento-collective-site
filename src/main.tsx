import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PricingProvider } from "./context/PricingContext";
import "./index.css";

// Ensure the browser tab shows the concise site title
document.title = "Greenridge Studios";

createRoot(document.getElementById("root")!).render(
  <PricingProvider>
    <App />
  </PricingProvider>
);
