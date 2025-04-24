<template>
  <div class="customer-list">
    <table>
      <thead>
        <tr>
          <th>Mã người dùng</th>
          <th>Họ và tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.fullName }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.numberPhone }}</td>
          <td>{{ customer.status }}</td>
          <td>
            <button class="btn view" @click="viewCustomer(customer)">Xem</button>
            <button class="btn block" @click="blockCustomer(customer.id)">Chặn</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="total-customers">
      Tổng số lượng người dùng: {{ customers.length }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListCustomer',
  data() {
    return {
      customers: [
        { id: '1', fullName: 'John Doe', email: 'john@example.com', numberPhone: '123-456-7890', status: 'Active' },
        { id: '2', fullName: 'Jane Smith', email: 'jane@example.com', numberPhone: '098-765-4321', status: 'Inactive' },
        { id: '3', fullName: 'Alice Johnson', email: 'alice@example.com', numberPhone: '234-567-8901', status: 'Active' },
        { id: '4', fullName: 'Bob Brown', email: 'bob@example.com', numberPhone: '345-678-9012', status: 'Inactive' },
        { id: '5', fullName: 'Charlie Davis', email: 'charlie@example.com', numberPhone: '456-789-0123', status: 'Active' },
        { id: '6', fullName: 'Diana Evans', email: 'diana@example.com', numberPhone: '567-890-1234', status: 'Inactive' },
        { id: '7', fullName: 'Edward Foster', email: 'edward@example.com', numberPhone: '678-901-2345', status: 'Active' },
        { id: '8', fullName: 'Fiona Green', email: 'fiona@example.com', numberPhone: '789-012-3456', status: 'Inactive' },
        { id: '9', fullName: 'George Harris', email: 'george@example.com', numberPhone: '890-123-4567', status: 'Active' },
        { id: '10', fullName: 'Hannah White', email: 'hannah@example.com', numberPhone: '901-234-5678', status: 'Inactive' }
      ]
    }
  },
  methods: {
    viewCustomer(customer) {
      console.log('Viewing customer:', customer);
    },
    blockCustomer(customerId) {
      console.log('Blocking customer with ID:', customerId);
    }
  }
}
</script>

<style scoped>
.customer-list {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
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

.btn.view {
  background: #3498db;
  color: white;
}

.btn.block {
  background: #e74c3c;
  color: white;
}

.total-customers {
  margin-top: 20px;
  font-weight: bold;
  text-align: right;
}
</style>