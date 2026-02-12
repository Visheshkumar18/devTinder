const RazorPay=require("razorpay");
var instance=new RazorPay({
    key_id:"Your_key_id",
    key_secret:"Your_key_secret"
});
module.exports=instance;