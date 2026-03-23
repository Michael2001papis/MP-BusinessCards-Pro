const data = require("./initialData.json");
const normalizeUser = require("../users/helpers/normalizeUser");
const normalizeCard = require("../cards/helpers/normalizeCard");
const { createUser } = require("../users/models/usersAccessDataService");
const { create } = require("../cards/models/cardsDataAccessService");
const { generateUserPassword } = require("../users/helpers/bcrypt");
const chalk = require("chalk");

const generateInitialCards = async () => {
  const { cards } = data;
  for (let card of cards) {
    try {
      const userId = "6376274068d78742d84f31d2";
      card = await normalizeCard(card, userId);
      await create(card);
    } catch (error) {
      // דילוג על כרטיס שכבר קיים
    }
  }
};

const generateInitialUsers = async () => {
  const { users } = data;
  for (let user of users) {
    try {
      user = await normalizeUser(user);
      user.password = generateUserPassword(user.password);
      await createUser(user);
    } catch (error) {
      if (error && error.message === "User already registered") {
        // משתמש כבר רשום, דילוג
        continue;
      }
      // רישום שגיאה בשקט
    }
  }
};

module.exports = { generateInitialCards, generateInitialUsers };
