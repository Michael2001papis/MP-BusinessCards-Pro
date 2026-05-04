// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים
const express = require("express");
const { handleError } = require("../../utils/errorHandler");
const {
  getCards,
  getCard,
  createCard,
  getMyCards,
  updateCard,
  likeCard,
  deleteCard,
} = require("../services/cardService");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.get("/my-cards", async (req, res) => {
  try {
    const userId = req.query.userId;
    const cards = userId ? await getMyCards(userId) : await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const card = await getCard(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

/* יצירת כרטיס */
router.post("/", async (req, res) => {
  try {
    const card = await createCard(req.body);
    return res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await updateCard(id, req.body);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId || req.query.userId || "guest";
    const card = await likeCard(id, userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await deleteCard(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

module.exports = router;
