const express=require("express");
const app=express();
// if we have a multiple route handler we can only send the one response per request 
// if you want that second route handler handle the res.send() then use a third parameter called 
// we can pass these multiple request handler into array they work fine like [rh1,rh2,rh3 ,so on.....]
app.use("/user",
    (req,res,next)=>{console.log("handling first route"); 
        // res.send("Route1")
        next();},
    // now when user hit url then 2nd route handler send the response 
    // but what if i send response then use next fuction then we get  error 
    (req,res)=>{console.log("handling second route"); res.send("Route2")},
    (req,res)=>{console.log("handling third route"); res.send("Route3")},





);

// app.listen(port number,callback function)
app.listen(3000,()=>{console.log("your server is running successfully on port 3000....")});