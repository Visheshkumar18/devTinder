const mongoose =require("mongoose");
const {Schema}=require("mongoose");

const connectionRequest=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true

    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    Status:{
        type:String,
        enum:{values:["interested","ignore","accepted","rejected"],message:`{VALUE} is incorrect status type`},
        require:true

    }
},{timestamps:true});

module.exports=new mongoose.model("ConnectionRequest",connectionRequest);

