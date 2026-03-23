const { verifyToken } = require("./Providers/jwt");
const { handleError } = require("../utils/errorHandler");
const config = require("config");

const tokenGenerator = config.get("TOKEN_GENERATOR") || "jwt";

/**
 * Middleware אימות בסיסי (JWT)
 * מצפה לכותרת x-auth-token עם טוקן חוקי.
 * שומר את נתוני המשתמש ב-req.user להמשך שרשרת המידלוורים/בקרים.
 */
const auth = (req, res, next) => {
  if (tokenGenerator === "jwt") {
    try {
      const tokenFromClient = req.header("x-auth-token") || req.header("authorization")?.replace(/^Bearer\s+/i, "");
      if (!tokenFromClient) {
        throw new Error("Authantication Error: Please Login/Authunticate");
      }

      const userData = verifyToken(tokenFromClient);
      if (!userData) {
        throw new Error("Authantication Error: Unauthrize User");
      }

      req.user = userData;
      return next();
    } catch (error) {
      handleError(res, 401, error.message, req);
    }
  }
  return handleError(res, 500, "Use jwt!", req);
};

exports.auth = auth;
/**
 * Middleware בדיקת הרשאת אדמין בלבד
 */
exports.requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return handleError(res, 403, "Authorization Error: Admins only", req);
  next();
};

/**
 * Middleware בדיקת הרשאת משתמש עסקי בלבד
 */
exports.requireBusiness = (req, res, next) => {
  if (!req.user?.isBusiness && !req.user?.isAdmin)
    return handleError(res, 403, "Authorization Error: Business or Admin required", req);
  next();
};

/**
 * Middleware הגבלת אזור לפי allowedRegions של המשתמש
 * שימוש: router.get('/cards', auth, limitRegion('ישראל'), handler)
 */
exports.limitRegion = (region) => (req, res, next) => {
  const regions = req.user?.allowedRegions || [];
  if (regions.length && !regions.includes(region) && !req.user?.isAdmin) {
    return handleError(res, 403, `Authorization Error: region '${region}' is not permitted`, req);
  }
  next();
};
