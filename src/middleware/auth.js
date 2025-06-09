const jwt = require("jsonwebtoken");
const User=require("../models/user")

const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).send("Access denied. No token provided.");
        }
            console.log("authorisation")
            const  decoded = jwt.verify(token, "DEV@12$hello"); 
            // console.log("decoded message"+decoded._id);
            const user = await User.findById(decoded._id);
            // console.log("user "+user);
            req.user=user;
            next();
    } 
    catch (err) {
        return res.status(401).send("Invalid or expired token.");
    }
};

module.exports = { auth };
