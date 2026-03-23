const chalk = require("chalk");
const express = require("express");
const router = express.Router();
const { handleError } = require("../../utils/errorHandler");
const {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../services/usersService");
const { auth } = require("../../auth/authService");

router.get("/", auth, async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      handleError(res, 403, "Authorization Error: Must be admin!", req);
    }
    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { _id, isAdmin } = req.user;
    if (_id !== id && !isAdmin) {
      handleError(
        res,
        403,
        "Authorization Error: Must be admin or THE registered user!",
        req
      );
    }

    const user = await getUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body);
    return res.status(200).send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

// שינוי פרופיל/סיסמה: רק המשתמש עצמו (או אדמין) יכול לעדכן
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, isAdmin } = req.user;
    if (_id !== id && !isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: Must be admin or the same user",
        req
      );
    }
    const user = await updateUser(id, req.body);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Patch from Users with id: ${id}`);
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

module.exports = router;
