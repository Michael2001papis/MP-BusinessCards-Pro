// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
const jwt = require("jsonwebtoken");
const { getJwtKey } = require("../../utils/jwtKey");

const generateAuthToken = (user) => {
  const key = getJwtKey();
  if (!key) {
    const err = new Error(
      "JWT key is not available. Local Demo Mode should provide an internal fallback key."
    );
    err.status = 500;
    throw err;
  }
  const { _id, isAdmin, isBusiness, allowedRegions } = user;
  return jwt.sign(
    { _id, isAdmin, isBusiness, allowedRegions: allowedRegions || [] },
    key
  );
};

const verifyToken = (token) => {
  try {
    const key = getJwtKey();
    if (!key) return null;
    return jwt.verify(token, key);
  } catch (error) {
    return null;
  }
};

exports.generateAuthToken = generateAuthToken;
exports.verifyToken = verifyToken;
