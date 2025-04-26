<template>
  <header class="main-header">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <div class="header-container">
      <!-- Logo -->
      <div class="logo">
        <router-link to="/"><img :src="require('@/assets/Logo.jpg')" alt="Logo" /></router-link>
      </div>

      <!-- Thanh điều hướng -->
      <nav>
        <ul class="menu">
          <li><router-link to="/">TRANG CHỦ</router-link></li>
          <li><router-link to="/about">VỀ CHÚNG TÔI</router-link></li>
          <li><router-link to="/products">DANH SÁCH SẢN PHẨM</router-link></li>
          <li><router-link to="/contact">LIÊN HỆ</router-link></li>
        </ul>
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <div class="user-section">
          <div class="user-icon" @click="toggleUserMenu">
            <i v-if="!currentUser" class="fa-regular fa-user"></i>
            <div v-else class="user-avatar">{{ getFirstLetter }}</div>
            <span v-if="currentUser" class="username">{{ currentUser.fullname }}</span>
            <!-- User Dropdown Menu -->
            <div class="user-dropdown" :class="{ show: isUserMenuOpen }">
              <div v-if="!currentUser">
                <router-link to="/login">Đăng nhập</router-link>
                <router-link to="/register">Đăng ký</router-link>
              </div>
              <div v-else>
                <router-link to="/order-history">
                  <i class="fas fa-history"></i>
                  Lịch sử đơn hàng
                </router-link>
                <a href="#" @click.prevent="handleLogout">
                  <i class="fas fa-sign-out-alt"></i>
                  Đăng xuất
                </a>
              </div>
            </div>
          </div>
        </div>
        <router-link to="/cart" class="cart-icon">
          <i class="fa-solid fa-shopping-cart"></i>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { authStore } from '../store/auth';

export default {
  name: 'ComHeader',
  data() {
    return {
      isUserMenuOpen: false
    }
  },
  computed: {
    currentUser() {
      return authStore.user;
    },
    getFirstLetter() {
      if (this.currentUser && this.currentUser.fullname) {
        return this.currentUser.fullname.charAt(0).toUpperCase();
      }
      return '';
    }
  },
  methods: {
    toggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },
    handleLogout() {
      // Xóa thông tin user và token
      localStorage.removeItem('token');
      authStore.clearUser();
      this.isUserMenuOpen = false;
      
      // Chuyển hướng về trang chủ
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
  font-family: 'Arial', sans-serif;
}

/* Top Bar */
.top-bar {
  background-color: #f5f5f5;
  padding: 5px 20px;
  font-size: 12px;
  text-align: right;
}

.top-bar-links a {
  color: #333;
  text-decoration: none;
  margin: 0 8px;
  transition: color 0.3s ease;
}

.top-bar-links a:hover {
  color: #ff6f61;
}

.top-bar-links span {
  color: #999;
}

/* User Section */
.user-section {
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 5px 10px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.user-section:hover {
  background-color: rgba(243, 156, 18, 0.1);
}

.user-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.user-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(45deg, #f39c12, #e67e22);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.1);
}

.username {
  margin-left: 10px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px 0;
  min-width: 180px;
  z-index: 1000;
  margin-top: 10px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  visibility: hidden;
  pointer-events: none;
}

.user-dropdown.show {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  pointer-events: auto;
}

.user-dropdown a {
  display: block;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.user-dropdown a:hover {
  background-color: rgba(243, 156, 18, 0.1);
  color: #f39c12;
  padding-left: 25px;
}

.user-dropdown a i {
  margin-right: 8px;
  width: 20px;
  text-align: center;
}

/* Header Container */
.header-container {
  max-width: 1400px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin: 0 auto;
}

/* Logo */
.logo img {
  height: 50px;
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: scale(1.1);
}

/* Menu */
nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.menu {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.menu li a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;
  padding: 10px 15px;
  transition: color 0.3s ease;
}

.menu li a:hover {
  color: #ff6f61;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-icon,
.cart-icon {
  font-size: 20px;
  color: #333;
  cursor: pointer;
  position: relative;
}

.user-icon {
  position: relative;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header-actions {
    gap: 15px;
  }

  .user-icon,
  .cart-icon {
    font-size: 18px;
  }

  .username {
    display: none;
  }
  
  .user-section {
    padding: 5px;
  }
  
  .user-dropdown {
    right: -10px;
  }
}

@media (max-width: 992px) {
  .menu {
    display: none;
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    gap: 0;
  }

  .menu li a {
    padding: 15px 0;
    display: block;
    border-bottom: 1px solid #eee;
  }
}
</style>