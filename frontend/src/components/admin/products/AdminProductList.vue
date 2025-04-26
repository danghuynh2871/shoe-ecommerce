<template>
  <div class="product-list-container">
    <div class="header">
      <h2>Quản lý sản phẩm</h2>
      <button class="add-btn" @click="showAddForm">
        <i class="fas fa-plus"></i> Thêm sản phẩm mới
      </button>
    </div>

    <div class="search-filter">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Tìm kiếm sản phẩm..."
        >
        <i class="fas fa-search"></i>
      </div>
      <div class="filter-dropdown">
        <select v-model="filterBrand">
          <option value="">Tất cả thương hiệu</option>
          <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading">
      Đang tải danh sách sản phẩm...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="filteredProducts.length === 0" class="no-products">
      Không tìm thấy sản phẩm nào
    </div>
    <div v-else class="product-table-wrapper">
      <table class="product-table">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Thương hiệu</th>
            <th>Số lượng còn</th>
            <th>Đã bán</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product._id">
            <td class="product-image">
              <img :src="product.image" :alt="product.name" v-if="product.image">
              <div class="no-image" v-else>No Image</div>
            </td>
            <td class="product-name">{{ product.name }}</td>
            <td>{{ formatPrice(product.price) }}</td>
            <td>{{ product.brand || 'N/A' }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.sold || 0 }}</td>
            <td class="actions">
              <button class="action-btn edit-btn" @click="editProduct(product)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="action-btn delete-btn" @click="confirmDelete(product)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal cho biểu mẫu thêm/sửa sản phẩm -->
    <div class="modal-overlay" v-if="showForm">
      <div class="modal-container">
        <button class="close-modal" @click="closeForm">×</button>
        <AdminProductForm 
          :edit-product-id="editProductId" 
          @close="closeForm"
          @product-created="productCreated"
          @product-updated="productUpdated"
        />
      </div>
    </div>

    <!-- Modal xác nhận xóa sản phẩm -->
    <div class="modal-overlay" v-if="showDeleteConfirm">
      <div class="delete-confirm-modal">
        <h3>Xác nhận xóa sản phẩm</h3>
        <p>Bạn có chắc chắn muốn xóa sản phẩm "{{ productToDelete?.name }}"?</p>
        <p class="warning">Lưu ý: Hành động này không thể hoàn tác!</p>
        <div class="confirm-actions">
          <button class="cancel-btn" @click="cancelDelete">Hủy</button>
          <button class="confirm-btn" @click="deleteProduct">Xác nhận xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productService from '../../../services/productService';
import AdminProductForm from './AdminProductForm.vue';

export default {
  name: 'AdminProductList',
  components: {
    AdminProductForm
  },
  data() {
    return {
      products: [],
      loading: true,
      error: null,
      searchQuery: '',
      filterBrand: '',
      showForm: false,
      editProductId: null,
      showDeleteConfirm: false,
      productToDelete: null,
      brands: []
    };
  },
  computed: {
    filteredProducts() {
      let result = [...this.products];
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(query) || 
          (product.description && product.description.toLowerCase().includes(query))
        );
      }
      
      // Filter by brand
      if (this.filterBrand) {
        result = result.filter(product => product.brand === this.filterBrand);
      }
      
      return result;
    }
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await productService.getAllProducts();
        this.products = response.data.products;
        
        // Extract unique brands
        this.extractBrands();
        
        this.loading = false;
      } catch (error) {
        this.error = "Không thể tải danh sách sản phẩm: " + (error.response?.data?.message || error.message);
        this.loading = false;
      }
    },
    extractBrands() {
      const brands = this.products
        .map(product => product.brand)
        .filter(brand => brand); // Remove null/undefined
      this.brands = [...new Set(brands)]; // Get unique brands
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
    },
    showAddForm() {
      this.editProductId = null;
      this.showForm = true;
    },
    editProduct(product) {
      this.editProductId = product._id;
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.editProductId = null;
    },
    productCreated(product) {
      this.products.unshift(product);
      this.extractBrands();
    },
    productUpdated(updatedProduct) {
      const index = this.products.findIndex(p => p._id === updatedProduct._id);
      if (index !== -1) {
        this.products.splice(index, 1, updatedProduct);
      }
      this.extractBrands();
    },
    confirmDelete(product) {
      this.productToDelete = product;
      this.showDeleteConfirm = true;
    },
    cancelDelete() {
      this.showDeleteConfirm = false;
      this.productToDelete = null;
    },
    async deleteProduct() {
      if (!this.productToDelete) return;
      
      try {
        await productService.deleteProduct(this.productToDelete._id);
        
        // Remove from local array
        const index = this.products.findIndex(p => p._id === this.productToDelete._id);
        if (index !== -1) {
          this.products.splice(index, 1);
        }
        
        this.showDeleteConfirm = false;
        this.productToDelete = null;
        this.extractBrands();
      } catch (error) {
        this.error = "Không thể xóa sản phẩm: " + (error.response?.data?.message || error.message);
      }
    }
  }
}
</script>

<style scoped>
.product-list-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-btn {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-filter {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.search-box {
  position: relative;
  flex-grow: 1;
}

.search-box input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.search-box i {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.filter-dropdown select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  min-width: 200px;
}

.loading, .error, .no-products {
  text-align: center;
  padding: 30px;
  font-size: 18px;
}

.error {
  color: #f44336;
}

.product-table-wrapper {
  overflow-x: auto;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-table th, .product-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.product-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.product-image {
  width: 80px;
}

.product-image img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.no-image {
  width: 60px;
  height: 60px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #999;
  font-size: 12px;
}

.product-name {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions {
  white-space: nowrap;
}

.action-btn {
  padding: 8px;
  border: none;
  border-radius: 4px;
  margin-right: 5px;
  cursor: pointer;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1;
}

.delete-confirm-modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
}

.delete-confirm-modal h3 {
  margin-top: 0;
  color: #f44336;
}

.warning {
  color: #f44336;
  font-weight: bold;
}

.confirm-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn, .confirm-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
}

.confirm-btn {
  background-color: #f44336;
  color: white;
}

@media (max-width: 768px) {
  .search-filter {
    flex-direction: column;
  }
  
  .filter-dropdown select {
    width: 100%;
  }
  
  .product-table th:nth-child(4),
  .product-table td:nth-child(4),
  .product-table th:nth-child(6),
  .product-table td:nth-child(6) {
    display: none;
  }
}
</style> 