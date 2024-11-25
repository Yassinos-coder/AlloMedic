const bcrypt = require('bcrypt');
const UserModel = require('../Schemas/UserModel');
const { tokenSigner, verifyToken } = require('../utils/jwt');
const { EncryptData } = require('../utils/dataCrypter');
const { SendEmail } = require('../utils/NodemailerConfig');
const { sendTextMessage } = require('../utils/TwilioConfig');
const saltRounds = 10;

exports.signup = async (req, res) => {
    try {
        let newUser = req.body
        console.log(newUser)
        const doesUserExist = await UserModel.findOne({ email: newUser.email })
        if (doesUserExist) {
            res.status(200).json({ message: 'USER_EXISTS' })
            return 'USER_EXISTS'
        }
        // To lowerCase
        newUser.email = newUser.email.toLowerCase();
        // Hashing password 
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedpassword = bcrypt.hashSync(newUser.password, salt)
        newUser.password = hashedpassword

        // Save user to db
        const SaveNewUser = new UserModel(newUser)
        const isSaved = await SaveNewUser.save()
        if (isSaved) {
            const { _id, email, fullname, role, is_verified_user } = isSaved;
            const token = await tokenSigner({ _id, email, fullname, role, is_verified_user });
            const encryptedResponse = EncryptData({
                userData: isSaved,
                tokenKey: token,
                message: 'USER_CREATED_SUCCESS'
            })
            res.status(200).json({ encryptedResponse })
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: err.message })
    }
}

exports.signin = async (req, res) => {
    try {
        let userCredentials = req.body;
        userCredentials.email = userCredentials.email.toLowerCase();
        const UserFromDB = await UserModel.findOne({ email: userCredentials.email });
        if (UserFromDB) {
            const result = bcrypt.compareSync(userCredentials.password, UserFromDB.password);
            if (result) {
                const { _id, email, fullname, role, is_verified_user } = UserFromDB;
                const token = await tokenSigner({ _id, email, fullname, role, is_verified_user });
                const encryptedResponse = EncryptData({
                    userData: { _id, email, fullname, role, is_verified_user },
                    tokenKey: token,
                    message: 'LOGIN_SUCCESS'
                });
                res.status(200).json({ encryptedResponse });
            } else {
                const encryptedResponse = EncryptData({
                    message: 'WRONG_PASSWORD'
                });
                res.status(200).json({ encryptedResponse });
            }
        } else {
            res.status(200).json({ message: 'USER_NOT_FOUND' });
        }
    } catch (err) {
        res.status(200).json({ message: err.message });
    }
};

exports.SendVerifyEmail = async (req, res) => {
    try {
        let _id = req.params.id
        const user = await UserModel.findOne({ _id: _id })
        const code = _id.slice(-6);
        SendEmail(user.email, code)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        let _id = req.params.id
        let VerificationCode = req.params.VerificationCode
        const code = _id.slice(-6);
        if (VerificationCode === code) {
            await UserModel.updateOne({ _id: _id }, { is_verified_user: true })
            res.status(200).json({ message: 'EMAIL_VERIFIED' })
        } else {
            res.status(500).json({ message: 'EMAIL_UNVERIFIED' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.SendVerifyPhone = async (req, res) => {
    try {
        let _id = req.params.id
        const user = await UserModel.findOne({ _id: _id })
        const code = _id.slice(-6);
        const message = `Here is your code to verify your phone number ${code}`
        sendTextMessage(user.phonenumber, message)
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
}

exports.VerifyPhone = async (req, res) => {
    try {
        let _id = req.params.id
        let VerificationCode = req.params.VerificationCode
        const code = _id.slice(-6);
        if (VerificationCode === code) {
            await UserModel.updateOne({ _id: _id }, { is_verified_user: true })
            res.status(200).json({ message: 'PHONENUMBER_VERIFIED' })
        } else {
            res.status(500).json({ message: 'PHONENUMBER_UNVERIFIED' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.UpdatePassword = async (req, res) => {
    try {
        let newPasswordData = req.body;
        const user = await UserModel.findOne({ _id: newPasswordData.uuid });
        if (!user || !user.is_verified_user) {
            return res.status(400).json({ message: 'ERROR_NOT_EXIST_OR_UNVERIFIED' });
        }

        const isOldPasswordCorrect = bcrypt.compareSync(newPasswordData.oldPassword, user.password);
        if (!isOldPasswordCorrect) {
            return res.status(400).json({ message: 'WRONG_OLD_PASSWORD' });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const newHashedPassword = bcrypt.hashSync(newPasswordData.newPassword, salt);
        const didUpdate = await UserModel.updateOne({ _id: newPasswordData.uuid }, { password: newHashedPassword });

        if (didUpdate.modifiedCount > 0) {
            return res.status(200).json({ message: 'UPDATE_SUCCESS' });
        } else {
            return res.status(500).json({ message: 'SOMETHING_WENT_WRONG' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.GetUserData = async (req, res) => {
    let uuid = req.params.uuid
    try {
        const checkIsUserExists = await UserModel.findOne({ _id: uuid })
        if (checkIsUserExists) {
            const { _id, email, fullname, role, is_verified_user } = checkIsUserExists;
            const encryptedResponse = EncryptData({
                userData: { _id, email, fullname, role, is_verified_user },
                message: 'FETCH_SUCCESS'
            });
            res.status(200).json({ encryptedResponse })
        } else {
            const encryptedResponse = EncryptData({
                message: 'FETCH_FAILED'
            });
            res.status(200).json({ encryptedResponse });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}