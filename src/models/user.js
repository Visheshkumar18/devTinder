const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");
const UserSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
        minLength:1,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        // checking email is valid or not using validator library
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid email " + value);
            }
        }
       
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password: " + value);
            }
        }
    },
    about:{
        type:String,
        default:"Hey, I'm using the Dev Tinder!",
        maxLength:30,
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