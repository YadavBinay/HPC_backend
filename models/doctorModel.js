<<<<<<< HEAD
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Doctor', DoctorSchema);
=======
const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  profilePicture: {
    type: String, // URL or path to the profile picture
    required: false,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  experience: {
    type: Number, // Number of years of experience
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  ratings: {
    type: Number,
    required: false,
    default: 0,
  },
  reviews: {
    type: [String], // Array of review strings
    required: false,
  },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
>>>>>>> recovery-branch
