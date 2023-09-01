import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

// Login with google
const login = async (req, res) => {
  const { name, email, googleId, emailVerified, picture } = req.body;
  let success = false;
  try {
    let user = await UserModel.findOne({ googleId });

    // if user not exist then create new user
    if (!user) {
      user = new UserModel({
        name,
        email,
        googleId,
        emailVerified,
        picture,
      });
      await user.save();
    }

    const data = {
      id: user.id,
      email: user.email,
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    success = true;
    res.status(200).json({ success, authToken });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { login };
