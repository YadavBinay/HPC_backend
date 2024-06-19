const express = require("express")
const router = express.Router()
const { createDoctor, getDoctorById, getAllDoctors } = require("../controllers/doctor")
<<<<<<< HEAD
// const { restrictUserWithoutToken } = require("../middlewares/authentication")
// router.use(restrictUserWithoutToken)
router.post("/", createDoctor)
router.get("/:id", getDoctorById)
=======
const {upload , permanentStorage , doctorUploadDir} = require('../middlewares/imageUpload')
// const { restrictUserWithoutToken } = require("../middlewares/authentication")
// router.use(restrictUserWithoutToken)
router.post("/", upload(permanentStorage(doctorUploadDir)), createDoctor)
router.post("/:id", getDoctorById)
>>>>>>> recovery-branch
router.get("/", getAllDoctors)
module.exports = router