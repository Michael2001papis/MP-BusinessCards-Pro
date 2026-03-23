const jwt = require("jsonwebtoken");
const { getJwtKey } = require("../../utils/jwtKey");

const generateAuthToken = (user) => {
  const key = getJwtKey();
  if (!key) {
    const err = new Error(
      "JWT_KEY is not set. Vercel → Environment Variables → add JWT_KEY (or JWT_SECRET), then Redeploy."
    );
    err.status = 500;
    throw err;
  }
  const { _id, isAdmin, isBusiness } = user;
  return jwt.sign({ _id, isAdmin, isBusiness }, key);
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
