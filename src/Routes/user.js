const express=require("express");
const userRouter=express.Router();
const {auth}=require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const   USER_SAVE_DATA=["firstName","lastName","about","skills"];
// friend request received list
userRouter.get("/user/request/received",auth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"])
        .populate("toUserId",["firstName","lastName"]);
        res.json({message:"Data feteched successfully",data:connectionRequest});
    }
    catch(err){
        res.status(404).send("ERROR:"+err.message);
    }
});
// accepted friend request
userRouter.get("/user/connection",auth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",USER_SAVE_DATA)
        .populate("toUserId",USER_SAVE_DATA);
        const data=connectionRequest.map((row)=>{
           if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
            return row.toUserId;
        }
          return row.fromUserId;

        
        });
        res.json({mesage:"your connection is :",data});
         
    }
    catch(err){
        res.status(404).send("ERROR:"+err.message);2
    }
})
module.exports=userRouter;
