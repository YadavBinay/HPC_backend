const { Router } = require('express');
const {
  signup,
  login,
  userDetail,
  addChild,
  userDetails,
  allUsers,
  uploadProfilePic,
  getProfilePic,
} = require('../controllers/user');
const {
  checkForAuthenticationToken,
} = require('../middlewares/authentication');

const {
  upload,
  permanentStorage,
  userUploadDir,
} = require('../middlewares/imageUpload');

const router = Router();

router.post('/signup', signup); // add user or parent
router.post(
  '/image',
  upload(permanentStorage(userUploadDir)).single('profilePicture'),
  uploadProfilePic
);
router.post('/login', login);

router.get('/', checkForAuthenticationToken(), userDetails);

router.get('/allusers', allUsers);
router.post('/getprofilepic', getProfilePic);

module.exports = router;
