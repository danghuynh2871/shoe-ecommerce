<template>
  <div class="product-management">
    <h2>QUẢN LÝ SẢN PHẨM</h2>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Tìm sản phẩm..." />
    </div>
    <div class="product-list">
      <table>
        <thead>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Kích cỡ</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>{{ product.id }}</td>
            <td>
              <img :src="product.image" :alt="product.name" class="product-img">
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.size }}</td>
            <td>{{ product.info }}</td>
            <td>
              <button class="btn edit" @click="editProduct(product)">Sửa</button>
              <button class="btn delete" @click="confirmDelete(product.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total-products">
      Tổng số lượng sản phẩm: {{ products.length }}
    </div>
    </div>

    <!-- Modal for confirmation -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
        <div class="modal-buttons">
          <button class="btn delete" @click="deleteProduct">Xóa</button>
          <button class="btn cancel" @click="closeModal">Không</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListProduct',
  data() {
    return {
      searchQuery: '',
      products: [],  // Initialize as empty array
      showModal: false,
      productIdToDelete: null
    }
  },
  created() {
    // Load initial products from data
    const initialProducts = [
      {
        id: 'SP001',
        image: require('@/assets/backgroundLogin.jpg'),
        name: 'Nike Air Max',
        price: '2,999,000đ',
        stock: 50,
        size: '39, 40, 41, 42',
        info: 'Giày thể thao cao cấp'
      },
      {
        id: 'SP002',
        image: 'https://i.pinimg.com/736x/ca/2b/b9/ca2bb9450ce313d89c251cc951acef83.jpg',
        name: 'Adidas Ultra Boost',
        price: '3,499,000đ',
        stock: 30,
        size: '38, 39, 40, 41',
        info: 'Giày chạy bộ hiệu suất cao'
      },
      {
        id: 'SP003',
        image: 'https://i.pinimg.com/236x/a7/63/57/a76357e27b5569bc912044195e83b8fe.jpg',
        name: 'Puma RS-X',
        price: '2,199,000đ',
        stock: 20,
        size: '40, 41, 42, 43',
        info: 'Giày thể thao phong cách'
      },
      {
        id: 'SP004',
        image: 'https://i.pinimg.com/236x/97/ac/8e/97ac8e79cd98adad83615b47c4db5053.jpg',
        name: 'Reebok Classic',
        price: '1,999,000đ',
        stock: 40,
        size: '39, 40, 41, 42',
        info: 'Giày cổ điển thời trang'
      },
      {
        id: 'SP005',
        image: 'https://i.pinimg.com/736x/b4/ff/d7/b4ffd7594717ad1002cd978befe74fb2.jpg',
        name: 'New Balance 574',
        price: '2,299,000đ',
        stock: 25,
        size: '38, 39, 40, 41',
        info: 'Giày thể thao đa năng'
      },
      {
        id: 'SP006',
        image: 'https://i.pinimg.com/236x/6a/91/31/6a9131e96ae3583679f308af4a4cfe95.jpg',
        name: 'Asics Gel-Kayano',
        price: '3,799,000đ',
        stock: 15,
        size: '40, 41, 42, 43',
        info: 'Giày chạy bộ chuyên nghiệp'
      },
      {
        id: 'SP007',
        image: 'https://i.pinimg.com/236x/f0/f5/39/f0f53985860e33188c1c855bb4f34408.jpg',
        name: 'Converse Chuck Taylor',
        price: '1,499,000đ',
        stock: 60,
        size: '39, 40, 41, 42',
        info: 'Giày thể thao cổ điển'
      },
      {
        id: 'SP008',
        image: 'https://i.pinimg.com/236x/45/38/46/45384695ce8b4dc6f621470e749c7a6b.jpg',
        name: 'Vans Old Skool',
        price: '1,799,000đ',
        stock: 45,
        size: '38, 39, 40, 41',
        info: 'Giày trượt ván phong cách'
      },
      {
        id: 'SP009',
        image: 'https://i.pinimg.com/236x/72/c6/05/72c60578c7fd168be6b7a3bd819e5da1.jpg',
        name: 'Fila Disruptor',
        price: '2,499,000đ',
        stock: 35,
        size: '40, 41, 42, 43',
        info: 'Giày thể thao hiện đại'
      },
      {
        id: 'SP010',
        image: 'https://i.pinimg.com/236x/92/0f/61/920f6105397f624446d52432f5057768.jpg',
        name: 'Nike Air Force 1',
        price: '3,299,000đ',
        stock: 55,
        size: '39, 40, 41, 42',
        info: 'Giày thể thao biểu tượng'
      }
    ]
    // Get products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    
    if (savedProducts && savedProducts.length > 0) {
      // If there are saved products in localStorage, use them
      this.products = savedProducts;
    } else {
      // If no saved products, use initial products and save them to localStorage
      this.products = initialProducts;
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        const query = this.searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.id.toLowerCase().includes(query)
        );
      });
    }
  },
  methods: {
    navigateToInsert() {
      this.$router.push('/admin/products/insert');
    },
    editProduct(product) {
      const priceNumber = product.price.replace(/[^\d]/g, '');
      
      this.$router.push({
        path: '/admin/products/edit',  // Changed from 'insert' to 'edit'
        query: {
          ...product,
          price: priceNumber
        }
      });
    },
    confirmDelete(productId) {
      this.productIdToDelete = productId;
      this.showModal = true;
    },
    deleteProduct() {
      // Remove from current products array
      this.products = this.products.filter(product => product.id !== this.productIdToDelete);
      
      // Update localStorage with current products array
      localStorage.setItem('products', JSON.stringify(this.products));
      
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
      this.productIdToDelete = null;
    }
  }
}
</script>

<style scoped>
.product-management {
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  text-align: right;
}

.search-bar input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 400px;
}

.actions {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.product-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

th, td {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}

th {
  background: #f8f9fa;
}

.btn {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn.edit {
  background: #3498db;
  color: white;
}

.btn.delete {
  background: #e74c3c;
  color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn.cancel {
  background: #95a5a6;
  color: white;
}

.total-products {
  margin-top: 20px;
  font-weight: bold;
  text-align: right;
}
</style>