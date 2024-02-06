const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { SendSMS } = require("../utils/Twilio"); // args => to, body
const { generateToken, verifyToken } = require("../utils/JwtAuth"); // args => uuid
const userRouter = Router();

const saltRounds = 10;

// PhoneNumber Verification Using Twilio See: utils/Twilio.js
userRouter.post("/api/users/verifyPhone/:uuid", async (req, res) => {
  let uuid = req.params.uuid;
  try {
    const userData = await UserModel.findOne({ _id: uuid });
    if (userData) {
      function generateSixDigitString() {
        return Math.floor(100000 + Math.random() * 900000).toString();
      }
      const randomSixDigitString = generateSixDigitString();

      const resultSendSMS = await SendSMS(
        userData.phoneNumber,
        `Votre code de vérification pour le numéro de téléphone est : ${randomSixDigitString}.`
      );
      if (resultSendSMS === true) {
        await UserModel.updateOne({ _id: uuid }, { isPhoneVerified: true });
        res.send({
          success: true,
          code: randomSixDigitString,
        });
      } else {
        res.send({
          success: false,
        });
      }
    } else {
      res.send({
        success: false,
        message: "USER_NO_EXIST",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      error: err,
    });
    throw err;
  }
});

// Email Verification Using NodeMailer See: utils/NodeMailer.js

// User SignUp
const validateSignup = [
  body("email").isEmail().withMessage("Invalid email address"),
  // Add other validation rules for other fields as needed
];

userRouter.post("/api/users/signup", validateSignup, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    let newUser = req.body;
    const doesUserExists = await UserModel.findOne({ email: newUser.email });
    if (!doesUserExists) {
      const hashedPassword = bcrypt.hashSync(newUser.password, saltRounds);
      newUser.password = hashedPassword;
      const saveNewUser = new UserModel(newUser);
      const isUserSaved = await saveNewUser.save();
      if (isUserSaved) {
        res.status(201).json({ success: true });
      } else {
        res.status(500).json({ success: false });
      }
    } else {
      res.status(409).json({ success: false, message: "USER_EXISTS" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// User Signin
userRouter.post("/api/users/signin", validateSignup, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    let loginData = req.body;
    const doesUserExists = await UserModel.findOne({ email: loginData.email });
    if (doesUserExists) {
      const passwordComparaison = bcrypt.compareSync(
        loginData.password,
        doesUserExists.password
      );
      if (passwordComparaison) {
        let newToken = generateToken(doesUserExists._id);
        // below converting doesUserExists to object and then removing password field
        const userObject = doesUserExists.toObject();
        delete userObject.password;
        res.status(200).json({ userData: userObject, token: newToken, success: true });
      } else {
        res.status(401).json({ success: false, message: "WRONG_PASS" });
      }
    } else {
      res.status(401).json({ success: false, message: "USER_NO_EXIST" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + err.message,
    });
    throw err;
  }
});

module.exports = userRouter;
