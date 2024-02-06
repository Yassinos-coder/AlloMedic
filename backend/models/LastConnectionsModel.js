const db = require('mongoose')

const LastConnectionsSchema = db.Schema({
    uuid: {
        type : db.Types.ObjectId,
        required: true
    },
    uuid_ip: {
        type: String,
        required: true
    },
    device_info: {
        type: String,
        required: true
    }
})


const LastConnectionsModel = db.model('last_connections', LastConnectionsSchema)
module.exports = LastConnectionsModel