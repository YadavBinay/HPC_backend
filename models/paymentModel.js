const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  payer_name: {
    type: String
  },
  amount: {
    type: Number,
    default: 0
  },
  razorpay_order_id: {
    type: String,
    default:null
  },
  razorpay_payment_id: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: "created"
  },
}, { timestamps: true});
module.exports = mongoose.model("Payment", paymentSchema);
