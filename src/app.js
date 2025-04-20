const express = require("express");
 const connectDb=require("./config/databse");
 const User=require("./models/user");
const { Model } = require("mongoose");
const app = express();
// express.json()is convert json to js object which we send dynamically 
app.use(express.json());
app.get("/feed",async(req,res)=>{
    const users= await User.find({})
    try{
        if(users.length!=0){
            res.send(users);
        }
        else{
            res.send("User is not found");
        }
    }
    catch(err){
        res.status(404).send("something went wrong");
    }
});
app.post("/signup",async(req,res)=>{
    console.log(req.body)
    // creating new instance of model
    const data=new User(req.body);
    try{
        await data.save();
     res.send("user added to database")
    }
    catch(err){
        res.status(400).send("error in saving the data:"+ err.message);
    }
    
});








// this is good way of connecting the database 
// becoz once database connection is establish then we run our server
// mongoose.connect is asychronous task 
connectDb().then(()=>{
    console.log("Databse connection established.....")
    app.listen(3000, console.log("server is running on port 3000"));
}).catch((err)=>{console.log("some error is occured")});


