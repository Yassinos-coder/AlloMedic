const express = require('express');
const router = express.Router();
const {verifyToken} = require('../utils/jwt')
const {validateEmail, validateUser } = require('../Utils/userSanitizer');
const { signup, signin, SendVerifyEmail, verifyEmail } = require('../Controller/userController');


// User Routes to controllers
router.post('/signup', validateUser, signup);
router.post('/signin', validateEmail, signin);
router.post('/SendVerificationEmail/:id', SendVerifyEmail);
router.post('/verifyEmail/:id/:VerificationCode', verifyEmail);


module.exports = router;