<template>
  <div class="admin-container">
    <div class="admin-sidebar">
      <h2>Admin Dashboard</h2>
      <nav class="nav-menu">
        <div class="menu-item">
          <router-link to="/admin/products" class="nav-item" @click="toggleProductSubMenu">
            Quản lý sản phẩm
            <span class="arrow-icon">{{ showProductSubMenu ? '▲' : '▼' }}</span>
          </router-link>
          <div class="sub-menu" v-if="showProductSubMenu">
            <router-link to="/admin/products/list" class="nav-item sub-item">Danh sách sản phẩm</router-link>
            <router-link to="/admin/products/insert" class="nav-item sub-item">Thêm sản phẩm</router-link>
          </div>
        </div>

        <div class="menu-item">
          <router-link to="/admin/customers" class="nav-item" @click="toggleCustomerSubMenu">
            Quản lý người dùng
            <span class="arrow-icon">{{ showCustomerSubMenu ? '▲' : '▼' }}</span>
          </router-link>
          <div class="sub-menu" v-if="showCustomerSubMenu">
            <router-link to="/admin/customers/list" class="nav-item sub-item">Danh sách người dùng</router-link>
          </div>
        </div>

        <div class="menu-item">
          <router-link to="/admin/orders" class="nav-item" @click="toggleOrderSubMenu">
            Quản lý đơn hàng
            <span class="arrow-icon">{{ showOrderSubMenu ? '▲' : '▼' }}</span>
          </router-link>
          <div class="sub-menu" v-if="showOrderSubMenu">
            <router-link to="/admin/orders/list" class="nav-item sub-item">Lịch sử đơn hàng</router-link>
          </div>
        </div>

      </nav>
    </div>
    <div class="admin-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComAdmin',
  data() {
    return {
      showProductSubMenu: false,
      showCustomerSubMenu: false,
      showOrderSubMenu: false
    }
  },
  methods: {
    toggleProductSubMenu() {
      this.showProductSubMenu = !this.showProductSubMenu;
    },
    toggleCustomerSubMenu() {
      this.showCustomerSubMenu = !this.showCustomerSubMenu;
    },
    toggleOrderSubMenu() {
      this.showOrderSubMenu = !this.showOrderSubMenu;
    }
  }
}
</script>

<style scoped>
.admin-container {
  margin-bottom: 70px; /* Footer height */
  width: 100%;
}

.admin-sidebar {
  width: 300px;
  background: #2c3e50;
  color: white;
  min-height: calc(100vh - 100px); /* Adjust for header (70px) and footer (70px) */
  position: fixed;
}

.admin-content {
  flex: 1;
  padding: 20px;
  background: #f5f6fa;
  margin-left: 300px;
  min-height: calc(100vh - 140px); /* Adjust for header and footer */
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu-item {
  position: relative;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;
}

.nav-item:hover {
  background: #34495e;
}

.arrow-icon {
  margin-left: 10px;
  cursor: pointer;
}

.sub-menu {
  margin-left: 20px; /* Indentation for child items */
}

.sub-item {
  padding-left: 35px; /* Additional padding for child items */
}
</style>
