/** @module Server */

import { createServer } from "http";
import { parse } from "url";
import next from "next";

const port = parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Initialize

// Server
app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url!, true);
      handle(req, res, parsedUrl).catch(console.error);
    }).listen(port);

    console.info(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
  })
  .catch(console.error);

// Clean
const handleExit = (code: number): void => {
  console.info("> Server stopped");
};

process.on("exit", (code) => handleExit(code));
