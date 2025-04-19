const express = require("express");
const {auth} =require("./middleware/auth");
const app = express();
app.use("/admin",auth)
app.get("/admin/user",(req,res)=>{
    res.send("user data is sent successfully")
})
app.get("/admin/getAlluser",(req,res)=>{
    res.send("all user data is sent successfully");
})
app.get("/user/deleteUser",(req,res)=>{
    res.send("deleted user");
})
app.listen(3000, console.log("server is running on port 3000"));
