//const User = require("../model/user");
const Transaction = require("../model/transactions");

const addFundsToAccount = async (req, res) => {
    try {
        const user = res.locals.user;
        if (!user) {
          // If there's no user in res.locals.user, handle the case where the user isn't authenticated
        return  res.status(401).json({ message: "User not authenticated" });
        }
    const {  amount } = req.body;

    // Check if the user ID and amount are provided
    if (!amount) {
      return res.status(400).json({ error: "amount are required" });
    }

    // Find the user based on the provided user ID
   // const user = await User.findById(userId);

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // Increase the funds in the user's account
    user.account.funds += amount;
    user.account.balance += amount;

    // Create a transaction record for the funds added
    const transaction = new Transaction({
      user: user._id,
      amount,
      type: "Credit", // This could be 'Credit' for funds added
      status: "Completed",
    });

    // Save the updated user account
    await user.save();

    // Save the transaction
    await transaction.save();

    res.status(200).json({ message: "Funds added successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addFundsToAccount };
