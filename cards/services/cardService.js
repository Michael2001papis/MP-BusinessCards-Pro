const {
  find,
  findOne,
  create,
  update,
  like,
  remove,
  findMyCards,
} = require("../models/cardsDataAccessService");
const validateCard = require("../validations/cardValidationService");
const normalizaCard = require("../helpers/normalizeCard");

const getCards = async () => {
  try {
    const cards = await find();
    return Promise.resolve(cards);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getMyCards = async (userId) => {
  try {
    const card = await findMyCards(userId);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getCard = async (cardId) => {
  try {
    const card = await findOne(cardId);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createCard = async (rawCard) => {
  try {
    const { error } = validateCard(rawCard);
    if (error) {
      return Promise.reject(error);
    }

    let card = await normalizaCard(rawCard);
    card = await create(card);
    
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateCard = async (cardId, rawCard) => {
  try {
    let card = { ...rawCard };
    card = await update(cardId, card);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const likeCard = async (cardId, userId) => {
  try {
    const card = await like(cardId, userId);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteCard = async (cardId, user) => {
  try {
    const card = await remove(cardId, user);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  getCards,
  getMyCards,
  getCard,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
};
