const mongoose=require("mongoose");
// creating userschema
 const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName: {
        type: String
    },
    email :{
        type: String,
        required:true,
        unique:true,
        // trim remove space from email like "   abc@gmail.com     "
        // our database understand this different email
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        // validate works when new user is created not work in patch ,or update 
        // but we can work manually using option runValidators where we write patch and update api
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new error("GENDER IS NOT VALID ")
            }
        }
    },
    skills:{
        type:[String]
    },
    about:{
        type:String,
        default:"Hey, I am using dev tinder "
    }
 },{timestamps:true});
//  exporting model
module.exports=mongoose.model("User",userSchema);
// or
// const User=mongoose.model("user",userSchema);
// moule.exports=User;