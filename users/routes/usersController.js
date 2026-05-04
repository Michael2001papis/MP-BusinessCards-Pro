// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
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
const { auth, requireAdmin } = require("../../auth/authService");

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
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

router.put("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
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

router.delete("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message, req);
  }
});

module.exports = router;
