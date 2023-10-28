const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,'username of beneficiary is required'],
  },
  email: {
    type: String,
    required: [true,'email is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'phone number is required'],
  },
  relationship: {
    type: String,
  },
  // You can add other fields as needed
  // ...
});

const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);
module.exports = Beneficiary;
