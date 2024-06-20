const { Router } = require("express");
const {
  signup,
  login,
  userDetail,
  addChild,
  userDetails,
  allUsers,
} = require("../controllers/user");
const {
  checkForAuthenticationToken,
} = require("../middlewares/authentication");

const {
  upload,
  permanentStorage,
  userUploadDir,
} = require("../middlewares/imageUpload");

const router = Router();

router.post(
  "/signup",
  upload(permanentStorage(userUploadDir)).single("profilePicture"),
  signup
); // add user or parent

router.post("/login", login);


router.get("/",checkForAuthenticationToken, userDetails);

router.get("/allusers", allUsers);

module.exports = router;
