

const userLoanRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
    required: [true, "loan amount is required"],
  },
  interestRate: {
    type: Number,
    required: [true, "interest rate is required"],
  },
  duration: {
    type: Number,
    required: [true, "specify loan time duration"],
  },
  status: {
    type: String,
    default: "Pending",
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who requested the loan
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who approved the loan
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: {
    type: Date,
  },
  lender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who lends the money (if approved)
  },
  fundedAt: {
    type: Date,
  },
  repayments: [
    {
      amount: {
        type: Number,
      },
      paidAt: {
        type: Date,
      },
    },
    // ... other fields related to loan repayments
  ],
  // ... other fields related to the loan request
});

const UserLoanRequest = mongoose.model(
  "UserLoanRequest",
  userLoanRequestSchema
);
module.exports = UserLoanRequest;
