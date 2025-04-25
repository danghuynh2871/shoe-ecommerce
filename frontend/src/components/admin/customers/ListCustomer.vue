<template>
  <h2>QUẢN LÝ NGƯỜI DÙNG</h2>
  <div class="customer-list">
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Tìm kiếm khách hàng..." />
    </div>
    <table>
      <thead>
        <tr>
          <th>Mã người dùng</th>
          <th>Họ và tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in filteredCustomers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.fullName }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.numberPhone }}</td>
          <td>
            <button class="btn delete" @click="confirmDelete(customer.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="total-customers">
      Tổng số lượng người dùng: {{ customers.length }}
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
        <div class="modal-buttons">
          <button class="btn delete" @click="deleteCustomer">Xóa</button>
          <button class="btn cancel" @click="closeModal">Không</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListCustomer',
  data() {
    return {
      customers: [],
      showModal: false,
      customerIdToDelete: null,
      searchQuery: ''
    }
  },
  computed: {
    filteredCustomers() {
      return this.customers.filter(customer => {
        const query = this.searchQuery.toLowerCase();
        return (
          customer.email.toLowerCase().includes(query) ||
          customer.numberPhone.includes(query)
        );
      });
    }
  },
  created() {
    const initialCustomers = [
      { id: '1', fullName: 'John Doe', email: 'john@example.com', numberPhone: '123-456-7890'},
      { id: '2', fullName: 'Jane Smith', email: 'jane@example.com', numberPhone: '098-765-4321'},
      { id: '3', fullName: 'Alice Johnson', email: 'alice@example.com', numberPhone: '234-567-8901'},
      { id: '4', fullName: 'Bob Brown', email: 'bob@example.com', numberPhone: '345-678-9012'},
      { id: '5', fullName: 'Charlie Davis', email: 'charlie@example.com', numberPhone: '456-789-0123'},
      { id: '6', fullName: 'Diana Evans', email: 'diana@example.com', numberPhone: '567-890-1234'},
      { id: '7', fullName: 'Edward Foster', email: 'edward@example.com', numberPhone: '678-901-2345'},
      { id: '8', fullName: 'Fiona Green', email: 'fiona@example.com', numberPhone: '789-012-3456'},
      { id: '9', fullName: 'George Harris', email: 'george@example.com', numberPhone: '890-123-4567'},
      { id: '10', fullName: 'Hannah White', email: 'hannah@example.com', numberPhone: '901-234-5678'}
    ]
    const savedCustomers = JSON.parse(localStorage.getItem('customers'));
    this.customers = savedCustomers || initialCustomers;
  },
  methods: {
    viewCustomer(customer) {
      console.log('Viewing customer:', customer);
    },
    confirmDelete(customerId) {
      this.customerIdToDelete = customerId;
      this.showModal = true;
    },
    deleteCustomer() {
      this.customers = this.customers.filter(customer => customer.id !== this.customerIdToDelete);
      localStorage.setItem('customers', JSON.stringify(this.customers));
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
      this.customerIdToDelete = null;
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
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background: #f8f9fa;
  text-align: center;
}

.btn {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn.block {
  background: #e74c3c;
  color: white;
}

.btn.delete {
  background: #e74c3c;
  color: white;
}

.btn.cancel {
  background: #95a5a6;
  color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.total-customers {
  margin-top: 20px;
  font-weight: bold;
  text-align: right;
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
</style>