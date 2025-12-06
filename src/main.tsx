import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Ensure the browser tab shows the concise site title
document.title = "Greenridge Studios";

createRoot(document.getElementById("root")!).render(<App />);
