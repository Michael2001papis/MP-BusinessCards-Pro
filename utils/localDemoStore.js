// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
const initialData = require("../initialData/initialData.json");
const { comparePassword } = require("../users/helpers/bcrypt");

const DEMO_MESSAGE = "המערכת עובדת כרגע במצב מקומי עם נתוני דמו.";
const DEMO_USER_IDS = [
  "6376274068d78742d84f31d2",
  "6376274068d78742d84f31d3",
  "6376274068d78742d84f31d4",
  "6376274068d78742d84f31d5",
];

const clone = (value) => JSON.parse(JSON.stringify(value));

const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const sanitizeUser = (user) => {
  const safe = clone(user);
  delete safe.password;
  return safe;
};

const isPasswordMatch = (password, storedPassword) => {
  if (password === storedPassword) return true;
  try {
    return comparePassword(password, storedPassword);
  } catch {
    return false;
  }
};

let nextUserNumber = 1;
let nextCardNumber = 1;

const users = initialData.users.map((user, index) => ({
  ...clone(user),
  _id: DEMO_USER_IDS[index] || `demo-user-${index + 1}`,
  email: String(user.email).toLowerCase(),
  createdAt: new Date().toISOString(),
}));

nextUserNumber = users.length + 1;

const cards = initialData.cards.map((card, index) => ({
  ...clone(card),
  _id: `demo-card-${index + 1}`,
  bizNumber: card.bizNumber || 1_000_001 + index,
  user_id: DEMO_USER_IDS[0],
  likes: [],
  createdAt: new Date().toISOString(),
}));

nextCardNumber = cards.length + 1;

const getDemoStatus = () => ({
  dataMode: "Local Demo Mode",
  message: DEMO_MESSAGE,
  usersCount: users.length,
  cardsCount: cards.length,
});

const findUsers = async () => users.map(sanitizeUser);

const findUser = async (userId) => {
  const user = users.find((item) => String(item._id) === String(userId));
  if (!user) throw createError(404, "משתמש הדמו לא נמצא.");
  return sanitizeUser(user);
};

const createUser = async (normalizedUser) => {
  const email = String(normalizedUser.email).toLowerCase();
  if (users.some((user) => user.email === email)) {
    throw createError(400, "User already registered");
  }

  const user = {
    ...clone(normalizedUser),
    _id: `demo-user-${nextUserNumber++}`,
    email,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return sanitizeUser(user);
};

const login = async ({ email, password }) => {
  const user = users.find((item) => item.email === String(email).toLowerCase());
  if (!user || !isPasswordMatch(password, user.password)) {
    throw createError(400, "פרטי ההתחברות אינם נכונים במצב הדמו המקומי.");
  }

  const safeUser = sanitizeUser(user);
  return {
    name: safeUser.name,
    email: safeUser.email,
    _id: safeUser._id,
    isAdmin: Boolean(safeUser.isAdmin),
    isBusiness: Boolean(safeUser.isBusiness),
    allowedRegions: safeUser.allowedRegions || [],
  };
};

const updateUser = async (userId, normalizedUser) => {
  const index = users.findIndex((item) => String(item._id) === String(userId));
  if (index === -1) throw createError(404, "משתמש הדמו לא נמצא.");

  users[index] = {
    ...users[index],
    ...clone(normalizedUser),
    _id: users[index]._id,
    email: users[index].email,
    isAdmin: users[index].isAdmin,
    isBusiness: users[index].isBusiness,
  };

  return sanitizeUser(users[index]);
};

const removeUser = async (userId) => {
  const index = users.findIndex((item) => String(item._id) === String(userId));
  if (index === -1) throw createError(404, "משתמש הדמו לא נמצא.");
  const [removed] = users.splice(index, 1);
  return sanitizeUser(removed);
};

const findCards = async () => cards.map(clone);

const findMyCards = async (userId) =>
  cards.filter((card) => String(card.user_id) === String(userId)).map(clone);

const findCard = async (cardId) => {
  const card = cards.find((item) => String(item._id) === String(cardId));
  if (!card) throw createError(404, "כרטיס הדמו לא נמצא.");
  return clone(card);
};

const createCard = async (normalizedCard) => {
  const existingSeedCard = cards.find(
    (card) =>
      card.title === normalizedCard.title &&
      card.email === normalizedCard.email &&
      String(card.user_id) === String(normalizedCard.user_id || DEMO_USER_IDS[0])
  );
  if (existingSeedCard) return clone(existingSeedCard);

  const card = {
    ...clone(normalizedCard),
    _id: `demo-card-${nextCardNumber++}`,
    bizNumber: normalizedCard.bizNumber || 1_000_000 + nextCardNumber,
    user_id: normalizedCard.user_id || DEMO_USER_IDS[0],
    likes: normalizedCard.likes || [],
    createdAt: new Date().toISOString(),
  };
  cards.push(card);
  return clone(card);
};

const updateCard = async (cardId, normalizedCard) => {
  const index = cards.findIndex((item) => String(item._id) === String(cardId));
  if (index === -1) throw createError(404, "כרטיס הדמו לא נמצא.");

  cards[index] = {
    ...cards[index],
    ...clone(normalizedCard),
    _id: cards[index]._id,
    bizNumber: cards[index].bizNumber,
    likes: cards[index].likes || [],
    createdAt: cards[index].createdAt,
  };
  return clone(cards[index]);
};

const likeCard = async (cardId, userId) => {
  const card = cards.find((item) => String(item._id) === String(cardId));
  if (!card) throw createError(404, "כרטיס הדמו לא נמצא.");

  const normalizedUserId = String(userId);
  const likes = card.likes || [];
  card.likes = likes.includes(normalizedUserId)
    ? likes.filter((id) => id !== normalizedUserId)
    : [...likes, normalizedUserId];

  return clone(card);
};

const removeCard = async (cardId) => {
  const index = cards.findIndex((item) => String(item._id) === String(cardId));
  if (index === -1) throw createError(404, "כרטיס הדמו לא נמצא.");
  const [removed] = cards.splice(index, 1);
  return clone(removed);
};

module.exports = {
  DEMO_MESSAGE,
  getDemoStatus,
  findUsers,
  findUser,
  createUser,
  login,
  updateUser,
  removeUser,
  findCards,
  findMyCards,
  findCard,
  createCard,
  updateCard,
  likeCard,
  removeCard,
};
