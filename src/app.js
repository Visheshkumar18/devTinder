const express = require("express");
const ConnectDB = require("./config/databse");
const cookieParser = require("cookie-parser");
const authRouter = require("./Routes/auth");
const profileRouter = require("./Routes/profile");
const requestRouter = require("./Routes/request");
const userRouter = require("./Routes/user");
const dotenv=require('dotenv')
dotenv.config()
const cors = require("cors");
const app = express();
//  express.json middleware is used to converst json to javascript object
app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));
//  cookie parser is used to read cookies at different routes
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

ConnectDB().then(() => {
  try {
    console.log("Database connection is established");
    app.listen(3000, () => {
      console.log("server is on running on port 3000");
    });
  } catch (err) {
    console.log("Something went wrong ");
  }
});
