<template>
  <div class="product-form-container">
    <h2>{{ isEditMode ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới' }}</h2>
    
    <div v-if="loading" class="loading">
      Đang tải dữ liệu...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <form @submit.prevent="saveProduct" class="product-form" v-else>
      <!-- ID sản phẩm (chỉ hiển thị khi chỉnh sửa) -->
      <div class="form-group" v-if="isEditMode">
        <label>ID sản phẩm:</label>
        <input type="text" v-model="productId" disabled class="form-control">
      </div>
      
      <!-- Tên sản phẩm -->
      <div class="form-group">
        <label>Tên sản phẩm:</label>
        <input 
          type="text" 
          v-model="productData.name" 
          required 
          class="form-control"
          placeholder="Nhập tên sản phẩm"
        >
      </div>
      
      <!-- Giá sản phẩm -->
      <div class="form-group">
        <label>Giá (VNĐ):</label>
        <input 
          type="number" 
          v-model.number="productData.price" 
          required 
          min="0"
          class="form-control"
          placeholder="Nhập giá sản phẩm"
        >
      </div>
      
      <!-- Hình ảnh (URL) -->
      <div class="form-group">
        <label>Đường dẫn hình ảnh:</label>
        <input 
          type="url" 
          v-model="productData.image" 
          class="form-control"
          placeholder="Nhập URL hình ảnh sản phẩm"
        >
        <div class="image-preview" v-if="productData.image">
          <img :src="productData.image" alt="Xem trước hình ảnh">
        </div>
      </div>
      
      <!-- Loại sản phẩm -->
      <div class="form-group">
        <label>Kiểu dáng:</label>
        <input 
          type="text" 
          v-model="productData.type" 
          class="form-control"
          placeholder="Ví dụ: Giày Loafer, Giày Sneaker, ..."
        >
      </div>
      
      <!-- Thương hiệu -->
      <div class="form-group">
        <label>Thương hiệu:</label>
        <input 
          type="text" 
          v-model="productData.brand" 
          class="form-control"
          placeholder="Ví dụ: Nike, Adidas, ..."
        >
      </div>
      
      <!-- Kích cỡ -->
      <div class="form-group">
        <label>Kích cỡ (các số cách nhau bằng dấu phẩy):</label>
        <input 
          type="text" 
          v-model="sizesInput" 
          class="form-control"
          placeholder="Ví dụ: 38, 39, 40, 41, 42"
        >
        <div class="sizes-preview" v-if="parsedSizes.length > 0">
          <span class="size-tag" v-for="size in parsedSizes" :key="size">{{ size }}</span>
        </div>
      </div>
      
      <!-- Số lượng trong kho -->
      <div class="form-group">
        <label>Số lượng trong kho:</label>
        <input 
          type="number" 
          v-model.number="productData.stock" 
          required 
          min="0"
          class="form-control"
          placeholder="Nhập số lượng trong kho"
        >
      </div>
      
      <!-- Số lượng đã bán -->
      <div class="form-group" v-if="isEditMode">
        <label>Số lượng đã bán:</label>
        <input 
          type="number" 
          v-model.number="productData.sold" 
          min="0"
          class="form-control"
          placeholder="Nhập số lượng đã bán"
        >
      </div>
      
      <!-- Mô tả sản phẩm -->
      <div class="form-group">
        <label>Mô tả sản phẩm:</label>
        <textarea 
          v-model="productData.description" 
          class="form-control description-textarea"
          placeholder="Nhập mô tả sản phẩm"
        ></textarea>
      </div>
      
      <!-- Các nút -->
      <div class="form-actions">
        <button type="button" class="btn cancel-btn" @click="cancel">Hủy</button>
        <button type="submit" class="btn save-btn">
          {{ isEditMode ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import productService from '../../../services/productService';

export default {
  name: 'AdminProductForm',
  props: {
    editProductId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      productId: this.editProductId,
      productData: {
        name: '',
        description: '',
        price: 0,
        image: '',
        type: '',
        brand: '',
        stock: 0,
        sold: 0
      },
      sizesInput: ''
    };
  },
  computed: {
    isEditMode() {
      return !!this.productId;
    },
    parsedSizes() {
      if (!this.sizesInput) return [];
      return this.sizesInput.split(',')
        .map(size => size.trim())
        .filter(size => size !== '');
    }
  },
  created() {
    if (this.isEditMode) {
      this.fetchProductData();
    }
  },
  methods: {
    async fetchProductData() {
      this.loading = true;
      try {
        const response = await productService.getProductById(this.productId);
        const product = response.data.product;
        
        this.productData = {
          name: product.name,
          description: product.description || '',
          price: product.price,
          image: product.image || '',
          type: product.type || '',
          brand: product.brand || '',
          stock: product.stock,
          sold: product.sold || 0
        };
        
        // Convert sizes array to comma-separated string
        if (product.sizes && Array.isArray(product.sizes)) {
          this.sizesInput = product.sizes.join(', ');
        }
        
        this.loading = false;
      } catch (error) {
        this.error = "Không thể tải thông tin sản phẩm: " + (error.response?.data?.message || error.message);
        this.loading = false;
      }
    },
    async saveProduct() {
      try {
        const productToSave = {
          ...this.productData,
          sizes: this.parsedSizes
        };
        
        let response;
        if (this.isEditMode) {
          response = await productService.updateProduct(this.productId, productToSave);
          this.$emit('product-updated', response.data.product);
        } else {
          response = await productService.createProduct(productToSave);
          this.$emit('product-created', response.data.product);
        }
        
        this.$emit('close');
      } catch (error) {
        this.error = "Lỗi khi lưu sản phẩm: " + (error.response?.data?.message || error.message);
      }
    },
    cancel() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.product-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.description-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
}

.loading, .error {
  text-align: center;
  padding: 20px;
}

.error {
  color: #f44336;
}

.image-preview {
  margin-top: 10px;
  border: 1px solid #ddd;
  padding: 5px;
  max-width: 300px;
}

.image-preview img {
  width: 100%;
  height: auto;
}

.sizes-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.size-tag {
  background-color: #f1f1f1;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
}

@media (max-width: 768px) {
  .product-form-container {
    padding: 15px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style> 