// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים
const config = require("config");
const { getAtlasConnectionUri } = require("./mongoConnectionStrings");
const { getJwtKey } = require("./jwtKey");

function readConfigValue(key) {
  try {
    return config.has(key) ? config.get(key) : undefined;
  } catch {
    return undefined;
  }
}

function hasValue(value) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}

function validateRuntimeEnv() {
  const env = process.env.NODE_ENV || readConfigValue("NODE_ENV") || "development";
  const dbMode = readConfigValue("DB");
  const port = readConfigValue("PORT");
  const missing = [];

  if (!hasValue(env)) missing.push("NODE_ENV");
  if (!hasValue(port)) missing.push("PORT");
  if (!hasValue(dbMode)) missing.push("DB");
  if (!hasValue(getJwtKey())) missing.push("JWT_KEY or JWT_SECRET");

  if (env === "production" && !getAtlasConnectionUri()) {
    missing.push("MONGODB_URI or DB_NAME + DB_PASSWORD + MONGODB_CLUSTER_HOST");
  }

  if (missing.length) {
    const message = `Missing required environment/config values: ${missing.join(", ")}`;
    const error = new Error(message);
    error.status = 500;
    throw error;
  }
}

module.exports = {
  validateRuntimeEnv,
};
