import { createRoot, hydrateRoot } from "react-dom/client";
import App, { loadInitialPage } from "./App";
import "./index.css";

const root = document.getElementById("root")!;

const CHUNK_RECOVERY_KEY = "redwan:chunk-recovery";
const CHUNK_RECOVERY_TTL_MS = 60_000;
const CHUNK_RECOVERY_CLEAR_MS = 10_000;

type ChunkRecoveryRecord = {
  page: string;
  attemptedAt: number;
};

function currentPageKey() {
  return `${window.location.pathname}${window.location.search}`;
}

function readChunkRecoveryRecord(): ChunkRecoveryRecord | null {
  try {
    const value = window.sessionStorage.getItem(CHUNK_RECOVERY_KEY);
    if (!value) return null;

    const record = JSON.parse(value) as Partial<ChunkRecoveryRecord>;
    if (
      typeof record.page !== "string" ||
      typeof record.attemptedAt !== "number"
    ) {
      window.sessionStorage.removeItem(CHUNK_RECOVERY_KEY);
      return null;
    }

    return record as ChunkRecoveryRecord;
  } catch {
    // If sessionStorage is unavailable, keep the original error path instead
    // of risking an unbounded reload loop.
    return null;
  }
}

function installChunkLoadRecovery() {
  window.addEventListener("vite:preloadError", event => {
    const now = Date.now();
    const page = currentPageKey();
    const previousAttempt = readChunkRecoveryRecord();
    const alreadyRetried =
      previousAttempt?.page === page &&
      now - previousAttempt.attemptedAt < CHUNK_RECOVERY_TTL_MS;

    if (alreadyRetried) return;

    try {
      window.sessionStorage.setItem(
        CHUNK_RECOVERY_KEY,
        JSON.stringify({ page, attemptedAt: now } satisfies ChunkRecoveryRecord)
      );
    } catch {
      return;
    }

    // Vite recommends refreshing when a stale page requests a chunk removed
    // by a newer deployment. Prevent the rejected import from replacing the
    // already-rendered SSR page while the fresh HTML is loaded.
    event.preventDefault();
    window.location.reload();
  });

  // A page that stays healthy long enough may retry again after a later
  // deployment. Failed reloads retain the marker and fall back to the normal
  // error boundary instead of looping indefinitely.
  window.setTimeout(() => {
    const record = readChunkRecoveryRecord();
    if (record?.page === currentPageKey()) {
      window.sessionStorage.removeItem(CHUNK_RECOVERY_KEY);
    }
  }, CHUNK_RECOVERY_CLEAR_MS);
}

installChunkLoadRecovery();

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
