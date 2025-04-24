<template>
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
</template>

<script>
export default {
    name: 'ComHeader',
};
</script>

<style scoped>
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
}
</style>