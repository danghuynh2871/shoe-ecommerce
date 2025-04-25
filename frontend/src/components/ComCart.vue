<template>
  <div class="cart-container">
    <div class="cart-header">
      <h1>Giỏ hàng của bạn</h1>
      <p v-if="cartItems.length === 0" class="empty-cart">
        Giỏ hàng trống. <router-link to="/sanpham">Tiếp tục mua sắm</router-link>
      </p>
    </div>

    <div v-if="cartItems.length > 0" class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="item.image" :alt="item.name">
          </div>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-size">Size: {{ item.size }}</p>
            <p class="item-price">{{ formatPrice(item.price) }}</p>
          </div>
          <div class="item-quantity">
            <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>
          <div class="item-total">
            {{ formatPrice(item.price * item.quantity) }}
          </div>
          <button class="remove-item" @click="removeItem(item)">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Tổng giỏ hàng</h2>
        <div class="summary-row">
          <span>Tạm tính:</span>
          <span>{{ formatPrice(subtotal) }}</span>
        </div>
        <div class="summary-row">
          <span>Phí vận chuyển:</span>
          <span>{{ formatPrice(shippingFee) }}</span>
        </div>
        <div class="summary-row total">
          <span>Tổng cộng:</span>
          <span>{{ formatPrice(total) }}</span>
        </div>
        <button class="checkout-btn" @click="checkout">
          Tiến hành thanh toán
        </button>
        <router-link to="/sanpham" class="continue-shopping">
          <i class="fas fa-arrow-left"></i> Tiếp tục mua sắm
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComCart',
  data() {
    return {
      cartItems: [
        {
          id: 1,
          name: 'Nike Air Max 270',
          price: 2990000,
          size: '42',   
          quantity: 1,
          image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7c2fff38-9f89-4e43-a845-f3bace545726/air-max-90-shoes-kRsBnD.png'
        },
        
        // Thêm các sản phẩm mẫu khác nếu cần
      ],
      shippingFee: 30000
    }
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    total() {
      return this.subtotal + this.shippingFee
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price)
    },
    increaseQuantity(item) {
      item.quantity++
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--
      }
    },
    removeItem(item) {
      this.cartItems = this.cartItems.filter(i => i.id !== item.id)
    },
    checkout() {
      // Xử lý thanh toán ở đây
      console.log('Proceeding to checkout...')
    }
  }
}
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.cart-header {
  margin-bottom: 30px;
  text-align: center;
}

.cart-header h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 10px;
}

.empty-cart {
  font-size: 1.2em;
  color: #666;
}

.empty-cart a {
  color: #ff6f61;
  text-decoration: none;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.cart-items {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 2fr 1fr 1fr auto;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.item-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details h3 {
  margin: 0 0 5px 0;
  font-size: 1.2em;
  color: #333;
}

.item-size {
  color: #666;
  margin: 5px 0;
}

.item-price {
  color: #ff6f61;
  font-weight: bold;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-quantity button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.item-quantity button:hover {
  background: #f5f5f5;
}

.item-quantity span {
  min-width: 30px;
  text-align: center;
}

.remove-item {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 5px;
  transition: color 0.3s ease;
}

.remove-item:hover {
  color: #ff6f61;
}

.cart-summary {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: fit-content;
}

.cart-summary h2 {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #666;
}

.summary-row.total {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  padding-top: 15px;
  border-top: 2px solid #eee;
  margin-top: 15px;
}

.checkout-btn {
  width: 100%;
  padding: 15px;
  background: #ff6f61;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 20px 0;
}

.checkout-btn:hover {
  background: #e65d50;
}

.continue-shopping {
  display: block;
  text-align: center;
  color: #666;
  text-decoration: none;
  margin-top: 15px;
}

.continue-shopping:hover {
  color: #ff6f61;
}

@media (max-width: 992px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 15px;
  }

  .item-quantity {
    justify-content: center;
  }

  .remove-item {
    margin: 10px auto;
  }
}

@media (max-width: 576px) {
  .cart-container {
    padding: 0 10px;
  }
  
  .cart-header h1 {
    font-size: 2em;
  }
}
</style>