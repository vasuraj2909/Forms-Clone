import UserModel from "../models/UserModel.js";
const getuser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    res.status(200).send(user);
  } catch (error) {
    // console.log(error.message);
    res.status(500).send("Internal server error");
  }
};

export { getuser };
