<<<<<<< HEAD
const { Router } = require('express');
const { signup, login, userDetail, addChild, userDetails, allUsers } = require("../controllers/user")

const router = Router();

router.post('/signup', signup); // add user or parent
router.post('/login', login);

router.get('/user', userDetail);
router.get("/", userDetails)
router.get("/allusers",allUsers)



module.exports = router;
=======
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

router.post("/signup", upload(permanentStorage(userUploadDir)), signup); // add user or parent
router.post("/login", login);
// router.post('')
router.get("/user", userDetail);
router.get("/", userDetails);
router.get("/allusers", allUsers);

module.exports = router;
>>>>>>> recovery-branch
