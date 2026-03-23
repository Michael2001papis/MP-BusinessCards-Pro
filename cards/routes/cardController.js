const express = require("express");
const { handleError } = require("../../utils/errorHandler");
const { auth, requireAdmin, requireBusiness, limitRegion } = require("../../auth/authService");
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

// דוגמה להגבלת אזור: כאן נדרוש התחברות ונגביל לאזור 'ישראל' (אדמין עוקף)
router.get("/", auth, limitRegion("ישראל"), async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

// כרטיסי משתמש מחייבים התחברות
router.get("/my-cards", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const card = await getMyCards(userId);
    return res.send(card);
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
// יצירת כרטיס: משתמש עסקי או אדמין בלבד
router.post("/", auth, requireBusiness, async (req, res) => {
  try {
    const card = await createCard(req.body);
    return res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

// עריכת כרטיס: כאן ניתן להרחיב לבדיקה ש"יוצר הכרטיס" או אדמין בלבד
// עריכת כרטיס: אדמין בלבד
router.put("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const card = await updateCard(id, req.body);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

// לייק לכרטיס: משתמש רשום
// לייק לכרטיס: משתמש עסקי (או אדמין)
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

// מחיקת כרטיס: יוצר הכרטיס או אדמין (האכיפה נעשית בשכבת הדאטה כבר)
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const card = await deleteCard(id, user);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

module.exports = router;
