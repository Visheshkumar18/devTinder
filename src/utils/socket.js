const socket=require('socket.io');
const crypto=require("crypto");
const Chat = require('../models/chat');
const initializeSocket=(server)=>{
  const getSecretRoomId=(userId,targetUserId)=>{
    return crypto.createHash("sha256").update([userId,targetUserId].sort().join("$")).digest("hex");
  }
    const io=socket(server,{
      cors:{
      origin:"http://localhost:5173",
      credentials: true
    }
    });
    io.on("connection",(socket)=>{
      // handle events
      socket.on("joinChat",({targetUserId,userId})=>{
        // create a room for both user, then why need of sorting-> sorting so that both are join to same room for chatting 
        const room =getSecretRoomId(userId,targetUserId);
        socket.join(room);
      });
      socket.on("sendMessage",async ({userId,targetUserId,text})=>{
        const room=getSecretRoomId(userId,targetUserId);
        // save message to the database 
        try {
          const chat=await Chat.findOne({participants:{$all:[userId,targetUserId]}});
          if(!chat){
            chat=new Chat({
              participants:[userId,targetUserId],
              messages:[],
            });
          }
          chat.messages.push({senderId:userId,text});
          await chat.save();
          io.to(room).emit("messageReceived",{text,senderId:{
            _id:userId
          }});
        } catch (error) {
          console.log(error);
        }
      });
      socket.on("disconnect",()=>{

      });
    })

}
module.exports=initializeSocket;