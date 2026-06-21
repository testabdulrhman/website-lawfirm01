import express from "express";
import { createServer } from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath, { redirect: false }));

  // Handle client-side routing.
  // First, try to serve a prerendered "{route}/index.html" so that crawlers
  // (WhatsApp, Google, X) receive page-specific SEO/OG tags. Fall back to the
  // generic SPA index.html when no prerendered file matches.
  app.get("*", (req, res) => {
    // Decode and normalize the requested path, stripping query/hash.
    let routePath: string;
    try {
      routePath = decodeURIComponent(req.path);
    } catch {
      routePath = req.path;
    }

    // Build candidate prerendered file path: dist/public/<route>/index.html
    const cleanRoute = routePath.replace(/^\/+|\/+$/g, "");
    if (cleanRoute) {
      const candidate = path.join(staticPath, cleanRoute, "index.html");
      const resolved = path.resolve(candidate);
      // Security: ensure the resolved path stays within staticPath.
      if (
        resolved.startsWith(path.resolve(staticPath) + path.sep) &&
        fs.existsSync(resolved)
      ) {
        return res.sendFile(resolved);
      }
    }

    // Fallback: generic SPA shell.
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
