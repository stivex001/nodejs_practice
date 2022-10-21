//check to see if there is token and header
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;

module.exports = (req, res, next) => {
  //Get token from header
  const token = req.header("Authorization");

  //check if token doesnot exist
  if (!token)
    return res
      .status(401)
      .json({ statusCode: 401, message: "No token, authorization debied!" });

  // else.... token exists
  try {
    const decode = jwt.verify(token, SECRET);

    //Assign user to request object
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      message: "Invalid token",
    });
  }
};
