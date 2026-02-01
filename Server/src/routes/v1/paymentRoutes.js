const express=require("express");
const userAuth=require("../../middlewares/userAuth");
const { createOrder, handleRazorpayWebhook, verifyPayment } = require("../../controller/paymentController");
const paymentRouter=express.Router();
paymentRouter.post("/create",userAuth,createOrder);
paymentRouter.post("/webhook",handleRazorpayWebhook);
paymentRouter.get("/verify/premimum",userAuth,verifyPayment);
module.exports=paymentRouter;