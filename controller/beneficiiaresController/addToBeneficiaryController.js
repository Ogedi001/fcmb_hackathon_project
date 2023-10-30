const Beneficiary = require("../../model/beneficiary");
const Users = require("../../model/user");

const transformUserToBeneficiary = (user) => {
  const { username, email, phoneNumber } = user;
  const beneficiary = new Beneficiary({ username, email, phoneNumber });
  return beneficiary;
};

const addUsersToBeneficiary = async (users) => {
  try {
    const beneficiaries = users.map((user) => transformUserToBeneficiary(user));
    const savedBeneficiaries = await Beneficiary.insertMany(beneficiaries);
    return savedBeneficiaries;
  } catch (error) {
    console.error(error);
    throw new Error("Error while adding users to Beneficiary");
  }
};

const addTobeneficiary = async (req, res) => {
  try {
    let { phoneNumber } = req.body; // Changed from const to let for reassignment

    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    phoneNumber = phoneNumber.toString(); // Converted to string

    const beneficiary = await Users.find({ phoneNumber: phoneNumber });

    if (beneficiary.length === 0) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }

      const savedBeneficiaries = await addUsersToBeneficiary(beneficiary);
      

      const userId = res.locals.user._id;
      const user = await Users.findById(userId)
      
    // Push the new beneficiaries' IDs to the user's 'beneficiaries' array
    savedBeneficiaries.forEach((b) => user.beneficiaries.push(b._id));
    // Save the user instance to persist the changes
      user.save();
      

    res.status(200).json({
      message: "Beneficiaries added successfully",
      savedBeneficiaries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addTobeneficiary };
