const paymentModel = require("../models/paymentModel")
const {instance: razorpayInstance} = require("../services/payment");

const createPayment = async(req, res) => {
  console.log("create payment start");
  try{
    const order = await razorpayInstance.orders.create({
      amount: req.body.amount * 100, // amount unit in paisa
      currency: req.body.currency // INR
    });

    const payment = await paymentModel.create({
      userId: req.body.user._id,
      payer_name: req.body.payer_name || req.body.user.userName,
      amount: req.body.amount,
      razorpay_order_id: order.id,
      status: order.status
    });
    console.log("create payment end");
    return res.json({ order, payment });
  }catch (err){
    console.log("create payment end");
    return res.status(500).json({ message: "Error to create payment order"});
  }
}

const paymentVerification = async (req, res) => {
  const {razorpay_payment_id, razorpay_order_id} = req.body;

  console.log("payment id "+ razorpay_payment_id);
  console.log("order id "+ razorpay_order_id);

  try {
    // Capture the payment
    const captureResponse = await razorpayInstance.payments.capture(razorpay_payment_id, req.body.amount, req.body.currency);

    // Update payment model
    const payment = await paymentModel.findOneAndUpdate(
      { razorpay_order_id },
      { razorpay_payment_id , status:"completed"},
      { new: true }
    );

    // ===Do other changes===

    console.log( "payment is " + payment);

    return res.json({ payment });
  } catch (error) {
    return res.status(500).json({ msg: `Error capturing payment - ${error.message}` });
  }
}

const getPayment = async (req, res) => {
    try {
        const userId = req.body.user._id
        const payment = await paymentModel.find({ userId })
        res.status(200).json(payment)
    }
    catch (error) {
        res.status(500).json(error)
    }

}

const updatePayment = async (req, res) => {
    try {
        const userId = req.body.user._id
        const updatedPayment = await paymentModel.findOneAndUpdate({ userId }, { ...req.body })
        res.status(500).json(updatedPayment)
    }
    catch (error) {
        res.status(500).json(error)
    }
}
module.exports = { createPayment, updatePayment, getPayment, paymentVerification }