/**
 * פריסת Vercel סטטית (תיקיית public) — אין API באותו דומיין.
 * הגדר כאן את כתובת שרת ה-API (Node/Express) אם הוא רץ במקום אחר (Railway, Render, VPS).
 * דוגמה: window.__API_BASE__ = "https://your-api.onrender.com";
 */
(function () {
  if (typeof window === "undefined") return;
  if (typeof window.__API_BASE__ === "undefined") {
    window.__API_BASE__ = "";
  }
})();
