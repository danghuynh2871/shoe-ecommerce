const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

// @desc    Đăng nhập admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Tìm admin theo username
  const admin = await Admin.findOne({ username });

  // Kiểm tra admin và mật khẩu
  if (admin && (await admin.matchPassword(password))) {
    // Tạo JWT token
    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.json({
      success: true,
      data: {
        _id: admin._id,
        username: admin.username,
        role: admin.role,
        token,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Username hoặc mật khẩu không đúng",
    });
  }
});

// @desc    Lấy thông tin admin hiện tại
// @route   GET /api/admin/me
// @access  Private/Admin
const getCurrentAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user._id).select("-password");
  if (admin) {
    res.json({
      success: true,
      data: admin,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy thông tin admin",
    });
  }
});

module.exports = {
  loginAdmin,
  getCurrentAdmin,
};

