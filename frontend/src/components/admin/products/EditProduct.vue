<template>
  <div class="edit-product-container">
    <h2>Sửa sản phẩm</h2>
    
    <!-- Loading indicator -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>{{ loadingMessage }}</p>
    </div>
    
    <!-- Error message -->
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button v-if="productId" @click="fetchProduct" class="btn retry">Thử lại</button>
    </div>
    
    <form v-if="!loading && !error" @submit.prevent="submitProduct">
      <div class="form-group">
        <input type="text" id="productId" v-model="productId" placeholder="Mã sản phẩm" readonly required>
      </div>
      <div class="form-group">
        <input type="text" id="productName" v-model="productName" placeholder="Tên sản phẩm" required>
      </div>
      <div class="form-group">
        <input type="number" id="productPrice" v-model="productPrice" placeholder="Giá sản phẩm" required>
      </div>
      <div class="form-group">
        <input type="file" id="productImage" @change="handleImageUpload" accept="image/*">
        <img v-if="productImagePreview" :src="productImagePreview" alt="Product Image" class="product-img-preview">
      </div>
      <div class="form-group">
        <input type="number" id="productStock" v-model="productStock" placeholder="Số lượng" required>
      </div>
      <div class="form-group">
        <input type="text" id="productSize" v-model="productSize" placeholder="Kích thước" required>
      </div>
      <div class="form-group">
        <textarea id="productInfo" v-model="productInfo" placeholder="Mô tả" required></textarea>
      </div>
      <button type="submit">Cập nhật sản phẩm</button>
    </form>
  </div>
</template>

<script>
import productService from '@/services/productService';

export default {
  name: 'EditProduct',
  data() {
    return {
      productId: '',
      productName: '',
      productPrice: '',
      productImage: null,
      productImagePreview: null,
      productStock: '',
      productSize: '',
      productSizes: [],
      productInfo: '',
      loading: false,
      error: null,
      loadingMessage: 'Đang tải thông tin sản phẩm...'
    }
  },
  created() {
    const productId = this.$route.query.id;
    if (productId) {
      this.productId = productId;
      this.fetchProduct();
    } else {
      this.$router.push('/admin/products/list');
    }
  },
  methods: {
    async fetchProduct() {
      this.loading = true;
      this.error = null;
      this.loadingMessage = 'Đang tải thông tin sản phẩm...';
      
      try {
        const response = await productService.getProductById(this.productId);
        const product = response.data.product || response.data;
        console.log('Sản phẩm đang sửa:', product);
        
        this.productName = product.name;
        this.productPrice = product.price.toString();
        this.productImagePreview = product.image;
        this.productStock = product.stock;
        this.productSizes = product.sizes || [];
        this.productSize = product.sizes ? product.sizes.join(', ') : '';
        this.productInfo = product.description || product.info || '';
      } catch (error) {
        console.error('Error fetching product:', error);
        this.error = 'Không thể tải thông tin sản phẩm';
      } finally {
        this.loading = false;
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.productImage = file;
      this.productImagePreview = URL.createObjectURL(file);
    },
    async submitProduct() {
      this.loading = true;
      this.error = null;
      this.loadingMessage = 'Đang cập nhật sản phẩm...';
      
      try {
        // Xử lý sizes từ chuỗi sang mảng
        const sizesArray = this.productSize.split(',').map(size => size.trim());
        
        const productData = {
          name: this.productName,
          price: parseInt(this.productPrice),
          image: this.productImagePreview,
          stock: parseInt(this.productStock),
          sizes: sizesArray,
          description: this.productInfo
        };
        
        console.log('Dữ liệu cập nhật:', productData);
        await productService.updateProduct(this.productId, productData);
        this.$router.push('/admin/products/list');
      } catch (error) {
        console.error('Error updating product:', error);
        this.error = 'Không thể cập nhật sản phẩm';
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.edit-product-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus, textarea:focus {
  border-color: #3498db;
}

.product-img-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

button:hover {
  background: #2980b9;
}

.loading-container {
  text-align: center;
  padding: 20px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  text-align: center;
  padding: 20px;
  background: #ffdddd;
  border: 1px solid #ff9999;
  border-radius: 4px;
  margin-bottom: 20px;
}

.btn.retry {
  background: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: auto;
}
</style>