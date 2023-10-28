const logOut = (req, res) => {
  res.clearCookie("user_token"); // Clear the 'customer' cookie
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = logOut;