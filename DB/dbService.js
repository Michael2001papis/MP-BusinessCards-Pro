// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
// DB/dbService.js
const config = require("config");
const mongoose = require("mongoose");
const ENV = config.get("NODE_ENV");

const connectToDb = () => {
  if (ENV === "development") {
    require("./mongoDB/connectLocally");
  }
  if (ENV === "production") {
    require("./mongoDB/connectToAtlasDb");
  }
};

const READY_STATE_LABELS = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
  99: "uninitialized",
};

const getDatabaseHealth = () => {
  const readyState = mongoose.connection.readyState;
  return {
    readyState,
    status: READY_STATE_LABELS[readyState] || "unknown",
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null,
  };
};

const isDatabaseConnected = () => mongoose.connection.readyState === 1;

module.exports = connectToDb;
module.exports.getDatabaseHealth = getDatabaseHealth;
module.exports.isDatabaseConnected = isDatabaseConnected;