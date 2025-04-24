<template>
  <div class="products-container">
    <!-- Filter Sidebar -->
    <div class="filters-sidebar">
      <h3>Bộ lọc sản phẩm</h3>
      
      <!-- Tìm kiếm theo tên -->
      <div class="filter-section">
        <h4>Tìm kiếm</h4>
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Tên sản phẩm..."
          >
          <i class="fas fa-search"></i>
        </div>
      </div>

      <!-- Lọc theo giá -->
      <div class="filter-section">
        <h4>Sắp xếp theo giá</h4>
        <select v-model="priceSort">
          <option value="">Mặc định</option>
          <option value="asc">Giá thấp đến cao</option>
          <option value="desc">Giá cao đến thấp</option>
        </select>
      </div>

      <!-- Lọc theo hãng -->
      <div class="filter-section">
        <h4>Thương hiệu</h4>
        <div class="brand-filters">
          <label v-for="brand in brands" :key="brand">
            <input 
              type="checkbox" 
              v-model="selectedBrands" 
              :value="brand"
            >
            {{ brand }}
          </label>
        </div>
      </div>

      <!-- Lọc theo kích cỡ -->
      <div class="filter-section">
        <h4>Kích cỡ</h4>
        <div class="size-filters">
          <button 
            v-for="size in sizes" 
            :key="size"
            :class="{ active: selectedSizes.includes(size) }"
            @click="toggleSize(size)"
          >
            {{ size }}
          </button>
        </div>
      </div>

      <!-- Lọc theo số lượng -->
      <div class="filter-section">
        <h4>Số lượng có sẵn</h4>
        <div class="quantity-filter">
          <input 
            type="number" 
            v-model="minQuantity" 
            placeholder="Tối thiểu"
          >
          <span>-</span>
          <input 
            type="number" 
            v-model="maxQuantity" 
            placeholder="Tối đa"
          >
        </div>
      </div>

      <button class="clear-filters" @click="clearFilters">
        Xóa bộ lọc
      </button>
    </div>

    <!-- Products Grid -->
    <div class="products-grid">
      <div class="products-header">
        <h2>Danh sách sản phẩm</h2>
        <p>Hiển thị {{ filteredProducts.length }} sản phẩm</p>
      </div>

      <div class="products-list">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name">
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="brand">{{ product.brand }}</p>
            <p class="price">{{ formatPrice(product.price) }}</p>
            <p class="stock">Còn {{ product.quantity }} sản phẩm</p>
            <button class="add-to-cart">Thêm vào giỏ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComListProduct',
  data() {
    return {
      searchQuery: '',
      priceSort: '',
      selectedBrands: [],
      selectedSizes: [],
      minQuantity: '',
      maxQuantity: '',
      brands: ['Nike', 'Adidas', 'Puma', 'New Balance', 'Converse'],
      sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
      products: [
        {
          id: 1,
          name: 'Nike Air Max',
          brand: 'Nike',
          price: 2500000,
          quantity: 10,
          sizes: [38, 39, 40, 41],
          image: 'https://example.com/nike-air-max.jpg'
        },
        // Thêm các sản phẩm khác vào đây
      ]
    }
  },
  computed: {
    filteredProducts() {
      let result = [...this.products]

      // Lọc theo tên
      if (this.searchQuery) {
        result = result.filter(product => 
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }

      // Lọc theo thương hiệu
      if (this.selectedBrands.length) {
        result = result.filter(product => 
          this.selectedBrands.includes(product.brand)
        )
      }

      // Lọc theo kích cỡ
      if (this.selectedSizes.length) {
        result = result.filter(product => 
          product.sizes.some(size => this.selectedSizes.includes(size))
        )
      }

      // Lọc theo số lượng
      if (this.minQuantity) {
        result = result.filter(product => 
          product.quantity >= Number(this.minQuantity)
        )
      }
      if (this.maxQuantity) {
        result = result.filter(product => 
          product.quantity <= Number(this.maxQuantity)
        )
      }

      // Sắp xếp theo giá
      if (this.priceSort) {
        result.sort((a, b) => {
          if (this.priceSort === 'asc') {
            return a.price - b.price
          } else {
            return b.price - a.price
          }
        })
      }

      return result
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price)
    },
    toggleSize(size) {
      const index = this.selectedSizes.indexOf(size)
      if (index === -1) {
        this.selectedSizes.push(size)
      } else {
        this.selectedSizes.splice(index, 1)
      }
    },
    clearFilters() {
      this.searchQuery = ''
      this.priceSort = ''
      this.selectedBrands = []
      this.selectedSizes = []
      this.minQuantity = ''
      this.maxQuantity = ''
    }
  }
}
</script>

<style scoped>
.products-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.filters-sidebar {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
}

.filter-section {
  margin-bottom: 25px;
}

.filter-section h4 {
  margin-bottom: 15px;
  color: #333;
}

.search-box {
  position: relative;
}

.search-box input {
  width: 100%;
  padding: 10px 0px 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.search-box i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
}

.brand-filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.brand-filters label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.size-filters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.size-filters button {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.size-filters button.active {
  background: #ff6f61;
  color: white;
  border-color: #ff6f61;
}

.quantity-filter {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-filter input {
  width: 100px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.clear-filters {
  width: 100%;
  padding: 10px;
  background: #f5f5f5;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.clear-filters:hover {
  background: #e0e0e0;
}

.products-grid {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.products-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.1em;
}

.brand {
  color: #666;
  margin-bottom: 5px;
}

.price {
  color: #ff6f61;
  font-weight: bold;
  margin-bottom: 5px;
}

.stock {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.add-to-cart {
  width: 100%;
  padding: 10px;
  background: #ff6f61;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-to-cart:hover {
  background: #e65d50;
}

@media (max-width: 768px) {
  .products-container {
    grid-template-columns: 1fr;
  }

  .size-filters {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>