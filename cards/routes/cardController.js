// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
const express = require("express");
const { handleError } = require("../../utils/errorHandler");
const { auth, requireAdmin, requireBusiness } = require("../../auth/authService");
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

router.get("/my-cards", auth, async (req, res) => {
  try {
    const userId = req.user?.isGuest ? req.query.userId : req.user._id;
    const cards = userId ? await getMyCards(userId) : [];
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
router.post("/", auth, requireBusiness, async (req, res) => {
  try {
    const card = await createCard(req.body);
    return res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.put("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const card = await updateCard(id, req.body);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.patch("/:id", auth, requireBusiness, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const card = await likeCard(id, userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.delete("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const card = await deleteCard(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

module.exports = router;
