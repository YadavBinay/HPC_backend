// messageHandler.js
const mongoose = require('mongoose');
const Message = mongoose.model('Message');
const User = mongoose.model('User');

module.exports = (io, socket) => {
  socket.on('sendMessage', async ({ receiverId, message }) => {
    try {
      if (!receiverId || !message.trim()) {
        throw new Error('Receiver ID and message are required.');
      }

      const user = await User.findOne({ _id: socket.userId });
      if (!user) {
        throw new Error('User not found.');
      }

      const newMessage = new Message({
        senderId: socket.userId,
        receiverId: receiverId,
        message: message,
      });

      await newMessage.save();
      console.log('Message saved and sent.');

      // Emitting the new message to the receiver
      io.to(receiverId).emit('newMessage', {
        senderId: socket.userId,
        message: message,
        createdAt: newMessage.createdAt,
      });
    } catch (err) {
      console.error('Error in sendMessage:', err.message);
      // Handle error appropriately, emit an error event or log it
    }
    console.log(
      'Receiver:',
      receiverId,
      'Message:',
      message,
      'Sender:',
      socket.userId
    );
  });

  socket.join(socket.userId);
};
