// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
const validateCardWithJoi = require("./Joi/validateCardWithJoi");

const validator = undefined || "Joi";

const validateCard = (card) => {
  if (validator === "Joi") {
    return validateCardWithJoi(card);
  }
};

module.exports = validateCard;
