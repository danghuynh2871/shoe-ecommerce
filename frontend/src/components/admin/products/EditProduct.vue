<template>
  <div class="edit-product-container">
    <h2>Sửa sản phẩm</h2>
    <form @submit.prevent="submitProduct">
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
      productInfo: ''
    }
  },
  created() {
    const query = this.$route.query;
    if (query.id) {
      this.productId = query.id;
      this.productName = query.name;
      this.productPrice = query.price.replace(/[^\d]/g, '');
      this.productImagePreview = query.image;
      this.productStock = query.stock;
      this.productSize = query.size;
      this.productInfo = query.info;
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.productImage = file;
      this.productImagePreview = URL.createObjectURL(file);
    },
    submitProduct() {
      const formattedPrice = this.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ';
      
      const updatedProduct = {
        id: this.productId,
        name: this.productName,
        price: formattedPrice,
        image: this.productImagePreview || require('@/assets/backgroundLogin.jpg'),
        stock: parseInt(this.productStock),
        size: this.productSize,
        info: this.productInfo
      };

      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
      const index = existingProducts.findIndex(p => p.id === this.productId);
      
      if (index !== -1) {
        existingProducts[index] = updatedProduct;
        localStorage.setItem('products', JSON.stringify(existingProducts));
      }

      this.$router.push('/admin/products/list');
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
</style>