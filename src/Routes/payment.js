const express =require("express");
const { auth } = require("../middleware/auth");
const paymentRouter =express.Router();
const instance=require("../utils/razorpay")
const Payment=require('../models/payment');
const membershipAmount=require('../utils/constants')
const {validateWebhookSignature}=require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");
paymentRouter.post("/payment/create",auth,async(req,res)=>{
try {
    const {membershipType}=req.body;
    const {firstName,lastName,email}=req.user;
       const order=await instance.orders.create({
        amount:membershipAmount[membershipType]*100, //this amount in paise not in rupees
        currency:"INR",
        receipt:"receipt#1",
        notes:{ //for meta data
           firstName:firstName,
           lastName:lastName,
           email,
           membershipType:membershipType 
        }})
    // save it in my database
        console.log(order)
        const payment=new Payment({
            userId:req.user._id,
            orderId:order.id,
            status:order.status,
            amount:order.amount,
            currency:order.currency,
            receipt:order.receipt,
            notes:order.notes
        })
        const savedPayment=await payment.save();
    // return order details to frontend
     res.json({...savedPayment.toJSON()});
    } catch (error) {
        console.log(error)
    }
})
paymentRouter.post("/payment/webhook",async(req,res)=>{
    try{
        const WebhookSignature=req.get("X-Razorpay-Signature"); 
        const isValidWebHook=validateWebhookSignature(JSON.stringify(req.body),WebhookSignature,process.env.RAZORPAY_WEBHOOK_SECRET);
        if(!isValidWebHook){
            return res.status(400).json({msg:"webhook signature is invalid"});
        }
        //1-> update my payment status in db
        //2-> update the user as premium
        //3-> return success response to razorpay
        const PaymentDetails=req.body.payload.payment.entity;
        const payment=await Payment.find({orderId:PaymentDetails.order._id});
        payment.status=PaymentDetails.status;
        await payment.save();
        const user=await User.findOne({_id:payment.userId});
        user.isPremium=true;
        user.membershipType=payment.notes.membershipType;
        await user.save();
        // if(req.body.event== "payment.captured"){

        // }
        // if(req.body.event== "payment.failed"){
            
        // }
        return res.status(200).json({msg:"webhook received successfully"});
    }catch(err){
        return res.status(500).json({msg:err.messsage})
    }
});
paymentRouter.get("/premium/verify",auth,async(req,res)=>{
    const user=req.user;
    if(user.isPremium){
        return res.json({isPremium:true});
    }
    return res.json({isPremium:false});
})

module.exports=paymentRouter;