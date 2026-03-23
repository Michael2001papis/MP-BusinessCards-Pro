/**
 * כניסת Vercel Serverless — מייצא את אפליקציית Express.
 * אם טעינת server נכשלת, מנסים להחזיר לפחות את index.html הסטטי.
 */
const path = require("path");
const fs = require("fs");
const express = require("express");

let app;
try {
  app = require("../server");
} catch (err) {
  console.error("[api/index] failed to load server:", err);
  const fallback = express();
  const htmlPath = path.join(__dirname, "..", "public", "index.html");
  fallback.use((req, res) => {
    try {
      if (fs.existsSync(htmlPath)) {
        return res
          .status(200)
          .type("html")
          .send(fs.readFileSync(htmlPath, "utf8"));
      }
    } catch (_) {}
    res.status(500).json({
      error: "Server bootstrap failed",
      message: err.message,
    });
  });
  app = fallback;
}

module.exports = app;
