const express=require("express");
const app=express();
app.use((req,res)=>{res.send("hello from the server!!!!")})
// app.listen(port number,callback function)
app.listen(3000,()=>{console.log("your server is running successfully on port 3000....")});