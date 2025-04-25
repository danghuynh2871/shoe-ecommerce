<template>
  <div class="order-detail">
    <div class="header">
      <h2>Chi tiết đơn hàng</h2>
      <button class="back-btn" @click="goBack">
        Quay lại
      </button>
    </div>

    <div v-if="loading" class="loading">
      Đang tải thông tin đơn hàng...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="order" class="order-info">
      <div class="order-header">
        <div class="order-id">
          <span class="label">Mã đơn hàng:</span>
          <span class="value">{{ order._id }}</span>
        </div>
        <div class="order-date">
          <span class="label">Ngày đặt:</span>
          <span class="value">{{ formatDate(order.createdAt) }}</span>
        </div>
        <div class="order-status">
          <span class="label">Trạng thái:</span>
          <span class="value status-badge" :class="order.status">
            {{ translateStatus(order.status) }}
          </span>
        </div>
      </div>

      <div class="order-content">
        <div class="customer-info">
          <h3>Thông tin khách hàng</h3>
          <div class="info-row">
            <span class="label">Tên:</span>
            <span class="value">{{ order.userId?.fullname || 'Không có thông tin' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value">{{ order.userId?.email || 'Không có thông tin' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Người nhận:</span>
            <span class="value">{{ order.receiverInfo?.fullname || 'Không có thông tin' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Số điện thoại:</span>
            <span class="value">{{ order.receiverInfo?.phone || 'Không có thông tin' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Địa chỉ:</span>
            <span class="value">{{ order.receiverInfo?.address || 'Không có thông tin' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Phương thức thanh toán:</span>
            <span class="value">{{ order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : order.paymentMethod }}</span>
          </div>
        </div>

        <div class="items-info">
          <h3>Sản phẩm đặt hàng</h3>
          <table class="items-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.items" :key="item._id">
                <td class="product-cell">
                  {{ item.name }}
                </td>
                <td>{{ formatPrice(item.price) }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ formatPrice(item.price * item.quantity) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="order-summary">
        <div class="summary-row">
          <span class="label">Tạm tính:</span>
          <span class="value">{{ formatPrice(order.subTotal) }}</span>
        </div>
        <div class="summary-row">
          <span class="label">VAT (10%):</span>
          <span class="value">{{ formatPrice(order.vat) }}</span>
        </div>
        <div class="summary-row total">
          <span class="label">Tổng cộng:</span>
          <span class="value">{{ formatPrice(order.totalAmount) }}</span>
        </div>
      </div>

      <div class="update-status">
        <h3>Cập nhật trạng thái đơn hàng</h3>
        <div class="status-form">
          <select v-model="newStatus">
            <option value="processing">Đang xử lý</option>
            <option value="delivered">Đã giao hàng</option>
            <option value="cancelled">Đã hủy</option>
          </select>
          <button 
            @click="updateOrderStatus" 
            class="update-btn"
            :disabled="newStatus === order.status"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderService from '../../../services/orderService';

export default {
  name: 'OrderDetail',
  data() {
    return {
      orderId: this.$route.params.id,
      order: null,
      loading: true,
      error: null,
      newStatus: ''
    }
  },
  created() {
    this.fetchOrderDetails();
  },
  methods: {
    async fetchOrderDetails() {
      this.loading = true;
      try {
        const response = await orderService.getOrderById(this.orderId);
        this.order = response.data.order;
        this.newStatus = this.order.status;
        this.loading = false;
      } catch (error) {
        this.error = "Không thể tải thông tin đơn hàng: " + (error.response?.data?.message || error.message);
        this.loading = false;
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    formatPrice(price) {
      if (!price) return '0 đ';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
    },
    translateStatus(status) {
      const statusMap = {
        'processing': 'Đang xử lý',
        'delivered': 'Đã giao hàng',
        'cancelled': 'Đã hủy'
      };
      return statusMap[status] || status;
    },
    async updateOrderStatus() {
      if (this.newStatus === this.order.status) {
        return;
      }
      
      try {
        await orderService.updateOrderStatus(this.orderId, { status: this.newStatus });
        this.order.status = this.newStatus;
        alert('Cập nhật trạng thái đơn hàng thành công!');
      } catch (error) {
        alert('Lỗi khi cập nhật trạng thái: ' + (error.response?.data?.message || error.message));
      }
    },
    goBack() {
      this.$router.push('/admin/orders');
    }
  }
}
</script>

<style scoped>
.order-detail {
  padding: 20px;
  background: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-btn {
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.loading, .error {
  text-align: center;
  padding: 40px 0;
}

.error {
  color: red;
}

.order-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 20px;
}

.order-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.customer-info, .items-info {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
}

.customer-info h3, .items-info h3 {
  margin-top: 0;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.info-row {
  margin-bottom: 10px;
  display: flex;
}

.label {
  font-weight: bold;
  min-width: 150px;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
}

.items-table th, .items-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.items-table th {
  font-weight: bold;
  background: #f9f9f9;
}

.product-cell {
  max-width: 300px;
}

.order-summary {
  padding: 15px;
  background: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-row.total {
  font-weight: bold;
  font-size: 1.1em;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

.update-status {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
}

.status-form {
  display: flex;
  gap: 15px;
}

.status-form select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 200px;
}

.update-btn {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.update-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9em;
}

.processing {
  background-color: #FFC107;
  color: #000;
}

.delivered {
  background-color: #4CAF50;
  color: white;
}

.cancelled {
  background-color: #F44336;
  color: white;
}

@media (max-width: 768px) {
  .order-content {
    grid-template-columns: 1fr;
  }
  
  .order-header {
    grid-template-columns: 1fr;
  }
}
</style> 