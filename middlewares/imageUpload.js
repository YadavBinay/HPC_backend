<<<<<<< HEAD
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage })
module.exports = { upload }
=======
const multer = require("multer");

const path = require("path");
const fs = require('fs')
// Define upload directories for doctors and users
const doctorUploadDir = path.join( "uploads", "images", "doctors");
const userUploadDir = path.join( "uploads", "images", "users");
// Ensure the directory exists

if (!fs.existsSync(doctorUploadDir)) {
  fs.mkdirSync(doctorUploadDir, { recursive: true });
}
if (!fs.existsSync(userUploadDir)) {
  fs.mkdirSync(userUploadDir, { recursive: true });
}

const tempStorage = multer.memoryStorage();

const permanentStorage = (uploadDir) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  // defaults to temporary storage
const upload = (storageType=tempStorage) => {
  return multer({ storage: storageType });
};
module.exports = {
  upload,
  tempStorage,
  permanentStorage,
  doctorUploadDir,
  userUploadDir,
};
>>>>>>> recovery-branch
