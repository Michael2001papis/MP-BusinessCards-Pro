const path = require("path");
const fs = require("fs");

// טעינת .env לפי NODE_ENV לפני config — קבצי .env לא ב-Git
const envName = process.env.NODE_ENV || "development";
const envPath = path.join(__dirname, `.env.${envName}`);
if (fs.existsSync(envPath)) {
  require("dotenv").config({ path: envPath });
}

// מיקום קבצי config לא תלוי בתיקיית העבודה
process.env.NODE_CONFIG_DIR = path.join(__dirname, "config");

const express = require("express");
const app = express();
const router = require("./router/router");
const cors = require("./middlewares/cors");
const { handleError } = require("./utils/errorHandler");
const logger = require("./logger/loggerService");
const connectToDb = require("./DB/dbService");
const config = require("config");

if (process.env.NODE_ENV === "production" && !config.get("JWT_KEY")) {
  throw new Error("JWT_KEY is required in production (Vercel / env or config)");
}

const {
  generateInitialCards,
  generateInitialUsers,
} = require("./initialData/initialDataService");

// Middleware ברמת האפליקציה
app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.text());
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

// Middleware לטיפול בשגיאות
app.use((err, req, res, next) => {
  handleError(res, err.status || 500, err.message, req);
});

const PORT = config.get("PORT");
const isVercel = Boolean(process.env.VERCEL);

function runBoot() {
  try {
    connectToDb();
    generateInitialCards();
    generateInitialUsers();
  } catch (err) {
    console.error("Boot error:", err);
  }
}

if (isVercel) {
  runBoot();
} else {
  app.listen(PORT, () => {
    console.log(`INIT SERVER ON: http://localhost:${PORT}`);
    runBoot();
  });
}

module.exports = app;
