require("dotenv").config();
const nodemailer = require("nodemailer");

//oAuth 2 setup

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.EMAIL,
//     clientId: process.env.OAUTH_CLIENT_ID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//     accessToken: process.env.OAUTH_ACCESS_TOKEN,
//   },
// });

//simple mail transfer protocol setup smtp
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.user, // replace with your email
    pass: process.env.password, // replace with your email password
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
};

const otps = {};

//send otp route function
const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  otps[email] = otp.toString();
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// Endpoint to verify OTP function
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (otps[email] === otp) {
    delete otps[email]; // Remove OTP after verification
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};

module.exports = { sendOtp, verifyOtp };
