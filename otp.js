const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');
const { Environment } = require('@tensorflow/tfjs');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN,
  },
});


const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
};


const otps = {};


app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  otps[email] = otp.toString();  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otps[email] === otp) {
    delete otps[email]; // Remove OTP after verification
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//  Environment Variabales

// EMAIL=your_gmail_email_address
// OAUTH_CLIENT_ID=your_oauth_client_id
// OAUTH_CLIENT_SECRET=your_oauth_client_secret
// OAUTH_REFRESH_TOKEN=your_oauth_refresh_token
// OAUTH_ACCESS_TOKEN=your_oauth_access_token
// PORT=3001