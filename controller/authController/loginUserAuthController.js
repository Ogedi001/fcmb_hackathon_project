const users = require("../../model/user");
const jwt = require("jsonwebtoken");

// Fetch JWT secret from environment variable
const JWT_SECRET = process.env.JWT;

// Create a JWT token function
const createJwTToken = (id) => {
  const Time_in = new Date().toLocaleTimeString();
  return jwt.sign({ id, Time_in }, JWT_SECRET);
};


const login = async (req, res) => {
  const { email_username, password } = req.body;
  try {
    const user = await users.findUserByEmailOrUsername(
      email_username,
      password
    );

    const token = createJwTToken(user._id);
    res.cookie("user_token", token, { httpOnly: true });
    res.status(201).json({ message: "Login successful", user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
module.exports = login ;



