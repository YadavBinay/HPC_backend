const { Router } = require('express');
const { signup, login, userDetail, addChild, userDetails, allUsers } = require("../controllers/user")
const { checkForAuthenticationToken } = require('../middlewares/authentication')
const router = Router();

router.post('/signup', signup); // add user or parent
router.post('/login', login);

router.get('/user', userDetail);
router.get("/", userDetails)
router.get("/allusers",allUsers)



module.exports = router;