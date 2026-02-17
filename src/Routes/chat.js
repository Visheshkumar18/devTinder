const express=require("express");
const { auth } = require("../middleware/auth");
const Chat = require("../models/chat");
const chatRouter=express.Router();
chatRouter.get('/chat/:targetUserId',auth,async(req,res)=>{
    const {targetUserId}=req.params;
    const userId=req.user._id;
    try { 
        let chat= await Chat.findOne({
            participants:{$all:[userId,targetUserId]}
        }).populate({
            path:"messages.senderId",
            select:"firstName lastName"
        });
        // when user first time chat with their connection then it create a new document related to thst connection
        if(!chat){
         chat= new Chat({
            participants:[userId,targetUserId],
            messages:[]
         }) ; 
         await chat.save(); 
        }
        res.json(chat);
      
    } catch (error) {
        console.log(error);
    }
})

module.exports=chatRouter;