const express = require('express');
const auth = require('../middlewares/authentication')
const router = express.Router();
const { getMessagesBetweenUsers } = require('../controllers/messageController');

router.post('/getmessages', getMessagesBetweenUsers);

module.exports = router;
