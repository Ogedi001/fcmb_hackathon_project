//authRoute
const router = require("express").Router();
const logOut = require('./../controller/authController/logoutUserAuthController');
const login = require('./../controller/authController/loginUserAuthController')
 const createUser = require('./../controller/authController/createUserAuthController')

// All authentication routes here
router.post('/signup',createUser)
router.post("/login",login);
router.post("/logout",logOut);
module.exports = router;
