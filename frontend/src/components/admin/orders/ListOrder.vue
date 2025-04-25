<template>
  <div class="order-management">
    <h2>QUẢN LÝ ĐƠN HÀNG</h2>
    <div class="search-bar">
      
      <input type="text" v-model="searchQuery"  placeholder="Tìm kiếm đơn hàng..."  /><i class="fas fa-search"></i>
    </div>
    <div class="order-list">
      <table>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Tên người dùng</th>
            <th>Sản phẩm của khách hàng</th>
            <th>Tên sản phẩm</th>
            <th>Tổng số lượng</th>
            <th>Tổng giá</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td>{{ order.idOrder }}</td>
            <td>{{ order.customerName }}</td>
            <td>{{ order.customerProduct }}</td>
            <td>{{ order.productName }}</td>
            <td>{{ order.totalQuantity }}</td>
            <td>{{ order.totalPrice }}</td>
          </tr>
        </tbody>
      </table>
      <div class="total-orders">
        Tổng số đơn hàng: {{ orders.length }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListOrder',
  data() {
    return {
      searchQuery: '',
      orders: [
        {
          idOrder: 'ORD001',
          customerName: 'Nguyễn Văn A',
          customerProduct: 'Nike Air Max',
          productName: 'Nike Air Max 90',
          totalQuantity: 2,
          totalPrice: '5,998,000đ'
        },
        {
          idOrder: 'ORD002',
          customerName: 'Trần Thị B',
          customerProduct: 'Adidas Ultra Boost',
          productName: 'Adidas Ultra Boost 21',
          totalQuantity: 1,
          totalPrice: '3,499,000đ'
        },
        {
          idOrder: 'ORD003',
          customerName: 'Lê Văn C',
          customerProduct: 'Puma RS-X',
          productName: 'Puma RS-X Toys',
          totalQuantity: 3,
          totalPrice: '6,597,000đ'
        }
      ]
    }
  },
  computed: {
    filteredOrders() {
      return this.orders.filter(order => {
        const query = this.searchQuery.toLowerCase();
        return (
          order.idOrder.toLowerCase().includes(query) ||
          order.productName.toLowerCase().includes(query)
        );
      });
    }
  },
  methods: {
    viewOrder(order) {
      console.log('Viewing order:', order);
    },
    processOrder(orderId) {
      console.log('Processing order:', orderId);
    }
  }
}
</script>

<style scoped>
.order-management {
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  text-align: right;
}

.search-bar input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 400px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.product-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

th, td {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}

th {
  background: #f8f9fa;
}

.btn {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.total-orders {
  margin-top: 20px;
  font-weight: bold;
  text-align: right;
}
</style>