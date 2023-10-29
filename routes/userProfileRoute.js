const router = require("express").Router();
const { Module } = require("module");
const { checkUser, userAuth } = require("./../middleware/userAuthMiddleware");
const getUserProfile = require('../controller/userProfileController/userProfile.controller');

// All profile routes here

router.get("/profile",userAuth, checkUser,getUserProfile);

module.exports = router;