const bcrypt = require('bcrypt');
const UserModel = require('../Schemas/UserModel');
const { tokenSigner, verifyToken } = require('../utils/jwt');
const { EncryptData } = require('../utils/dataCrypter');
const { SendEmail } = require('../utils/NodemailerConfig');
const { sendTextMessage } = require('../utils/TwilioConfig');
const saltRounds = 10;

exports.signup = async (req, res) => {
    try {
        let newUser = req.body;
        console.log(newUser);

        // Check if the user already exists
        const doesUserExist = await UserModel.findOne({ email: newUser.email });
        if (doesUserExist) {
            res.status(200).json({ message: 'USER_EXISTS' });
            return;
        }

        // Convert email to lowercase
        newUser.email = newUser.email.toLowerCase();

        // Hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hashedPassword;

        // Save the new user to the database
        const SaveNewUser = new UserModel(newUser);
        const isSaved = await SaveNewUser.save();

        if (isSaved) {
            // Remove password from the saved user document
            const userWithoutPassword = isSaved.toObject();
            delete userWithoutPassword.password;

            // Generate a token
            const token = await tokenSigner(userWithoutPassword);

            // Encrypt response
            const encryptedResponse = EncryptData({
                userData: userWithoutPassword,
                tokenKey: token,
                message: 'USER_CREATED_SUCCESS'
            });

            res.status(200).json({ encryptedResponse });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
};


exports.signin = async (req, res) => {
    try {
        let userCredentials = req.body;
        userCredentials.email = userCredentials.email.toLowerCase();
        const UserFromDB = await UserModel.findOne({ email: userCredentials.email });
        if (UserFromDB) {
            const result = bcrypt.compareSync(userCredentials.password, UserFromDB.password);
            if (result) {
                const userWithoutPassword = UserFromDB.toObject();
                delete userWithoutPassword.password;

                const token = await tokenSigner(userWithoutPassword);

                const encryptedResponse = EncryptData({
                    userData: userWithoutPassword,
                    tokenKey: token,
                    message: 'LOGIN_SUCCESS'
                });

                res.status(200).json({ encryptedResponse });
            } else {
                res.status(200).json({ message: 'WRONG_PASSWORD' });
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

exports.UpdateUserData = async (req, res) => {
    try {
        const dataToUpdate = req.params.DataToUpdate;
        const uuid = req.params.uuid;
        const newData = req.body;

        // Validate inputs
        if (!dataToUpdate || !uuid) {
            return res.status(400).json({ message: 'INVALID_INPUT' });
        }

        // Check if user exists
        const user = await UserModel.findOne({ _id: uuid });
        if (!user) {
            return res.status(404).json({ message: 'USER_NOT_FOUND' });
        }

        // Reusable function to update user
        const updateField = async (field, value) => {
            const update = await UserModel.updateOne({ _id: uuid }, { [field]: value });
            if (update.modifiedCount > 0) {
                return res.status(200).json({ message: 'UPDATE_SUCCESS' });
            } else {
                return res.status(500).json({ message: 'UPDATE_FAILED' });
            }
        };

        // Handle specific fields
        switch (dataToUpdate) {
            case 'email': {
                const newEmailLowerCase = newData.email.toLowerCase();
                return await updateField('email', newEmailLowerCase);
            }

            case 'HomeAdress':
                return await updateField('HomeAdress', newData.HomeAdress);

            case 'phonenumber':
                return await updateField('phonenumber', newData.phonenumber);

            case 'password':
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashedPassword = bcrypt.hashSync(newData.password, salt);
                return await updateField('password', hashedPassword);

            default:
                return res.status(400).json({ message: 'INVALID_FIELD' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
    }
};