// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
const mongoose = require("mongoose");
const { getScriptMongoUri } = require("../utils/mongoConnectionStrings");

(async () => {
  try {
    const uri = getScriptMongoUri();
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


