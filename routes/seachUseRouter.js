const router = require("express").Router();
const { Module } = require("module");
const { checkUser, userAuth } = require("../middleware/userAuthMiddleware");
const {
  getAllUsers,
  searchUsers,
  getBeneficiary,
} = require("../controller/beneficiiaresController/searchUserController");

// All profile routes here

router.get("/searchUsers", userAuth, checkUser, getAllUsers);

router.post("/searchUsers", userAuth, checkUser, searchUsers);

module.exports = router;
