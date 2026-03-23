/**
 * Atlas (production): MONGODB_URI מלא, או DB_NAME + DB_PASSWORD + MONGODB_CLUSTER_HOST.
 * לא שומרים סיסמאות בקוד או ב-config שב-Git.
 */
function getAtlasConnectionUri() {
  const envUri = process.env.MONGODB_URI || process.env.MONGO_URI;
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

/** סקריפטים: עדיפות MONGO_URI, MONGODB_URI, אחר כך לוקאלי — בלי טעינת config */
function getScriptMongoUri() {
  return (
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/business_card_app"
  );
}

module.exports = {
  getAtlasConnectionUri,
  getScriptMongoUri,
};
