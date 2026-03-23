const path = require("path");
// מיקום קבצי config לא תלוי בתיקיית העבודה (חשוב אחרי העברת הפרויקט משורש אחר / IDE)
process.env.NODE_CONFIG_DIR = path.join(__dirname, "config");

const express = require("express");
const app = express();
const router = require("./router/router");
const cors = require("./middlewares/cors");
const { handleError } = require("./utils/errorHandler");
const logger = require("./logger/loggerService");
const connectToDb = require("./DB/dbService");
const config = require("config");
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
app.listen(PORT, () => {
  console.log(`INIT SERVER ON: http://localhost:${PORT}`);
  connectToDb();
  generateInitialCards();
  generateInitialUsers();
});
