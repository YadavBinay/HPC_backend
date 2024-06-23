// initSocket.js
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const socketidToUserIdlMap = new Map();
function initializeSocket(server) {
  const io = new Server(server, {
    allowEIO3: true,
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.userId;
      console.log('User verified');
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', socket => {
    console.log('Connected: ' + socket.userId);

    socket.on('disconnect', () => {
      console.log('Disconnected: ' + socket.userId);
    });

    // Attach event handlers from other modules
    require('./messageHandler')(io, socket);
    require('./callHandler')(io, socket);
  });

  return io;
}

module.exports = initializeSocket;
