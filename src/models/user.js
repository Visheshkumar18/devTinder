const { Schema, default: mongoose } = require("mongoose");

const UserSchema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true
       
    },
    password:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        default:"Hey, I'm using the Dev Tinder!"
    },
    skills:{
        type:[String]
    },
    gender:{
        type:String,
         validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }

    }
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema);