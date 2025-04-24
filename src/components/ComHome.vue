<template>
  <div class="home">
    <!-- Banner Section -->
    <div class="banner">
      <div class="banner-content">
        <h1>THE 2025</h1>
        <p>Worn by baby sea dragons</p>
        <button class="shop-now-btn">Mua sắm ngay</button>
      </div>
    </div>

    <!-- Featured Categories -->
    <section class="featured-categories">
      <h2 class="section-title">Danh Mục Nổi Bật</h2>
      <div class="category-grid">
        <div class="category-card">
          <img src="@/assets/view4.jpg" alt="">
          <h3>Nike</h3>
        </div>
        <div class="category-card">
          <img src="@/assets/balenciaga.jpg" alt="">
          <h3>Balenciaga</h3>
        </div>
        <div class="category-card">
          <img src="@/assets/balance.jpg" alt="">
          <h3>New Balance</h3>
        </div>
        <div class="category-card">
          <img src="@/assets/adidas.jpg" alt="">
          <h3>Adidas</h3>
        </div>
        <div class="category-card">
          <img src="@/assets/puma.jpg" alt="">
          <h3>Puma</h3>
        </div>
        <div class="category-card">
          <img src="@/assets/converse.jpg" alt="">
          <h3>Converse</h3>
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="new-arrivals">
      <h2 class="section-title">Sản phẩm mới</h2>
      <div class="product-grid">
        <div v-for="product in newProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name">
          <h3>{{ product.name }}</h3>
          <p class="price">{{ formatPrice(product.price) }}</p>
          <button class="add-to-cart-btn">Thêm vào giỏ</button>
        </div>
      </div>
    </section>

    <!-- Special Offers -->
    <!-- <section class="special-offers">
      <h2 class="section-title">Ưu đãi đặc biệt</h2>
      <div class="offer-banner">
        <h3>Giảm giá đến 50%</h3>
        <p>Cho tất cả các sản phẩm giày thể thao</p>
        <button class="view-offer-btn">Xem ngay</button>
      </div>
    </section> -->
    <!-- Membership Benefits -->
    <section class="membership-section">
      <h2 class="section-title">ĐƯỢC NHIỀU HƠN KHI<br>LÀ HỘI VIÊN ADICLUB</h2>
      <p class="membership-desc">
        Trải nghiệm sân nhà Arsenal, chuyến du lịch hè tới những vùng đất và 
        trải nghiệm mới, hay cơ hội thiết kế đôi sneaker độc nhất? Những tuần lễ 
        adiClub Days các mùa trước đã mang đến hàng loạt phần quà cực chất, 
        trải nghiệm độc quyền và khoảnh khắc khó quên cho thành viên trên toàn 
        thế giới. Mùa này hứa hẹn còn những điều hấp dẫn như thế, hãy chờ đón!
      </p>
      <div class="member-gallery">
        <div class="gallery-item">
          <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/viVN/Images/football-ss24-arsenal-home-launch-plp-tcc-d_tcm337-1046033.jpg" alt="Member 1">
        </div>
        <div class="gallery-item">
          <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/viVN/Images/originals-fw23-spezial-drop2-glp-m-tcc_tcm337-1043481.jpg" alt="Member 2">
        </div>
        <div class="gallery-item">
          <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/viVN/Images/running-ss24-ultraboost-light-3-running-global-launch-plp-tcc-d_tcm337-1047481.jpg" alt="Member 3">
        </div>
        <div class="gallery-item">
          <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/viVN/Images/football-ss24-x-crazyfast-launch-plp-tcc-d_tcm337-1047897.jpg" alt="Member 4">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ComHome',
  data() {
    return {
      newProducts: [
        {
          id: 1,
          name: 'Nike Air Max Sneaker',
          price: 2500000,
          image: 'https://i.pinimg.com/736x/ee/23/1f/ee231f19f4c09d7d3de5b6c869a385b6.jpg',
        },
        {
          id: 2,
          name: 'Adidas Boost Sneaker',
          price: 2200000,
          image: 'https://i.pinimg.com/736x/00/c4/49/00c4494c9121a7a7d72aecad9b1ad6d2.jpg',
        },
        {
          id: 3,
          name: 'Puma RS-X Sneaker',
          price: 1800000,
          image: 'https://i.pinimg.com/736x/32/03/45/3203456ed4fe2193c5d58d914145fe1f.jpg',
        },
        {
          id: 4,
          name: 'Nike Air Max 270 Sneaker',
          price: 2800000,
          image: 'https://i.pinimg.com/736x/0d/1c/79/0d1c79e6a70f69ef2eca559963072dab.jpg',
        }
      ]
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price)
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 100%;
  margin: 0 auto;   
}

.banner {
  height: 800px;
  background-image:url('@/assets/model1.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  color: white;
  text-align: center;
  margin-bottom: 40px;
}

.banner-content h1 {
  font-size: 3em;
  margin-left: 200px ;
  margin-bottom: 20px;
}
.banner-content p { 
    margin-left: 200px
}

.section-title {
  text-align: center;
  margin: 40px 0;
  font-size: 2em;
  color: #333;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.category-card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.category-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.product-card {
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
}

.price {
  color: #e44d26;
  font-weight: bold;
  margin: 10px 0;
}

.add-to-cart-btn, .shop-now-btn, .view-offer-btn {
  background-color: #e44d26;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.shop-now-btn{
  margin-left: 200px;
}

.add-to-cart-btn:hover, .shop-now-btn:hover, .view-offer-btn:hover {
  background-color: #c73e1d;
}

.special-offers {
  margin-bottom: 40px;
}

.offer-banner {
  background-color: #f8f8f8;
  padding: 40px;
  text-align: center;
  border-radius: 10px;
}
.membership-section {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
  text-align: center;
}

.membership-section h2 {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 30px;
  line-height: 1.2;
}

.membership-desc {
  max-width: 800px;
  margin: 0 auto 40px;
  font-size: 1.1em;
  line-height: 1.6;
  color: #333;
}

.member-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  aspect-ratio: 3/4;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .member-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .membership-section h2 {
    font-size: 2em;
  }
  
  .membership-desc {
    font-size: 1em;
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: 1fr;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .banner-content h1 {
    font-size: 2em;
  }
}
</style>