const { Router } = require("express");
const OrdersModel = require("../models/OrdersModel");
const { verifyToken } = require("../utils/JwtAuth");

const OrdersRouter = Router();

// GetAllOrders from db
OrdersRouter.get("/api/orders/GetAllOrders", verifyToken, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});
    if (allOrders.length === 0) {
      return res.status(200).json({ success: true, error: "NO_ORDERS_FOUND" });
    }
    res.status(200).json({ success: true, orders: allOrders });
  } catch (err) {
    console.error("Error occurred during GetAllOrders:", err);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
});

// Create Order
OrdersRouter.post(
  "/api/orders/CreateOrder/:uuid",
  verifyToken,
  async (req, res) => {
    try {
      const orderData = req.body;
      const newOrder = new OrdersModel(orderData);
      const savedOrder = await newOrder.save();
      res.status(200).json({ success: true, order: savedOrder });
    } catch (err) {
      console.error("Error occurred during CreateOrder:", err);
      res
        .status(200)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

// Update order status
OrdersRouter.post(
  "/api/orders/UpdateOrderStatus/:orderId",
  verifyToken,
  async (req, res) => {
    try {
      const { status } = req.body;
      const orderId = req.params.orderId;
      if (!orderId) {
        return res
          .status(400)
          .json({ success: false, error: "MISSING_ORDER_ID" });
      }
      const orderExists = await OrdersModel.exists({ _id: orderId });
      if (!orderExists) {
        return res
          .status(404)
          .json({ success: false, error: "ORDER_NOT_FOUND" });
      }
      await OrdersModel.findByIdAndUpdate(orderId, { order_status: status });
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Error occurred during UpdateOrderStatus:", err);
      res.status(200).json({ success: false, error: "Internal server error" });
    }
  }
);

module.exports = OrdersRouter;
