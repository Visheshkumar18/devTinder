const mongoose=require("mongoose");
 
const connectDb=async()=>{

 await mongoose.connect("mongodb+srv://vk2256087:pEkaxPyVRtvLyHkB@cluster0.bmfrlwo.mongodb.net/devTinder")
}
module.exports=connectDb;

