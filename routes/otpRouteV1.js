const { Router } = require("express");
const { sendOtp, verifyOtp } = require("../controllers/otp");
const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp",verifyOtp);

module.exports = router