const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// Lấy giỏ hàng
exports.getCart = asyncHandler(async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId",
      "name price stock"
    );

    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        items: [],
        cartSummary: { subTotal: 0, vat: 0, totalAmount: 0 },
      });
    }

    res.status(200).json({
      success: true,
      cart: {
        ...cart.toObject(),
        vatRate: "10%",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy giỏ hàng: " + error.message,
    });
  }
});

exports.addToCart = asyncHandler(async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm!",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Số lượng sản phẩm trong kho không đủ!",
      });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        items: [{ productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    await cart.populate("items.productId", "name price stock");

    res.status(200).json({
      success: true,
      message: "Thêm vào giỏ hàng thành công!",
      cart: {
        ...cart.toObject(),
        vatRate: "10%",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi thêm vào giỏ hàng: " + error.message,
    });
  }
});

// Cập nhật giỏ hàng
exports.updateCart = asyncHandler(async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Số lượng không hợp lệ!",
      });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy giỏ hàng!",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Sản phẩm không có trong giỏ hàng!",
      });
    }

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.productId", "name price stock");

    res.status(200).json({
      success: true,
      message: "Cập nhật giỏ hàng thành công!",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật giỏ hàng: " + error.message,
    });
  }
});

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy giỏ hàng!",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Sản phẩm không có trong giỏ hàng!",
      });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    await cart.populate("items.productId", "name price stock");

    res.status(200).json({
      success: true,
      message: "Đã xóa sản phẩm khỏi giỏ hàng!",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng: " + error.message,
    });
  }
});

// Xóa toàn bộ giỏ hàng
exports.clearCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Đã xóa toàn bộ giỏ hàng!",
      cart: { items: [] },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa giỏ hàng: " + error.message,
    });
  }
});
