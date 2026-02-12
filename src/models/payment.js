const mongoose=require('mongoose');
const paymentSchema=new mongoose.Schema({
    userId:{
        type:String,
        ref:"User",
        required:true
    },
    orderId:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true
    },
    paymentId:{
        type:String
    },
    currency:{
    type:String,
    required:true,
    },
    receipt:{
        type:String,
        required:true
    },
    notes:{
        firstName:{
            type:String
        },
        lastName:{
            type:String
        },
        membershipType:{
            type:String
        }
    }


},{timestamps:true});
module.exports=mongoose.model("Payment",paymentSchema)