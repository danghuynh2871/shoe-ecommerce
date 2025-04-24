const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

exports.getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Không thể tải sản phẩm",
    });
  }
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Không tìm thấy sản phẩm");
  }
  res.json(product);
});

exports.createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    image,

    type,
    brand,

    sizes,
    stock,
  } = req.body;

  if (!name || !price || stock === undefined) {
    res.status(400);
    throw new Error("Tên, giá và số lượng tồn là bắt buộc");
  }

  const newProduct = new Product({
    name,
    description,
    price,
    image,
    type,
    brand,
    sizes,
    stock,
    sold: 0,
  });

  await newProduct.save();
  res.status(201).json({
    message: "Sản phẩm được tạo thành công",
    product: newProduct,
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, image, type, brand, sizes, stock, sold } =
    req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      name,
      description,
      price,
      image,
      type,
      brand,
      sizes,
      stock,
      sold,
    },
    { new: true }
  );

  if (!updatedProduct) {
    res.status(404);
    throw new Error("Không tìm thấy sản phẩm");
  }

  res.json({
    message: "Sản phẩm được cập nhật thành công",
    product: updatedProduct,
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (!deletedProduct) {
    res.status(404);
    throw new Error("Không tìm thấy sản phẩm");
  }

  res.status(200).json({ message: "Sản phẩm đã được xóa thành công" });
});
