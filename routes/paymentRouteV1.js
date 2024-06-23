const {
  createPayment,
  paymentVerification,
  updatePayment,
  getPayment,
} = require('../controllers/payment');
const express = require('express');
const router = express.Router();
const { restrictUserWithoutToken } = require('../middlewares/authentication');
router.use(restrictUserWithoutToken);
router.post('/create-payment', createPayment);
router.post('/payment-verification', paymentVerification);
router.get('/', getPayment);
router.patch('/', updatePayment);
module.exports = router;
