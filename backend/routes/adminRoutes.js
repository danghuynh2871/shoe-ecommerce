const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

// Route đăng nhập Admin
router.post("/login", adminController.loginAdmin);

// Route lấy thông tin Admin hiện tại (yêu cầu xác thực và phải là admin)
router.get("/me", authenticateToken, isAdmin, adminController.getCurrentAdmin);

module.exports = router;