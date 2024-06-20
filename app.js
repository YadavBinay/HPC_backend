require("dotenv").config();

const express = require("express");
const http = require("http");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRouterV1 = require("./routes/userRouteV1");
const childRouterV1 = require("./routes/childRouteV1");
const imageRouterV1 = require("./routes/imageRouteV1");
const appointmentRouterV1 = require("./routes/appointmentRouteV1");
const doctorRouterV1 = require("./routes/doctorRouteV1");
const documentRouterV1 = require("./routes/documentRouterV1");
const paymentRouterV1 = require("./routes/paymentRouteV1");
const subscriptionRouterV1 = require("./routes/subscriptionRouterV1");
const messageRouterV1 = require("./routes/messageRouteV1");
const reportRouterV1 = require("./routes/reportRoute");

const reportRouterV1 = require("./routes/reportRoute");
const otpRouteV1 = require("./routes/otpRouteV1.js");
const { checkForAuthenticationToken } = require("./middlewares/authentication");
const { connectMongoDb } = require("./connection");

const app = express();
const PORT = process.env.PORT || 4000;

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

// Logging middleware
app.use((req, res, next) => {
  const msg = `${req.method} \ ${req.url} ${req.hostname} ${Date.now()}\n`;
  fs.appendFile("log.txt", msg, () => {});
  next();
});
app.get("/", (req, res) => {
  res.send("<h1>HPC</h1>");
});
// User routes (authentication not needed for signup/login)
app.use("/api/v1/user", userRouterV1);
app.use("/api/v1/otp", otpRouteV1);
// Protected routes
app.use("/api/v1/child", checkForAuthenticationToken(), childRouterV1);
app.use("/api/v1/image", checkForAuthenticationToken(), imageRouterV1);
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
app.use("/api/v1/report", checkForAuthenticationToken(), reportRouterV1);
app.use("/api/v1/chat", checkForAuthenticationToken(), messageRouterV1);

// Start server
const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));

// Initialize Socket.io
const initializeSocket = require("./socket");
initializeSocket(server);
