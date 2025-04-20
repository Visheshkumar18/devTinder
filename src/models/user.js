const mongoose=require("mongoose");
// creating userschema
 const userSchema=new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName: {
        type: String
    },
    email :{
        type: String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
 });
//  exporting model
module.exports=mongoose.model("User",userSchema);
// or
// const User=mongoose.model("user",userSchema);
// moule.exports=User;