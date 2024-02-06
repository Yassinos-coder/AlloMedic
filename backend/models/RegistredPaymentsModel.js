const db = require('mongoose')

const RegistredPaymentsSchema = db.Schema({
    orderId : {
        type: db.Types.ObjectId,
        required: true
    },
    order_amount : {
        type: String,
        required: true,
    },
    order_date : {
        type: String,
        required: true
    },
    order_commission : {
        type: String,
        required: true
    },
})

const RegistredPaymentsModel = db.model('payments', RegistredPaymentsSchema)
module.exports = RegistredPaymentsModel