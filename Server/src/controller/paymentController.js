const razorpay = require("../config/razorpay");
const paymentModel = require("../models/payment");
const UserModel = require("../models/user");
const membershipType = require("../service/utils");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
async function createOrder(req, res) {
  try {
    const { membership } = req.body;
    const userId = req.user._id;
    const { firstName } = await UserModel.findById({ _id: userId });
    const order = await razorpay.orders.create({
      amount: membershipType[membership] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: firstName,
        membership: membership,
      },
    });
    console.log(order);

    const { amount, id, status, receipt, currency, notes } = order;
    const payment = await paymentModel.create({
      userId: req.user._id,
      orderId: id,
      amount: amount,
      status: status,
      receipt: receipt,
      currency: currency,
      notes: {
        firstName: notes.firstName,
        emailId: notes.emailId,
        membership: notes.membership,
      },
    });
    const savedPayment = await payment.save();

    return res.json({
      msg: "order created successfully",
      data: { ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_API_KEY },
    });
  } catch (error) {
    console.error("Razorpay Error:", error);

    res.status(500).json({
      message: error?.error?.description || error.message,
    });
  }
}
async function handleRazorpayWebhook(req, res) {
  try {
    console.log("WEBHOOK CALLED");

    const webhookSignature = req.get("X-Razorpay-Signature");
    console.log("WEBHOOK CALLED", webhookSignature);
    const iswebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );
    if (!iswebhookValid) {
      return res.status(400).json({ msg: "webhook api failed" });
    }
    console.log(req.body.payload.payment.entity);
    const paymentDtails = req.body.payload.payment.entity;
    const payment = await paymentModel.findOne({
      orderId: paymentDtails.order_id,
    });
    payment.status = paymentDtails.status;
    await payment.save();
    const reqdUser = await UserModel.findOne({ _id: payment.userId });
    reqdUser.isPremimum = true;
    reqdUser.memebership = payment.notes.membership;
    await reqdUser.save();
    return res.status(200).json({
      message: "webhook received sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.error?.description || error.message,
    });
  }
}
async function verifyPayment(req, res) {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById({ _id: userId });
    const payment=await paymentModel.findOne({userId:userId});
    console.log(payment);
    
return res.status(200).json({
  success: true,
  message: user.isPremimum
    ? "User is premium"
    : "User is not premium",
  data: {
    isPremimum: user.isPremimum,
    membership:payment.notes.membership
  },
});

  }
   catch (error) {
    res.status(500).json({
      message: error?.error?.description || error.message,
    });
  }

}
module.exports = { createOrder, handleRazorpayWebhook, verifyPayment};
