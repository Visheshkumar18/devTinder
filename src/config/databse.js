const mongoose=require("mongoose");
 
const ConnectDB=async()=>{
  await mongoose.connect("mongodb+srv://vk2256087:vishesh123@cluster0.uwsaw7m.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0")
}

module.exports=ConnectDB;