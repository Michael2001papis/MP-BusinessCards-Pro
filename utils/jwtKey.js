// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
const config = require("config");

/**
 * מפתח JWT: קודם מ־Vercel/process.env, אחר כך node-config.
 * אם לא הוגדר מפתח, משתמשים במפתח דמו מקומי כדי שהאתר יעבוד ללא ENV חיצוני.
 */
function getJwtKey() {
  const fromEnv = process.env.JWT_KEY || process.env.JWT_SECRET || "";
  if (fromEnv && String(fromEnv).trim()) {
    return String(fromEnv).trim();
  }
  try {
    const k = config.get("JWT_KEY");
    if (k && String(k).trim()) return String(k).trim();
  } catch {
    // נופל למפתח הדמו המקומי.
  }
  return "local-demo-jwt-key-change-before-production";
}

module.exports = { getJwtKey };
