const router = require("express").Router();
const { checkUser, userAuth } = require("./../middleware/userAuthMiddleware");
const {addFundsToAccount,} = require("../controller/fundsAcctController");

// All profile routes here

router.post("/fundAcct", userAuth, checkUser, addFundsToAccount);

module.exports = router;
