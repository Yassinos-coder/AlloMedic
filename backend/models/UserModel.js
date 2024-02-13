const db = require("mongoose");

const UserSchema = db.Schema({
  fullname: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  living_address: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  account_type: {
    type: String,
    required: true,
  },
  isPhoneVerified: {
    type: Boolean,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  uploaded_docs: {
    type: Array,
    required: false,
  },
  price_of_responder: {
    type: String,
    required: false,
  },
});

const UserModel = db.model("users", UserSchema);
module.exports = UserModel;
