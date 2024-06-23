const mongoose = require('mongoose');
const cron = require('node-cron');
const appointmentModel = require('../models/appointmentModel'); // Adjust the path as necessary
const { io, emailToSocketIdMap } = require('../Connection/initSocket'); // Adjust the path as necessary

async function scheduleAppointment(appointment) {
  try {
    if (appointment) {
      const [hour, minute] = appointment.time.split(':');
      const date = new Date(appointment.date);

      cron.schedule(
        `${minute} ${hour} ${date.getDate()} ${date.getMonth() + 1} *`,
        () => {
          console.log(
            `Appointment reminder for user ${appointment.userId} with doctor ${appointment.doctorId}`
          );

          // Emit notification to specific user and doctor
          const userSocketId = emailToSocketIdMap.get(appointment.userId);
          const doctorSocketId = emailToSocketIdMap.get(appointment.doctorId);

          if (userSocketId) {
            io.to(userSocketId).emit('notification', {
              message: `Reminder: You have an appointment with doctor ${appointment.doctorId}`,
            });
          }

          if (doctorSocketId) {
            io.to(doctorSocketId).emit('notification', {
              message: `Reminder: You have an appointment with patient ${appointment.userId}`,
            });
          }
        }
      );
    } else {
      console.log('No pending appointments found.');
    }
  } catch (error) {
    console.error('Error scheduling appointments:', error);
  } finally {
    mongoose.connection.close();
  }
}

module.exports = scheduleAppointment;
