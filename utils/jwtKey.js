const config = require("config");

/**
 * מפתח JWT: קודם מ־Vercel/process.env (JWT_KEY או JWT_SECRET), אחר כך node-config.
 */
function getJwtKey() {
  const fromEnv = process.env.JWT_KEY || process.env.JWT_SECRET || "";
  if (fromEnv && String(fromEnv).trim()) {
    return String(fromEnv).trim();
  }
  try {
    const k = config.get("JWT_KEY");
    return k && String(k).trim() ? String(k).trim() : "";
  } catch {
    return "";
  }
}

module.exports = { getJwtKey };
