const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrderHistory,
} = require("../controllers/orderController");

router.use(authenticateToken);

router.post("/create", createOrder);
router.get("/history", getOrderHistory);

module.exports = router;
