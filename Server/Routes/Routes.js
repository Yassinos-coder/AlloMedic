const express = require('express');
const router = express.Router();
const {verifyToken} = require('../utils/jwt')
const {validateEmail, validateUser } = require('../Utils/userSanitizer');
const { signup, signin, SendVerifyEmail, verifyEmail, SendVerifyPhone, VerifyPhone, GetUserData, UpdateUserData } = require('../Controller/userController');
const { NewCall } = require('../Controller/callsController');


// User Routes to controllers
router.post('/signup', validateUser, signup);
router.post('/signin', validateEmail, signin);
router.post('/SendVerificationEmail/:id', SendVerifyEmail);
router.post('/verifyEmail/:id/:VerificationCode', verifyEmail);
router.post('/SendVerifyPhone/:id', SendVerifyPhone);
router.post('/VerifyPhone/:id/:VerificationCode', VerifyPhone);
router.get('/GetUserData/:uuid', verifyToken, GetUserData)
router.post('/UpdateUserData/:DataToUpdate/:uuid', verifyToken, UpdateUserData)

// ALL KINDS OF CALLS CONTROLLER
router.post('/NewCall', NewCall)
module.exports = router;