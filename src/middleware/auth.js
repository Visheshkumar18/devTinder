const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please LogIn");
    }
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send("Invalid or expired token.");
  }
};

module.exports = { auth };
