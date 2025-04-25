<template>
  <div class="register-container">
    <div class="register-form">
      <h1>Đăng Kí Tài Khoản</h1>
      <p class="subtitle">Hãy đăng ký nếu bạn chưa có tài khoản.</p>
      <!-- hàm xử lý sự kiện submit của form -->
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="fullName">Họ Và Tên</label>
          <input type="text" id="fullName" v-model="fullName" placeholder="VD: Nguyễn Văn A" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="VD: vana@gmail.com" required>
        </div>
        <div class="form-group">
          <label for="password">Mật Khẩu</label>
          <input type="password" id="password" v-model="password" placeholder="Mật Khẩu phải từ 4 ký tự" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Xác Nhận Mật Khẩu</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Nhập lại mật khẩu" required>
        </div>
        <div class="form-group">
          <label for="phoneNumber">Số Điện Thoại</label>
          <input type="text" id="phoneNumber" v-model="phoneNumber" placeholder="VD: 0123456789" required>
        </div>
        <button type="submit" class="register-btn">Đăng Kí</button>
      </form>
      <p class="subtitle">Bạn đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComRegister', //tên của component
  data() { //chứa các thuộc tính của component
    return {
      fullName: '', //gán giá trị cho các thuộc tính
      email: '', 
      password: '',
      confirmPassword: '',
      phoneNumber: ''
    }
  },
  //methods là một đối tượng chứa các phương thức của component
  methods: { //chứa các phương thức của component
    handleRegister() { //hàm xử lý sự kiện submit của form
      if (this.password !== this.confirmPassword) { //kiểm tra mật khẩu nhập lại có khớp với mật khẩu đã nhập hay không
        alert('Mật khẩu nhập lại không khớp!');
        return;
      }
      
      // if (this.password.length < 4) {
      //   alert('Mật khẩu phải có ít nhất 4 ký tự!');
      //   return;
      // }

      console.log('Registration attempt:', {
        fullName: this.fullName, //gán giá trị cho các thuộc tính lấy từ form
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        phoneNumber: this.phoneNumber
      })
      this.$router.push('/login') //chuyển hướng đến trang login
    }
  }
}
</script>

<style scoped>
.register-container {
  min-height: 91vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/backgroundLogin.jpg');
  background-position: center;
  margin-top: 1px;
}

.register-form {
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 375px;
  text-align: center;
  margin: 20px 0;
}

h1 {
  color: white;
  margin-bottom: 10px;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
  text-align: left;
}

label {
  color: white;
  margin-bottom: 5px;
  display: block;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 85%;
  padding: 12px 40px 12px 15px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: white;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

input:focus {
  border-color: #00e6e6;
}

.register-btn {
  width: 100%;
  padding: 12px;
  background: #f39c12;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.register-btn:hover {
  background: #e67e22;
}

.subtitle {
  color: #ccc;
  margin-bottom: 30px;
}
</style>