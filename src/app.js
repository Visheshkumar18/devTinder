const express=require("express");
const ConnectDB=require("./config/databse");
const User=require("./models/user");
const bcrypt=require("bcrypt");
 const app=express();
 app.use(express.json());
 app.delete("/user",async(req,res)=>{
    try{
        const userId=req.body.userId;
        await User.findByIdAndDelete(userId);
        res.send("user is deleted Successfully!!");

    }
    catch(err){
        res.send("User id not found");
    }
 })
 app.patch("/user/:userId",async(req,res)=>{
    try{
        // we send userid in url becoz we don't want to update user id;
        // if preson is not send userId in url then it work fine that's we use '?'
        const userId=req.params?.userId;
        // only some fields can be updated 
        const ALLOWED_UPDATE=["skills","age","gender","password","about"];
        const isAllowedUpdate=Object.keys(req.body).every((k)=>ALLOWED_UPDATE.includes(k));
        if(!isAllowedUpdate){
            throw new Error("NOT VALID UPDATE");
        }
        // if some attacker send millions of skills to polluted yours database 
        // we apply sanitization to each and every field to prevent from attacker
        if(req.body.skills?.length>10){
            throw new Error("More than 10 skills is not allowed");
        }
        await User.findByIdAndUpdate(userId,req.body,{runValidators:true})
        res.send("User is updated successfully!!")
    }
    catch(err){
        res.send("ERROR: " + err);
    }
 })
 app.post("/signup",async(req,res)=>{
    try{
        console.log(req.body);
        // step1: validate the user data you can write a validate function at api level but validate at database level
          
        const{firstName, lastName,password,email,skills,about,age,gender}=req.body;
        console.log(firstName,lastName,password,email);
        const encryptedPassword=await bcrypt.hash(password,10);

        const data=new User({firstName,lastName,password:encryptedPassword,email,skills,about,age,gender});

        // this is not correct way to create user 
    //    const data=new User(req.body);
       await data.save();
        res.send("data is store ");
    }
    catch(err){
        res.status(404).send("Something went wrong");
    }
 })
app.get("/feed",async(req,res)=>{
    try{
        const user=await User.find({});
        res.status(200).send(user);
    }
    catch(err){
        res.status(404).send("Something went wrong");
    }
})

app.get("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;
    if(!email || !password){
        throw Error("enter the email and password");
    }
    const user=await User.findOne({email});
    if(!user){
       throw new Error("Invaild credentials!!");
    }
   const isMatch=await bcrypt.compare(password,user.password);
    if(isMatch){
        res.send("logIn Successfully!!!!");
    }
    // never enter these message Enter correct password its is data leaking 
    // instead use invalid creditials
    else{
        res.send("Invaild credentials!!");
    }
    }
    catch(err){
        res.send("ERROR: "+err.message);
    }
})


ConnectDB().then(()=>{
    try{
        console.log("Database connecction is established");
        app.listen(3000,()=>{console.log("server is on running on port 3000")});
    }
    catch(err){
        console.log("Something went wrong ");
    }
})



