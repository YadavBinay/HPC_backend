const multer = require("multer");
const path = require("path");
const fs = require("fs");
const doctorModel = require("../models/doctorModel");

const createDoctor = async (req, res) => {
  try {
    // const { name, specialization, available } = req.body;
    const {
      name,
      specialization,
      available,
      location,
      contactNumber,
      email,
      experience,
      education,
      bio,
    } = req.body;

    // Handle file upload
    let profilePicture = "";
    if (req.file) {
      profilePicture = path.join(uploadDir, req.file.filename);
    }

    const doctor = await doctorModel.create({
      name,
      specialization,
      location,
      available,
      profilePicture,
      contactNumber,
      email,
      experience,
      education,
      bio,
    });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorById = async (req, res) => {
  console.log("Fetching doctor by ID from URL parameter");
  try {
    const { id } = req.params;
    console.log("Received ID:", id);
    if (!id) {
      return res.status(400).json({ msg: "ID parameter is required" });
    }

    const doctor = await doctorModel.findById(id);
    console.log("Doctor found:", doctor);
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  console.log("Fetching all doctors");
  try {
    const doctors = await doctorModel.find({});
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDoctor, getDoctorById, getAllDoctors };
