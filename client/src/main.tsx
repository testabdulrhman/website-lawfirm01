import { createRoot, hydrateRoot } from "react-dom/client";
import App, { loadInitialPage } from "./App";
import "./index.css";

const root = document.getElementById("root")!;

// Prerendered routes already contain complete HTML. Hydrating that markup keeps
// the page stable while route chunks load; replacing it with createRoot caused
// the footer to jump up to the Suspense fallback and then back down (CLS).
async function start() {
  if (root.hasChildNodes()) {
    const initialPage = await loadInitialPage(window.location.pathname);
    hydrateRoot(root, <App initialPage={initialPage} />);
  } else {
    createRoot(root).render(<App />);
  }
}

void start();
