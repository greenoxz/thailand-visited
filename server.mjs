import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(".");
const port = Number(process.env.PORT || 4173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

createServer((request, response) => {
  try {
    const host = request.headers.host || `localhost:${port}`;
    const url = new URL(request.url || "/", `http://${host}`);
    const pathname = decodeURIComponent(url.pathname);
    // Clean URL Redirects
    if (pathname === "/index" || pathname === "/index.html") {
      response.writeHead(301, { "Location": "/" });
      response.end();
      return;
    }
    if (pathname === "/map" || pathname === "/map.html" || pathname === "/maps.html") {
      response.writeHead(301, { "Location": "/maps" });
      response.end();
      return;
    }
    if (pathname === "/bill-split.html") {
      response.writeHead(301, { "Location": "/bill-split" });
      response.end();
      return;
    }
    if (pathname === "/sitemap.html") {
      response.writeHead(301, { "Location": "/sitemap" });
      response.end();
      return;
    }
    if (pathname === "/privacy.html") {
      response.writeHead(301, { "Location": "/privacy" });
      response.end();
      return;
    }

    let requestedPath = pathname === "/" ? "/index.html" : pathname;
    
    if (requestedPath === "/maps" || requestedPath === "/maps/") {
      requestedPath = "/map.html";
    } else if (requestedPath === "/bill-split" || requestedPath === "/bill-split/") {
      requestedPath = "/bill-split.html";
    } else if (requestedPath === "/sitemap" || requestedPath === "/sitemap/") {
      requestedPath = "/sitemap.html";
    } else if (requestedPath === "/privacy" || requestedPath === "/privacy/") {
      requestedPath = "/privacy.html";
    }

    const filePath = normalize(join(root, requestedPath));

    if (!filePath.startsWith(root) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "content-type": types[extname(filePath)] || "application/octet-stream"
    });
    const stream = createReadStream(filePath);
    stream.on("error", (err) => {
      console.error("Stream error:", err);
      if (!response.headersSent) {
        response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      }
      response.end("Internal server error");
    });
    stream.pipe(response);
  } catch (err) {
    console.error("Request handling error:", err);
    if (!response.headersSent) {
      response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    }
    response.end("Internal server error");
  }
}).on("error", (err) => {
  console.error("Server error:", err);
}).listen(port, () => {
  console.log(`Thailand visited map running at http://localhost:${port}`);
});

