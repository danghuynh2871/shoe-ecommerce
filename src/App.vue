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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
main {
  flex: 1; /* Phần main sẽ chiếm không gian còn lại của trang */
  padding: 20px; /* Khoảng đệm cho nội dung để dễ đọc hơn */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
