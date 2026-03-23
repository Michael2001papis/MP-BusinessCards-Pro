const mongoose = require("mongoose");
const chalk = require("chalk");

// Try to read from env; fallback to local dev
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/business_card_app";

(async () => {
  try {
    console.log(chalk.blue("Connecting to:"), MONGO_URI);
    await mongoose.connect(MONGO_URI);

    const cards = mongoose.connection.collection("cards");

    const indexes = await cards.indexes();
    const hasEmailIndex = indexes.some((idx) => idx.name === "email_1");
    if (hasEmailIndex) {
      await cards.dropIndex("email_1");
      console.log(chalk.green("✅ הוסר אינדקס email_1 מהכרטיסים"));
    } else {
      console.log(chalk.yellow("ℹ️ אינדקס email_1 לא נמצא בכרטיסים (אין מה להסיר)"));
    }
  } catch (err) {
    console.error(chalk.red("שגיאה בהסרת אינדקס:"), err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();


