import api from './api';

export default {
  // Lấy tất cả sản phẩm
  getAllProducts() {
    return api.get('/products');
  },

  // Lấy sản phẩm theo ID
  getProductById(id) {
    if (!id) {
      return Promise.reject(new Error('ID sản phẩm không được để trống'));
    }
    console.log('Fetching product with ID:', id);
    return api.get(`/products/${id}`);
  },

  // Tạo sản phẩm mới
  createProduct(productData) {
    return api.post('/products', productData);
  },

  // Cập nhật sản phẩm
  updateProduct(id, productData) {
    return api.put(`/products/${id}`, productData);
  },

  // Xóa sản phẩm
  deleteProduct(id) {
    return api.delete(`/products/${id}`);
  }
}; 