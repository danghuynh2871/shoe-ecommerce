<template>
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