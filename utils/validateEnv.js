// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
const config = require("config");

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
  const dataMode = readConfigValue("DATA_MODE") || "LOCAL_DEMO";
  const port = readConfigValue("PORT");
  const missing = [];

  if (!hasValue(port)) missing.push("PORT");
  if (!hasValue(dataMode)) missing.push("DATA_MODE");

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
