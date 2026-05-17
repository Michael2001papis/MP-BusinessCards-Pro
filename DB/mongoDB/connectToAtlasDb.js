// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
// חיבור למסד נתונים MongoDB Atlas
const mongoose = require("mongoose");
const chalk = require("chalk");
const { getAtlasConnectionUri } = require("../../utils/mongoConnectionStrings");

const uri = getAtlasConnectionUri();

// מניעת חיבורים כפולים ב-Serverless (הפעלות חוזרות / cold start)
if ([1, 2].includes(mongoose.connection.readyState)) {
  // כבר מחובר או בתהליך חיבור
} else if (!uri) {
  console.log(
    chalk.yellowBright(
      "Local Demo Mode: לא הוגדר חיבור MongoDB Atlas, לכן המערכת עובדת עם נתוני דמו מקומיים."
    )
  );
} else {
  mongoose
    .connect(uri)
    .then(() => console.log(chalk.magentaBright("Connect To Atlas MongoDB!")))
    .catch((error) => {
      console.log(chalk.redBright(error));
    });
}
