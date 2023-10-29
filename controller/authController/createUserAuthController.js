const users = require("../../model/user");
const jwt = require("jsonwebtoken");

// Fetch JWT secret from environment variable
const JWT_SECRET = process.env.JWT;

// Create a JWT token function
const createJwTToken = (id) => {
  const Time_in = new Date().toLocaleTimeString();
  return jwt.sign({ id, Time_in }, JWT_SECRET);
};

const regUsers = async (req, res) => {
  try {
    const {
      password,
      confirmPassword,
      email,
      phoneNumber,
      fullName,
      username,
    } = req.body;

    // Validate password presence and match
    if (!password) {
      return res.status(400).json({ error: "Password field cannot be empty" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Perform additional validations for email and phoneNumber here

    // Assume 'users' is a model for your users
    const user = await users.create(req.body); // Create the user
    console.log("User saved to the database");

    // Create a JWT token for the user
    const token = createJwTToken(user._id);

    // Set the token in a cookie (Note: 'user' might not be the best name for the cookie)
    // res.cookie("user_token", token, { httpOnly: true });

    // Send a success response
    res.status(201).json({ message: "User registered successfully", token , email, username,fullName,phoneNumber});
  } catch (error) {
    if (error.code === 11000) {
      const errors = {};

      //error handling trying to save already exist data
      if (error.keyPattern.username) {
        errors.username = "Username already exists";
      }
      if (error.keyPattern.email) {
        errors.email = "Email address already exists";
      }
      if (error.keyPattern.phoneNumber) {
        errors.phoneNumber = "Phone number already exists";
      }

      return res.status(400).json({ errors });
    } else if (error.name === "ValidationError") {
      const errors = {};

      Object.values(error.errors).forEach((err) => {
        errors[err.path] = err.message;
      });

      return res.status(400).json({ errors });
    } else {
      console.error("Unexpected error:", error);
      return res
        .status(500)
        .json({
          error: "An error occurred while creating the customer account",
        });
    }
  }
};

module.exports = regUsers;