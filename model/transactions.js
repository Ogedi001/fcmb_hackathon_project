const mongoose = require("mongoose")
const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: String, // Transaction type: e.g., Deposit, Withdrawal, Purchase, etc.
  amount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Declined"],
    default: "Pending",
  },
//   referenceId: {
//     type: mongoose.Schema.Types.ObjectId,
//     // Reference to another transaction or document
//   },
  //paymentMethod: {
  //  type: String,
    // Payment method used in the transaction (e.g., credit card, bank transfer)
  //},
//   location: {
//     type: String,
//     // Location where the transaction occurred
//   },
  //comments: {
    //type: String,
    // Additional notes or description for the transaction
  //},
//   currency: {
//     type: String,
    // Currency used for the transaction (if multi-currency support is needed)
 // },
  // ... other fields as per your system requirements
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
