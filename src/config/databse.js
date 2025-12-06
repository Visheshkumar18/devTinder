const mongoose=require("mongoose");
 
const ConnectDB=async()=>{
  const DB_URL=process.env.DATABASE_URI
  await mongoose.connect(DB_URL)
}

module.exports=ConnectDB;