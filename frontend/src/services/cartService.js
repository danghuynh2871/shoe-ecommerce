import api from './api';

export default {
  // Lấy giỏ hàng của người dùng hiện tại
  getCart() {
    return api.get('/cart');
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart(cartItem) {
    return api.post('/cart/add', cartItem);
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateQuantity(productId, quantity) {
    return api.put('/cart/update', { productId, quantity });
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productId) {
    return api.delete(`/cart/remove/${productId}`);
  },

  // Xóa tất cả sản phẩm khỏi giỏ hàng
  clearCart() {
    return api.delete('/cart/clear');
  }
}; 