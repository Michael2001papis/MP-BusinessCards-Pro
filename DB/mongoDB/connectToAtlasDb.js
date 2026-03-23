// חיבור למסד נתונים MongoDB Atlas
const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const userName = config.get("DB_NAME");
const password = config.get("DB_PASSWORD");

// מניעת חיבורים כפולים ב-Serverless (הפעלות חוזרות / cold start)
if ([1, 2].includes(mongoose.connection.readyState)) {
  // כבר מחובר או בתהליך חיבור
} else {
  mongoose
    .connect(
      `mongodb+srv://${userName}:${password}@hackeru-cluster.y5spzbw.mongodb.net/`
    )
    .then(() => console.log(chalk.magentaBright("Connect To Atlas MongoDB!")))
    .catch((error) => {
      console.log(chalk.redBright(error));
    });
}