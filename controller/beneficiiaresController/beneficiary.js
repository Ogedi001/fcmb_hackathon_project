 const users = require("../../model/user");


 //get All username in db
const getAllBeneficiaries = async (req, res) => {
  try {
    const allBeneficiaries = await users.find();
    const allUsernames = allBeneficiaries.map((user) => user.username);
    res.status(200).json(allUsernames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//sarch for a particular user
// const getBeneficiary = async (req, res) => {
//   try {
//     const { searchQuery } = req.body;

//     if (!searchQuery) {
//       return res.status(400).json({ error: "Search query is required" });
//     }

//     const beneficiary = await users.find({ username: searchQuery });

//     if (beneficiary.length === 0) {
//       return res.status(404).json({ error: "Beneficiary not found" });
//     }

//     res.status(200).json(beneficiary);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// module.exports = {getAllBeneficiaries, getBeneficiary};


//search for a particular user or search user with autosuggest
const searchBeneficiaries = async (req, res) => {
  try {
    const { searchQuery, isAutoSuggest } = req.body;

     if (!(searchQuery || isAutoSuggest)) {
       return res.status(400).json({ error: "Search query is required" });
     }

    if (isAutoSuggest) {
      //find users using reqex
      const suggestions = await users
        .find({ username: new RegExp(isAutoSuggest, "i") })
      
      res.status(200).json(suggestions);
    } else {
      const beneficiary = await users.find({ username: searchQuery });

      if (beneficiary.length === 0) {
        return res.status(404).json({ error: "Beneficiary not found" });
      }

      res.status(200).json(beneficiary);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addTobeneficiary = (req, res) => {
  
}

module.exports = { searchBeneficiaries, getAllBeneficiaries };
