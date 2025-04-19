const express=require("express");
const app=express();

app.get("/ab*c",(req,res)=>{ res.send("hello how are you ?")
    console.log(req.query);
});
app.use("/hello",(req,res)=>{res.send("hello, hello ,hello !!!")});
app.use("/test",(req,res)=>{res.send("hello from test route ")});
app.use("/",(req,res)=>{res.send("hello from dashboard")});
app.use((req,res)=>{res.send("hello from the server!!!!")})
// app.listen(port number,callback function)
app.listen(3000,()=>{console.log("your server is running successfully on port 3000....")});