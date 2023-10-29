// Import necessary modules
require("dotenv").config();
const jwt = require("jsonwebtoken");
const users = require("./../model/user");



  
// Middleware function for user authentication
const userAuth = (req, res, next) => {
  //access token
    const token = req.cookies.token;
    console.log('token', token)
  //back to login if no token
  if (!token) {
    res.redirect("/login");
    return;
  }
  //if token exist verify with jwt
  jwt.verify(token, "JWT", (error, decoded) => {
    //if no error proceed to next
    if (!error) {
      next();
      return;
    }
    console.log(error);
    res.redirect("/login");
  });
};

// Middleware function to check and retrieve customer details
//res.local is an express method that pass data from middleware to routes.
//this data(e.g a user data can be acess from the route)
const checkUser = (req, res, next) => {
  //access token
  const token = req.cookies.token;

  if (!token) {
    //if no user log in , set user data to null
    res.locals.user = null;
    next();
    return;
  }

  //verify the token
  jwt.verify(token, "JWT", async (error, decoded) => {
    if (!error) {
      //find particular user log in
      const user = await users.findById(decoded.id);

      if (user) {
        //save user data and move to next middleware
        res.locals.user = user;
        next();
        return;
      }
    }
    console.log(error);
    res.locals.user = null;
    next();
  });
};

// Exporting the middleware functions
module.exports = { userAuth, checkUser };
