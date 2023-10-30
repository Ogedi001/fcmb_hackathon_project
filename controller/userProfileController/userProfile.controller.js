

const getUserProfile = (req, res) => {
   
  // If the control reaches here, it means the user is authenticated and their profile is available in res.locals.user
  if (res.locals.user) {
      // Return the user profile information
     const user = res.locals.user
    res.status(200).json(user);
  } else {
    // If there's no user in res.locals.user, handle the case where the user isn't authenticated
    res.status(401).json({ message: 'User not authenticated' });
  }
};
module.exports = getUserProfile