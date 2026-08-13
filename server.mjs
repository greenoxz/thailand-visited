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
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);
  let requestedPath = pathname === "/" ? "/index.html" : pathname;
  
  if (requestedPath === "/maps" || requestedPath === "/maps/" || requestedPath === "/map" || requestedPath === "/map/") {
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
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`Thailand visited map running at http://localhost:${port}`);
});
