const express = require("express")
const router = express.Router()
const { createDoctor, getDoctorById, getAllDoctors } = require("../controllers/doctor")
const {upload , permanentStorage , doctorUploadDir} = require('../middlewares/imageUpload')
// const { restrictUserWithoutToken } = require("../middlewares/authentication")
// router.use(restrictUserWithoutToken)
router.post(
  "/",
  upload(permanentStorage(doctorUploadDir)).single("profilePicture"),
  createDoctor
);
router.post("/:id", getDoctorById)
router.get("/", getAllDoctors)
module.exports = router