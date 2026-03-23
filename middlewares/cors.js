const express = require("express");
const app = express();
const cors = require("cors");

/**
 * origin: true — משקף את ה-Origin של הבקשה (כולל *.vercel.app ודומיין מותאם).
 * רשימה קשיחה בלבד גרמה ל-cors לזרוק שגיאה → 500 על בקשות כמו /favicon.ico עם Origin שלא ברשימה.
 */
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
  })
);

module.exports = app;
