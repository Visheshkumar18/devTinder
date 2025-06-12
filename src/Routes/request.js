const express = require("express");
const mongoose = require("mongoose");
const { auth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express();
// api for interested or ignored request 
requestRouter.post("/request/send/:status/:toUserId", auth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        // 1 -> Validate the status
        const isAllowedStatus = ["interested", "ignore"];
        if (!isAllowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type: " + status });
        }

        // 2 -> Prevent self-request
        if (fromUserId.toString() === toUserId.toString()) {
            return res.status(400).json({ message: "Can't send connection request to yourself!" });
        }

        // 3 -> Validate user ID is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(toUserId)) {
            return res.status(400).json({ message: "Invalid user ID format!" });
        }

        // 4 -> Check if the user exists
        const isValidToUser = await User.findById(toUserId);
        if (!isValidToUser) {
            return res.status(404).json({ message: "No such user exists!" });
        }

        // 5 -> Check if request already exists (in either direction)
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });
        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection request already exists!" });
        }

        // 6 -> Create and save the connection request
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        return res.status(201).json({ message: "Connection request sent successfully!", data });

    } catch (err) {
        return res.status(500).json({ message: "ERROR: " + err.message });
    }
});
// api for accepted or rejected request 
requestRouter.post("/request/review/:status/:requestId",auth,async(req,res)=>{
   try{
     const loggedInUser=req.user;
    const allowedStatus=["accepted","rejected"];
    const {status,requestId}=req.params;
    if(!allowedStatus.includes(status)){
        return res.status(404).json({message:"This status is not allowed!!"});
    }
    console.log(req.user._id);
    const connectionRequest=await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser,
        status:"interested",
    });
    if(!connectionRequest){
        return res.status(400).json({message:"connection request is not found!!"});
    }
    connectionRequest.status=status;
    const data=await connectionRequest.save();
    res.json({message:"connection request "+status,data});
   }catch(err){
    res.status(400).send("ERROR:"+err.message);
   }
}) 

module.exports = requestRouter;
