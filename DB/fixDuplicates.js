const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");
const {
  getAtlasConnectionUri,
  getScriptMongoUri,
} = require("../utils/mongoConnectionStrings");

const ENV = config.get("NODE_ENV");
let MONGO_URI = "";

if (ENV === "development") {
  MONGO_URI = getScriptMongoUri();
} else {
  MONGO_URI = getAtlasConnectionUri() || "";
}

(async () => {
  try {
    if (!MONGO_URI) {
      console.error(
        chalk.red(
          "חסר חיבור Atlas: הגדר MONGODB_URI או DB_NAME+DB_PASSWORD+MONGODB_CLUSTER_HOST"
        )
      );
      process.exit(1);
    }
    console.log(
      chalk.blue("Connecting to:"),
      MONGO_URI.replace(/:[^:@]+@/, ":****@")
    );
    await mongoose.connect(MONGO_URI);

    const cards = mongoose.connection.collection("cards");

    // מחפש אימיילים כפולים
    const dups = await cards
      .aggregate([
        { $match: { email: { $ne: null } } },
        {
          $group: {
            _id: "$email",
            ids: { $push: "$_id" },
            count: { $sum: 1 },
          },
        },
        { $match: { count: { $gt: 1 } } },
      ])
      .toArray();

    if (!dups.length) {
      console.log(chalk.green("✅ אין כפילויות באוסף cards"));
    } else {
      for (const g of dups) {
        const toDelete = g.ids.slice(1); // משאיר אחת, מוחק את השאר
        if (toDelete.length) {
          const res = await cards.deleteMany({ _id: { $in: toDelete } });
          console.log(
            chalk.yellow(
              `נמחקו ${res.deletedCount} כפילויות עבור האימייל: ${g._id}`
            )
          );
        }
      }
    }

    // אינדקס ייחודי על email
    try {
      await cards.dropIndex("email_1");
    } catch (e) {
      /* יזרוק שגיאה אם אין אינדקס כזה, זה בסדר */
    }
    await cards.createIndex({ email: 1 }, { unique: true, sparse: true });
    console.log(chalk.green("✅ אינדקס ייחודי על email נוצר בהצלחה"));

    console.log(chalk.magenta("סיום ✅"));
  } catch (err) {
    console.error(chalk.red("שגיאה:"), err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
