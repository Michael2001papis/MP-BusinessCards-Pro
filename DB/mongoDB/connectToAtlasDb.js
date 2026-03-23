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
    chalk.redBright(
      "Atlas: הגדר MONGODB_URI (מחרוזת מלאה) או DB_NAME + DB_PASSWORD + MONGODB_CLUSTER_HOST במשתני סביבה."
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
