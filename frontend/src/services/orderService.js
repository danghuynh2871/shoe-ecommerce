import api from './api';

export default {
  // Lấy lịch sử đơn hàng của người dùng
  getUserOrders() {
    return api.get('/orders/history');
  },

  // Lấy thông tin chi tiết của một đơn hàng
  getOrderDetails(orderId) {
    return api.get(`/orders/${orderId}`);
  },

  // Tạo đơn hàng mới từ giỏ hàng
  createOrder(orderData) {
    return api.post('/orders/create', orderData);
  },

  // Tạo đơn hàng từ các sản phẩm được chọn
  createSelectedItemsOrder(orderData) {
    return api.post('/orders/create-selected', orderData);
  },

  // ADMIN: Lấy tất cả đơn hàng (Admin)
  getAllOrders() {
    return api.get('/admin/orders');
  },

  // ADMIN: Lấy chi tiết đơn hàng theo ID (Admin)
  getOrderById(orderId) {
    return api.get(`/admin/orders/${orderId}`);
  },

  // ADMIN: Cập nhật trạng thái đơn hàng (Admin)
  updateOrderStatus(orderId, statusData) {
    return api.put(`/admin/orders/${orderId}/status`, statusData);
  }
}; 