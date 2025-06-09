const express=require("express");
const { auth } = require("../middleware/auth");
const ConnectionRequest=require("../models/connectionRequest");
const requestRouter =express();
requestRouter.post("/request/send/:status/:toUserId",auth,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        const data=await connectionRequest.save();
        res.json({message:"connection request is send successfully!!",data});
    }catch(err){
        res.status(400).send("ERROR"+ err.message);
    }
});



module.exports=requestRouter;