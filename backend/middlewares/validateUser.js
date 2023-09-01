import jwt from "jsonwebtoken";

const validateUser = (req, res, next) => {
  // Get the user from auth token and add it to req object
  //                 this "auth-token" name should match with that we pass in header
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ message: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Please authenticate using a valid token" });
  }
};

export default validateUser;
