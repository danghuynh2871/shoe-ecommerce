<template>
<<<<<<< HEAD
    <header class="header">
        <div class="header-container">
            <div class="logo">
                <router-link to="/">
                    <img :src="require('@/assets/logo.png')" alt="Logo" />
                </router-link>
            </div>
            
            <nav>
                <ul class="menu">
                    <li><router-link to="/" class="menu-item">Trang Chủ</router-link></li>
                    <li><router-link to="/products" class="menu-item">Danh Sách Sản Phẩm</router-link></li>
                    <li><router-link to="/about" class="menu-item">Về Chúng Tôi</router-link></li>
                    <li><router-link to="/news" class="menu-item">Tin Tức & Sự Kiện</router-link></li>
                    <li><router-link to="/contact" class="menu-item">Liên Hệ</router-link></li>
                </ul>
            </nav>

            <div class="auth-buttons">
                <router-link to="/login" class="auth-btn login">Đăng nhập</router-link>
                <router-link to="/register" class="auth-btn register">Đăng ký</router-link>
            </div>
        </div>
    </header>
=======
  <header class="main-header">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <div class="header-container">
      <!-- Logo -->
      <div class="logo">
        <router-link to="/"><img :src="require('@/assets/logo.png')" alt="Logo" /></router-link>
      </div>

      <!-- Thanh điều hướng -->
      <nav>
        <ul class="menu">
          <li><router-link to="/">TRANG CHỦ</router-link></li>
          <li><router-link to="/products">DANH SÁCH SẢN PHẨM</router-link></li>
          <li><router-link to="/about">VỀ CHÚNG TÔI</router-link></li>
          <li><router-link to="/contact">LIÊN HỆ</router-link></li>
        </ul>
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <!-- <div class="search-icon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div> -->
        <div class="user-icon" @click="toggleUserMenu">
          <i class="fa-regular fa-user"></i>
          <!-- User Dropdown Menu -->
          <div class="user-dropdown" v-show="isUserMenuOpen">
            <div v-if="!user">
              <router-link to="/login">Đăng nhập</router-link>
              <router-link to="/register">Đăng ký</router-link>
            </div>
            <div v-else>
              <span>{{ user.username }}</span>
              <a href="#" @click.prevent="logout">Đăng xuất</a>
            </div>
          </div>
        </div>
        <router-link to="/cart" class="cart-icon">
          <i class="fa-solid fa-shopping-cart"></i>
        </router-link>
      </div>
    </div>
  </header>
>>>>>>> origin/nhan
</template>

<script>
export default {
<<<<<<< HEAD
    name: 'ComHeader',
=======
  name: 'ComHeader',
  data() {
    return {
      isUserMenuOpen: false
    }
  },
  methods: {
    toggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    }
  }
>>>>>>> origin/nhan
};
</script>

<style scoped>
<<<<<<< HEAD
.header {
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo img {
    height: 40px;
    width: auto;
}

.menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 30px;
}

.menu-item {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 16px;
    transition: color 0.3s ease;
}

.menu-item:hover {
    color: #ff4d4d;
}

.auth-buttons {
    display: flex;
    gap: 15px;
}

.auth-btn {
    padding: 8px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
}

.login {
    color: #ff4d4d;
    border: 1px solid #ff4d4d;
}

.login:hover {
    background-color: #ff4d4d;
    color: white;
}

.register {
    background-color: #ff4d4d;
    color: white;
    border: 1px solid #ff4d4d;
}

.register:hover {
    background-color: #ff3333;
    border-color: #ff3333;
=======
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
}

.user-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  margin-right: 8px;
}

.user-icon img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.user-section span {
  margin: 0 8px;
  color: #333;
}

.user-section a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.user-section a:hover {
  color: #ff6f61;
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
  height: 40px;
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

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 10px;
  min-width: 150px;
  z-index: 1000;
}

.user-dropdown a {
  display: block;
  padding: 8px 15px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
}

.user-dropdown a:hover {
  background-color: #f5f5f5;
  color: #ff6f61;
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
>>>>>>> origin/nhan
}
</style>