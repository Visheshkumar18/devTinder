const express = require("express");
 const connectDb=require("./config/databse");
 const User=require("./models/user");
const app = express();

app.post("/signup",async(req,res)=>{
    const user={
        firstName:"Vishesh",
        lastName:"Kumar",
        email:"Vishesh@gmail.com",
        password:"xyz@123",
    }
    const data=new User(user);
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


