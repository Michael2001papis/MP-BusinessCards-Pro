const path = require("path");
const fs = require("fs");

// טעינת .env לפי NODE_ENV לפני config — קבצי .env לא ב-Git
const envName = process.env.NODE_ENV || "development";
const envPath = path.join(__dirname, `.env.${envName}`);
if (fs.existsSync(envPath)) {
  require("dotenv").config({ path: envPath });
}

// מיקום קבצי config — ב-Vercel לפעמים cwd שונה מ-__dirname
const configDirCandidates = [
  path.join(__dirname, "config"),
  path.join(process.cwd(), "config"),
];
for (const dir of configDirCandidates) {
  if (fs.existsSync(dir)) {
    process.env.NODE_CONFIG_DIR = dir;
    break;
  }
}
if (!process.env.NODE_CONFIG_DIR) {
  process.env.NODE_CONFIG_DIR = path.join(__dirname, "config");
}

// Vercel: עוזר ל־bundler לכלול את index.html בשורש (בנוסף ל-includeFiles ב-vercel.json)
if (process.env.VERCEL) {
  try {
    const indexHtml = path.join(__dirname, "index.html");
    if (fs.existsSync(indexHtml)) {
      fs.readFileSync(indexHtml, "utf8");
    }
  } catch (e) {
    console.error("Vercel: index.html not readable", e.message);
  }
}

const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/router");
const morganLogger = require("./logger/loggers/morganLogger");
const { handleError } = require("./utils/errorHandler");
const connectToDb = require("./DB/dbService");
const config = require("config");

const {
  generateInitialCards,
  generateInitialUsers,
} = require("./initialData/initialDataService");

// Middleware — cors/morgan ישירות על app
app.use(cors({ origin: true, optionsSuccessStatus: 200 }));
app.use(morganLogger);
app.get("/favicon.ico", (req, res) => {
  res.redirect(302, "/favicon.svg");
});
app.use(express.json());
app.use(express.text());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
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
  } catch (err) {
    console.error("Boot error (DB):", err);
  }
  // async — חייב catch; אחרת unhandledRejection עלול לקרוס Serverless
  Promise.all([
    generateInitialCards().catch((e) => console.error("initial cards:", e)),
    generateInitialUsers().catch((e) => console.error("initial users:", e)),
  ]).catch((e) => console.error("boot seed:", e));
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
