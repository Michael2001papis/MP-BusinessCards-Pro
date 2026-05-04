// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
const { verifyToken } = require("./Providers/jwt");
const { handleError } = require("../utils/errorHandler");
const config = require("config");

const tokenGenerator = config.get("TOKEN_GENERATOR") || "jwt";

const guestUser = {
  _id: "guest",
  isGuest: true,
  isAdmin: false,
  isBusiness: false,
  allowedRegions: [],
};

/**
 * Middleware אימות בסיסי (JWT)
 * מצפה לכותרת x-auth-token עם טוקן חוקי.
 * שומר את נתוני המשתמש ב-req.user להמשך שרשרת המידלוורים/בקרים.
 */
const auth = (req, res, next) => {
  if (tokenGenerator === "jwt") {
    const tokenFromClient =
      req.header("x-auth-token") ||
      req.header("authorization")?.replace(/^Bearer\s+/i, "");

    if (!tokenFromClient) {
      req.user = guestUser;
      return next();
    }

    try {
      const userData = verifyToken(tokenFromClient);
      if (!userData) {
        req.user = guestUser;
        return next();
      }

      req.user = userData;
      return next();
    } catch (error) {
      req.user = guestUser;
      return next();
    }
  }
  req.user = guestUser;
  return next();
};

exports.auth = auth;
exports.guestUser = guestUser;
/**
 * Middleware בדיקת הרשאת אדמין בלבד
 */
exports.requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return handleError(res, 403, "Demo mode: admin action is disabled", req);
  next();
};

/**
 * Middleware בדיקת הרשאת משתמש עסקי בלבד
 */
exports.requireBusiness = (req, res, next) => {
  if (!req.user?.isBusiness && !req.user?.isAdmin)
    return handleError(res, 403, "Demo mode: business action is disabled", req);
  next();
};

/**
 * Middleware הגבלת אזור לפי allowedRegions של המשתמש
 * שימוש: router.get('/api/cards', auth, limitRegion('ישראל'), handler)
 */
exports.limitRegion = (region) => (req, res, next) => {
  const regions = req.user?.allowedRegions || [];
  if (regions.length && !regions.includes(region) && !req.user?.isAdmin) {
    return handleError(res, 403, `Authorization Error: region '${region}' is not permitted`, req);
  }
  next();
};
