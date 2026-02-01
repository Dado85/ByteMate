const { default: mongoose } = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId:{
      type:mongoose.Types.ObjectId,
      ref:"users",
      required:true
    },
    paymentId:{
      type:String
    },
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    notes: {
      firstName: {
        type: String,
      },
      emailId:{
        type:String
      },
      membership: {
        type: String,
      },
    },
  },
  { timestamps: true },
);
const paymentModel =mongoose.model("payment", paymentSchema);
module.exports = paymentModel;
