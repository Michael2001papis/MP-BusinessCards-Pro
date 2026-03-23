/**
 * חיבור MongoDB — שם רשמי אחד למחרוזת מלאה: MONGODB_URI (מומלץ, כולל Vercel).
 * MONGO_URI נשמר רק לתאימות לאחור (אל תשתמש בפרויקטים חדשים).
 */
function getAtlasConnectionUri() {
  const envUri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI;
  if (envUri && String(envUri).trim().startsWith("mongodb+srv://")) {
    return String(envUri).trim();
  }

  const config = require("config");
  const userName = config.get("DB_NAME");
  const password = config.get("DB_PASSWORD");
  const host = config.get("MONGODB_CLUSTER_HOST");

  if (!userName || !password || !host) {
    return null;
  }

  const h = String(host).trim().replace(/\/+$/, "");
  return `mongodb+srv://${encodeURIComponent(String(userName))}:${encodeURIComponent(String(password))}@${h}/`;
}

/**
 * סקריפטים ב-DB/ — חיבור לוקאלי או URI מלא.
 * עדיפות: MONGODB_URI, אחר כך MONGO_URI (legacy), אחר כך ברירת מחדל לוקאלית.
 */
function getScriptMongoUri() {
  return (
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    "mongodb://localhost:27017/business_card_app"
  );
}

module.exports = {
  getAtlasConnectionUri,
  getScriptMongoUri,
};
