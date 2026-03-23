/**
 * כניסת Vercel Serverless — אם טעינת server נכשלת, מחזירים JSON עם השגיאה (לא קריסה שקטה).
 */
let app;
try {
  app = require("../server");
} catch (err) {
  console.error("[api/index] failed to load server:", err);
  const express = require("express");
  const fallback = express();
  fallback.use((req, res) => {
    res.status(500).json({
      error: "Server bootstrap failed",
      message: err.message,
    });
  });
  app = fallback;
}

module.exports = app;
