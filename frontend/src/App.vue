<template>
  <div id="app">
    <!-- Header ở trên cùng -->
    <Header />

    <!-- Nội dung chính hiển thị thông qua router-view -->
    <main>
      <router-view />
    </main>

    <!-- Footer chỉ hiển thị nếu không phải trang admin -->
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<script>
// Import các thành phần Header và Footer
import Header from "./components/ComHeader.vue";
import Footer from "./components/ComFooter.vue";
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  setup() {
    const route = useRoute();
    const isAdminRoute = computed(() => route.path.startsWith('/admin'));
    return { isAdminRoute };
  }
};
</script>

<style>
/* Reset CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Main content */
main {
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 80px; /* Space for fixed header */
}

/* Responsive breakpoints */
@media (max-width: 1400px) {
  main {
    max-width: 1200px;
  }
}

@media (max-width: 1200px) {
  main {
    max-width: 992px;
    padding: 15px;
  }
}

@media (max-width: 992px) {
  main {
    max-width: 768px;
    padding: 12px;
  }
}

@media (max-width: 768px) {
  main {
    max-width: 576px;
    padding: 10px;
    margin-top: 70px;
  }
}

@media (max-width: 576px) {
  main {
    width: 100%;
    padding: 8px;
    margin-top: 60px;
  }
}

/* Common utility classes */
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.text-center {
  text-align: center;
}

.flex {
  display: flex;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

/* Common spacing */
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 1rem; }
.mt-4 { margin-top: 1.5rem; }
.mt-5 { margin-top: 2rem; }

.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-5 { margin-bottom: 2rem; }

.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 1rem; }
.p-4 { padding: 1.5rem; }
.p-5 { padding: 2rem; }

/* Common colors */
:root {
  --primary-color: #f39c12;
  --secondary-color: #e67e22;
  --text-color: #333;
  --light-text: #666;
  --background-color: #fff;
  --light-background: #f9f9f9;
  --border-color: #eee;
  --error-color: #e53935;
  --success-color: #43a047;
}

/* Common transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Common button styles */
.btn {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
}

/* Common form styles */
.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
}

/* Common card styles */
.card {
  background: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
}

/* Common grid system */
.grid {
  display: grid;
  gap: 1rem;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 992px) {
  .grid-4 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-3, .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}
</style>