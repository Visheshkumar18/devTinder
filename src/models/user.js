const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 1,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      // checking email is valid or not using validator library
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not a valid email " + value);
        }
      },
    },
    age:{
      type:String,
      validator(value){
        if(!validator.isInt(value) && value<0){
          throw new Error("Enter valid age"+value);
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password: " + value);
        }
      },
    },
    photoUrl:{
      type:String,
      default:"https://www.freepik.com/free-vector/smiling-young-man-illustration_356306451.htm#fromView=keyword&page=1&position=4&uuid=3fd1a490-0d01-4d0e-8dd2-c23cf6afa444&query=Default+avatar"
    },
    about: {
      type: String,
      default: "Hey, I'm using the Dev Tinder!",
       maxLength: 1000,
    },
    skills: {
      type: [String],
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    isPremium:{
      type:Boolean,
      default:false,
    },
    membershipType:{
      type:String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
