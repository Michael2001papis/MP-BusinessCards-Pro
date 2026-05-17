// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
const Card = require("../models/mongodb/Card");
const lodash = require("lodash");
const { handleBadRequest } = require("../../utils/errorHandler");
const { isDatabaseConnected } = require("../../DB/dbService");

const generateBizNumber = async () => {
  const random = lodash.random(1_000_000, 9_999_999);
  if (!isDatabaseConnected()) return random;

  try {
    const card = await Card.findOne(
      { bizNumber: random },
      { bizNumber: 1, _id: 0 }
    );
    if (card) return generateBizNumber();
    return random;
  } catch (error) {
    return handleBadRequest("GenerateBizNumber", error);
  }
};

module.exports = generateBizNumber;
