// callHandler.js
const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');

module.exports = (io, socket) => {
  socket.on('user:call', async ({ to, name, offer }) => {
    try {
      const hasAppointment = await Appointment.exists({
        userId: socket.userId,
        doctorId: to,
        state: true,
      });

      if (!hasAppointment) {
        throw new Error('No appointment found. Cannot make a call.');
      }

      console.log('Call from: ', socket.userId);
      io.to(to).emit('incoming:call', {
        from: socket.userId,
        name: name,
        offer,
      });
    } catch (err) {
      console.error('Error in user:call:', err.message);
    }
  });

  socket.on('call:accepted', ({ to, ans }) => {
    console.log('Call accepted from: ', socket.userId);
    io.to(to).emit('call:accepted', { from: socket.userId, ans: ans });
  });

  socket.on('peer:nego:needed', ({ to, offer }) => {
    io.to(to).emit('peer:nego:needed', { from: socket.userId, offer });
  });

  socket.on('peer:nego:done', ({ to, ans }) => {
    io.to(to).emit('peer:nego:final', { from: socket.userId, ans: ans });
  });

  socket.on('leave:call', ({ to }) => {
    console.log('User leaving call: ', socket.id);
    io.to(to).emit('call:ended', { from: socket.id });
    socket.leave(to);
  });
};
