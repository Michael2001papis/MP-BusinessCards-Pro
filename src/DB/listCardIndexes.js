const mongoose = require("mongoose");

(async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/business_card_app";
    await mongoose.connect(uri);
    const indexes = await mongoose.connection.collection("cards").indexes();
    console.log(indexes);
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();


