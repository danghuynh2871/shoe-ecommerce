const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// Tạo đơn hàng từ giỏ hàng
exports.createOrder = asyncHandler(async (req, res) => {
  try {
    const { fullname, phone, address, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Giỏ hàng trống!",
      });
    }

    const order = await Order.create({
      userId: req.user._id,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      })),
      subTotal: cart.cartSummary.subTotal,
      vat: cart.cartSummary.vat,
      totalAmount: cart.cartSummary.totalAmount,
      receiverInfo: { fullname, phone, address },
      paymentMethod,
      status: "processing",
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

// Tạo đơn hàng từ các sản phẩm được chọn trong giỏ hàng
exports.createSelectedItemsOrder = asyncHandler(async (req, res) => {
  try {
    const { fullname, phone, address, paymentMethod, selectedItems } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !selectedItems ||
      !Array.isArray(selectedItems) ||
      selectedItems.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng chọn ít nhất một sản phẩm để đặt hàng!",
      });
    }

    if (!fullname || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin người nhận!",
      });
    }

    // Lấy giỏ hàng của người dùng
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Giỏ hàng trống!",
      });
    }

    // Lọc các sản phẩm được chọn từ giỏ hàng
    const itemsToOrder = cart.items.filter((item) =>
      selectedItems.includes(item.productId._id.toString())
    );

    if (itemsToOrder.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy sản phẩm đã chọn trong giỏ hàng!",
      });
    }

    // Tính tổng tiền và VAT
    const subTotal = itemsToOrder.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );

    const VAT_RATE = 0.1; // 10%
    const vat = subTotal * VAT_RATE;
    const totalAmount = subTotal + vat;

    // Tạo đơn hàng mới với thông tin VAT
    const order = await Order.create({
      userId: req.user._id,
      items: itemsToOrder.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      })),
      subTotal: subTotal,
      vat: vat,
      totalAmount: totalAmount,
      receiverInfo: { fullname, phone, address },
      paymentMethod: paymentMethod || "COD",
      status: "processing",
    });

    // Cập nhật số lượng sản phẩm trong kho
    for (const item of itemsToOrder) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: {
          stock: -item.quantity,
          sold: +item.quantity,
        },
      });
    }

    // Xóa các sản phẩm đã đặt hàng khỏi giỏ hàng
    cart.items = cart.items.filter(
      (item) => !selectedItems.includes(item.productId._id.toString())
    );
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
