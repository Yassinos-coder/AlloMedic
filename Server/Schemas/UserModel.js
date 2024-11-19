const db = require('mongoose')

const UserSchema = db.Schema({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    is_verified_user: {
        type: Boolean,
        required: false,
        default: false
    },
    payment_method: {
        type: String,
        required: false,
        default: 'none'
    },
    create_at: {
        type: Date,
        required: false
    }

})

const UserModel = db.model('users', UserSchema)
module.exports = UserModel