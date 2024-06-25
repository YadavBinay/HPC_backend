require('dotenv').config();

const express = require('express');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const { connectMongoDb } = require('./Connection/mongoDbConnection.js');

const app = express();
const PORT = process.env.PORT || 4000;

// Connection
connectMongoDb(process.env.MONGO_CONNECTION_URL).then(() =>
  console.log('Mongodb connected')
);

// Ensure Message model is registered
require('./models/messageModel.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// Serve user-uploaded images from the 'uploads/images/users' directory
app.use( express.static(path.join('uploads', 'images', 'users')));

app.use(cors());

// Logging middleware
app.use((req, res, next) => {
  const msg = `${req.method} \ ${req.url} ${req.hostname} ${Date.now()}\n`;
  fs.appendFile('log.txt', msg, () => {
    console.log(msg);
  });
  next();
});

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Import and use routes
const configureRoutes = require('./routesConfig.js');
configureRoutes(app);

// Start server
const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));

// Initialize Socket.io
const initializeSocket = require('./Connection/initSocket.js');
const io = initializeSocket(server);

module.exports = { io };
