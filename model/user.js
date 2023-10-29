const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  validator = require("validator");
const { v4: uuidv4 } = require("uuid");

// Create a schema for the User table
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "full name is required"],
  },
  //username must be alphanum, min of 3, max of 20
  //validator throws error msg
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    validate: {
      validator: function (username) {
        return (
          validator.matches(username, /^[a-zA-Z0-9_]+$/) &&
          validator.isLength(username, { min: 3, max: 20 })
        );
      },
      message: (props) => `${props.value} is not a valid username.`,
    },
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: {
      validator: function (email) {
        return validator.isEmail(email);
      },
      message: function (props) {
        return `${props.value} is not a valid email address for ${props.path}`;
      },
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    validate: {
      validator: function (password) {
        // add your validation logic here
        return validator.isStrongPassword(password);
      },
      message:
        "Weak password, should be at least 8 characters long and contains  atleast 1 uppercase,lowercase,number and a symbol",
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "phone no. is required"],
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v, "en-NG");
      },
      message: (props) =>
        `${props.value} is not a valid phone number in Nigeria.`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  //store unique objectId of loan_request doc
  //reference its model
  loan_request: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userLoanRequest",
    },
  ],

  // references to other users that this user has searched for.
  beneficiaries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "beneficiary",
    },
  ],

  account: {
    // accountNumber: {
    //   type: String, // best assume to be string
    //   unique: true,
    //   required: [true,'account number is require']
    //},
    funds: {
      type: Number,
      default: 0,
    },
    spendingLimit: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    balance: {
      type: Number,
      default: 0,
    },
    creditScore: {
      type: Number,
      default: 0,
    },
    // // paymentMethods: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "PaymentMethod",
    //   },
    // ],
    subscriptionStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    interestEarned: {
      type: Number,
      default: 0,
    },
    // ... other fields
  },
  airtimePurchase: [
    {
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

function generateAccountNumber() {
  const uuid = uuidv4().replace(/-/g, ""); // Remove hyphens
  const onlyDigits = uuid.replace(/\D/g, ""); // Remove non-digits
  return onlyDigits.slice(0, 10); // Extract the first 10 digits
}

//mongoose pre save hook to modified data before its save in database
userSchema.pre("save", async function (next) {
  try {
    //gen 10 digit acct number
    //this.account.accountNumber = generateAccountNumber()
    //convert the users email to lowercase
    this.email = this.email.toLowerCase();
    const salt = await bcrypt.genSalt(10);
    //hashed user password
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

//adding a method(action) to mongoose userShema
//this methood allows the retrieval of a user by their username or email along with password validation.
userSchema.statics.findUserByEmailOrUsername = function (
  usernameOrEmail,
  password
) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!usernameOrEmail) {
        reject("Please insert a valid email or username");
        return;
      }
      if (!password) {
        reject("Please insert passsword");
        return;
      }

      const user = await this.findOne({
        $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      });

      console.log(user);

      if (!user) {
        reject("User does not exist!");
        return;
      }
      const validUser = bcrypt.compareSync(password, user.password);

      if (!validUser) {
        reject("Invalid credentials");
        return;
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;

//mongoose defines data as object. object has property and methods(actions)
//we define schema with require properties and action to validate
// using an array structure, allows storing a field multiple times
//mongoose schema also have pre hooks (); actions before data are save
//mongoose schema can also have custom method
