const router = require("express").Router();
const { checkUser, userAuth } = require("./../middleware/userAuthMiddleware");
const { addTobeneficiary} = require("../controller/beneficiiaresController/addToBeneficiaryController");

// All profile routes here

router.post("/addBeneficiary", userAuth, checkUser, addTobeneficiary);

module.exports = router;
