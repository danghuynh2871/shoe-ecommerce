const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.createOrder = asyncHandler(async (req, res) => {
  try {
    const { fullname, phone, address, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Giỏ hàng trống!"
      });
    }

    const order = await Order.create({
      userId: req.user._id,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity
      })),
      ...cart.cartSummary,
      receiverInfo: { fullname, phone, address },
      paymentMethod,
      status: "completed"
    });

    // Cập nhật số lượng sản phẩm trong kho
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: {
          stock: -item.quantity,
          sold: +item.quantity,
        },
      });
    }

    // Xóa giỏ hàng
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Đặt hàng thành công!",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi tạo đơn hàng: " + error.message,
    });
  }
});

// Lấy lịch sử đơn hàng
exports.getOrderHistory = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort(
      "-createdAt"
    );

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy lịch sử đơn hàng: " + error.message,
    });
  }
});
