const db = require("mongoose");

const OrdersSchema = db.Schema({
  responder: {
    type: db.Types.ObjectId,
    required: true,
  },
  price_of_responder: {
    type: String,
    required: true,
  },
  patient: {
    type: db.Types.ObjectId,
    required: true,
  },
  time_of_call: {
    type: String,
    required: true,
  },
  location_of_call: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

const OrdersModel = db.model("Orders", OrdersSchema);
module.exports = OrdersModel;
