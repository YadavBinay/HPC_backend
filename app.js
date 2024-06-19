require("dotenv").config();

const express = require("express");
const http = require("http");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
<<<<<<< HEAD
const mongoose = require('mongoose');

const userRouterV1 = require("./routes/userRouteV1");
const childRouterV1 = require("./routes/childRouteV1");
const imageRouterV1 = require("./routes/imageRouteV1")
=======
const mongoose = require("mongoose");

const userRouterV1 = require("./routes/userRouteV1");
const childRouterV1 = require("./routes/childRouteV1");
// const imageRouterV1 = require("./routes/imageRouteV1");
>>>>>>> recovery-branch
const appointmentRouterV1 = require("./routes/appointmentRouteV1");
const doctorRouterV1 = require("./routes/doctorRouteV1");
const documentRouterV1 = require("./routes/documentRouterV1");
const paymentRouterV1 = require("./routes/paymentRouteV1");
const subscriptionRouterV1 = require("./routes/subscriptionRouterV1");
const messageRouterV1 = require("./routes/messageRouteV1");
<<<<<<< HEAD
const reportRouterV1 = require("./routes/reportRoute")

=======
// const reportRouterV1 = require("./routes/reportRoute");
const otpRouteV1 = require("./routes/otpRouteV1.js");
>>>>>>> recovery-branch
const { checkForAuthenticationToken } = require("./middlewares/authentication");
const { connectMongoDb } = require("./connection");

const app = express();
<<<<<<< HEAD
const PORT = 4000;
=======
const PORT = process.env.PORT || 4000;
>>>>>>> recovery-branch

// Connection
connectMongoDb(process.env.MONGO_CONNECTION_URL).then(() =>
  console.log("Mongodb connected")
);

// Ensure Message model is registered
require("./models/message");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

<<<<<<< HEAD
app.use((req, res, next) => {
  const msg = `${req.method} \ ${req.url} ${req.hostname} ${Date.now()}\n`;
  fs.appendFile("log.txt", msg, () => { });
  next();
});

// User - Route
app.use("/api/v1/user", checkForAuthenticationToken(), userRouterV1);
app.use("/api/v1/child", childRouterV1);
app.use("/api/v1/appointment", appointmentRouterV1);
app.use("/api/v1/doctor", doctorRouterV1);
app.use("/api/v1/document", documentRouterV1);
app.use("/api/v1/payment", paymentRouterV1);
app.use("/api/v1/subscription", subscriptionRouterV1);
app.use("/api/v1/chat", messageRouterV1);

const server = app.listen(PORT, () => console.log(`running on port ${PORT}`));

// Socket.io setup
const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const jwt = require("jsonwebtoken");

const Message = mongoose.model("Message");
const User = mongoose.model("user");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = payload.userId;
    console.log("user verified");
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("sendMessage", async ({ reciverId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        senderId: socket.userId,
        reciverId,
        message
      });

      await newMessage.save();
      console.log("message saved sent")
      io.to(reciverId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
        createdAt: newMessage.createdAt
      });
    }
  });

  socket.join(socket.userId);
});
=======
// Logging middleware
app.use((req, res, next) => {
  const msg = `${req.method} \ ${req.url} ${req.hostname} ${Date.now()}\n`;
  fs.appendFile("log.txt", msg, () => {});
  next();
});

// User routes (authentication not needed for signup/login)
app.use("/api/v1/user", userRouterV1);
app.use("/api/v1/otp", otpRouteV1);
// Protected routes
app.use("/api/v1/child", checkForAuthenticationToken(), childRouterV1);
// app.use("/api/v1/image", checkForAuthenticationToken(), imageRouterV1);
app.use(
  "/api/v1/appointment",
  checkForAuthenticationToken(),
  appointmentRouterV1
);
// , checkForAuthenticationToken()
app.use("/api/v1/doctor", doctorRouterV1);
app.use("/api/v1/document", checkForAuthenticationToken(), documentRouterV1);
app.use("/api/v1/payment", checkForAuthenticationToken(), paymentRouterV1);
app.use(
  "/api/v1/subscription",
  checkForAuthenticationToken(),
  subscriptionRouterV1
);
// app.use("/api/v1/report", checkForAuthenticationToken(), reportRouterV1);
app.use("/api/v1/chat", checkForAuthenticationToken(), messageRouterV1);

// Start server
const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));

// Initialize Socket.io
const initializeSocket = require("./socket");
initializeSocket(server);
>>>>>>> recovery-branch
