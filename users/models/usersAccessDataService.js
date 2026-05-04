// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
const config = require("config");
const DB = config.get("DB");
const User = require("./mongodb/User");
const lodash = require("lodash");
const { handleBadRequest } = require("../../utils/errorHandler");
const { comparePassword } = require("../helpers/bcrypt");
const { isDatabaseConnected } = require("../../DB/dbService");

const dbUnavailable = () => {
  const error = new Error("Database is currently unavailable");
  error.status = 503;
  return error;
};

const createUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    if (!isDatabaseConnected()) return Promise.reject(dbUnavailable());
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({ email });
      if (user) throw new Error("User already registered");

      user = new User(normalizedUser);
      user = await user.save();

      user = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("registerUser new user not in mongodb");
};

const login = async ({ email, password }) => {
  if (DB === "MONGODB") {
    if (!isDatabaseConnected()) return Promise.reject(dbUnavailable());
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Authentication Error: Invalid email");

      const validPassword = comparePassword(password, user.password);
      if (!validPassword)
        throw new Error("Authentication Error: Invalid Password");

      return Promise.resolve(
        lodash.pick(user, ["name", "email", "_id", "isAdmin", "isBusiness"])
      );
    } catch (error) {
      if (error.status == null) error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("loginUser user not in mongodb");
};

const findUsers = async () => {
  if (DB === "MONGODB") {
    if (!isDatabaseConnected()) return Promise.resolve([]);
    try {
      const users = await User.find({}, { password: 0, __v: 0 });
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};

const findUser = async (userId) => {
  if (DB === "MONGODB") {
    if (!isDatabaseConnected()) return Promise.resolve(null);
    try {
      let user = await User.findById(userId, {
        password: 0,
        __v: 0,
      });
      if (!user) throw new Error("Could not find this user in the database");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const update = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    if (!isDatabaseConnected()) return Promise.reject(dbUnavailable());
    try {
      let user = await User.findByIdAndUpdate(userId, normalizedUser, {
        new: true,
      });
      
      if (!user) throw new Error("Could not find this user in the database");
      
      user = lodash.pick(user, ["name", "email", "_id", "isAdmin", "isBusiness", "phone", "address", "image"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user update not in mongodb");
};


const removeUser = async (userId) => {
  if (DB === "MONGODB") {
    if (!isDatabaseConnected()) return Promise.reject(dbUnavailable());
    try {
      let user = await User.findById(userId);
      
      if (!user) throw new Error("Could not find this user in the database");
      
      user = await User.findByIdAndDelete(userId);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user deleted not in mongodb");
};

exports.createUser = createUser;
exports.login = login;
exports.findUsers = findUsers;
exports.findUser = findUser;
exports.update = update;
exports.removeUser = removeUser;
