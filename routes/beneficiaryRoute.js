const router = require("express").Router();
const { Module } = require("module");
const { checkUser, userAuth } = require("./../middleware/userAuthMiddleware");
const {
  getAllBeneficiaries,
  searchBeneficiaries,
  getBeneficiary,
} = require("../controller/beneficiiaresController/beneficiary");

// All profile routes here

router.get("/beneficiaries", userAuth, checkUser, getAllBeneficiaries);

router.post("/beneficiaries", userAuth, checkUser, searchBeneficiaries);

module.exports = router;
