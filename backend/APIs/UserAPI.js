const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { SendSMS } = require("../utils/Twilio");
const { generateToken, verifyToken } = require("../utils/JwtAuth");
const userRouter = Router();
const multer = require("multer");
const path = require("path");

const saltRounds = 10;

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../uploads")); // Upload destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});

// PhoneNumber Verification Using Twilio
userRouter.post("/api/users/verifyPhone/:uuid", async (req, res) => {
  let uuid = req.params.uuid;
  try {
    const userData = await UserModel.findById(uuid);
    if (!userData) {
      return res
        .status(200)
        .json({ success: false, message: "USER_NOT_FOUND" });
    }

    function generateSixDigitString() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
    const randomSixDigitString = generateSixDigitString();

    const resultSendSMS = await SendSMS(
      userData.phoneNumber,
      `Votre code de vérification pour le numéro de téléphone est : ${randomSixDigitString}.`
    );
    if (resultSendSMS === true) {
      await UserModel.findByIdAndUpdate(uuid, { isPhoneVerified: true });
      res.status(200).json({
        success: true,
        code: randomSixDigitString,
      });
    } else {
      res.status(200).json({ success: false, message: "SMS_SENDING_FAILED" });
    }
  } catch (err) {
    console.error("Error occurred while verifying phone:", err);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
});

// User SignUp
const validateSignup = [
  body("email").isEmail().withMessage("Invalid email address"),
  // Add other validation rules for other fields as needed
];

userRouter.post(
  "/api/users/signup",
  upload.any(),
  validateSignup,
  async (req, res) => {
    const errors = validationResult(req.body.userData);
    if (!errors.isEmpty()) {
      return res.status(200).json({ success: false, errors: errors.array() });
    }
    try {
      const newUser = JSON.parse(req.body.userData);
      const doesUserExist = await UserModel.findOne({ email: newUser.email });
      if (doesUserExist) {
        return res
          .status(200)
          .json({ success: false, message: "USER_ALREADY_EXISTS" });
      }
      const hashedPassword = bcrypt.hashSync(newUser.password, saltRounds);
      newUser.password = hashedPassword;
      console.log(newUser);
      const saveNewUser = new UserModel(newUser);
      await saveNewUser.save();
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error occurred during signup:", error);
      res
        .status(200)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

// User Signin
userRouter.post("/api/users/signin", validateSignup, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ success: false, errors: errors.array() });
  }
  try {
    const loginData = req.body;
    const user = await UserModel.findOne({ email: loginData.email });
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "INVALID_CREDENTIALS" });
    }
    const passwordMatch = bcrypt.compareSync(loginData.password, user.password);
    if (!passwordMatch) {
      return res
        .status(200)
        .json({ success: false, message: "INVALID_CREDENTIALS" });
    }
    const token = generateToken(user._id);
    const userData = user.toObject();
    delete userData.password;
    res.status(200).json({
      userData,
      token,
      success: true,
      loginResult: passwordMatch,
    });
  } catch (error) {
    console.error("Error occurred during signin:", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
});

// GetUserData from db
userRouter.get(
  "/api/users/GetUserData/:uuid",
  verifyToken,
  async (req, res) => {
    try {
      const uuid = req.params.uuid;
      const user = await UserModel.findById(uuid);
      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "USER_NOT_FOUND" });
      }
      const userData = user.toObject();
      delete userData.password;
      res.status(200).json({ success: true, userData });
    } catch (error) {
      console.error("Error occurred while getting user data:", error);
      res
        .status(200)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

// Update Password
userRouter.post(
  "/api/users/updatePassword/:uuid",
  verifyToken,
  async (req, res) => {
    try {
      const uuid = req.params.uuid;
      const { oldpassword, newpassword } = req.body;
      const user = await UserModel.findById(uuid);
      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "USER_NOT_FOUND" });
      }
      const passwordMatch = bcrypt.compareSync(oldpassword, user.password);
      if (!passwordMatch) {
        return res
          .status(200)
          .json({ success: false, message: "INVALID_PASSWORD" });
      }
      const hashedPassword = bcrypt.hashSync(newpassword, saltRounds);
      await UserModel.findByIdAndUpdate(uuid, { password: hashedPassword });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error occurred while updating password:", error);
      res
        .status(200)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

// Email Update
userRouter.post(
  "/api/users/UpdateEmail/:uuid",
  verifyToken,
  validateSignup,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ success: false, errors: errors.array() });
    }
    try {
      const uuid = req.params.uuid;
      const { email } = req.body;
      const user = await UserModel.findById(uuid);
      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "USER_NOT_FOUND" });
      }
      const updateResponse = await UserModel.findByIdAndUpdate(uuid, { email });
      if (!updateResponse) {
        return res
          .status(200)
          .json({ success: false, message: "Email update failed" });
      }
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error occurred while updating email:", error);
      res
        .status(200)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

module.exports = userRouter;
