<template>
<<<<<<< HEAD
  <div class="login-container">
    <div class="login-form">
      <h1>Đăng nhập</h1>
      <p class="subtitle">Hãy đăng nhập để sử dụng đầy đủ tính năng nhé!!</p>
      
      <!-- hàm xử lý sự kiện submit của form -->
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input type="email" v-model="email" placeholder="Email" required>
        </div>

        <div class="form-group">
          <input type="password" v-model="password" placeholder="Mật khẩu" required>
        </div>

        <button type="submit" class="login-btn">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<script>
export default { //chứa các thuộc tính và phương thức của component
  name: 'ComLogin', //tên của component
  data() { //chứa các thuộc tính của component
    return { 
      email: '', //biến lưu trữ giá trị của ô input email
      password: '', //biến lưu trữ giá trị của ô input password
      rememberMe: true //biến lưu trữ giá trị của checkbox ghi nhớ đăng nhập
    }
  },

  
  methods: { //chứa hàm định nghĩa để xử lý dữ kiện hoặc logic
    handleLogin() { //phương thức để xử lý sự kiện đăng nhập
      console.log('Login attempt:', { 
        email: this.email, //lấy giá trị của biến email
        password: this.password, //lấy giá trị của biến password
        rememberMe: this.rememberMe //checkbox ghi nhớ đăng nhập
      })
    }
  }
}
</script>

<style scoped> 
.login-container {
  min-height: 91vh; 
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/backgroundLogin.jpg'); 
  background-position: center;
  margin-top: 1px;
}

.login-form {
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

.subtitle {
  color: #ccc;
  margin-bottom: 30px;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

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


.login-btn {
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

=======
    <div class="login-container">
      <div class="login-form">
        <h1>Đăng Nhập</h1>
        <p class="subtitle">Điền vào mẫu dưới đây để đăng nhập</p>
        
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <input type="text" v-model="username" placeholder="Tên đăng nhập" required>
          </div>
  
          <div class="form-group">
            <input type="password" v-model="password" placeholder="Mật khẩu" required>
          </div>
  
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe">
              <span>Nhớ tôi nhé</span>
            </label>
            <a href="Register" class="forgot-password">Quên mật khẩu</a>
          </div>
  
          <button type="submit" class="login-btn">Đăng nhập</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ComLogin',
    data() {
      return {
        username: '',
        password: '',
        rememberMe: false
      }
    },
    methods: {
      handleLogin() {
        console.log('Login attempt:', { 
          username: this.username, 
          password: this.password,
          rememberMe: this.rememberMe 
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/backgroundLogin.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin-top: 10px;
  }
  
  .login-form {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 120px;
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
    margin: 20px 0; /* Add some vertical margin */
  }
  
  h1 {
    color: white;
    margin-bottom: 10px;
  }
  
  .subtitle {
    color: #ccc;
    margin-bottom: 30px;
  }
  
  .form-group {
    position: relative;
    margin-bottom: 20px;
  }
  
  input[type="text"],
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
  
  .icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #00e6e6;
  }
  
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
    color: white;
    gap: 5px;
  }
  
  .forgot-password {
    color: #00e6e6;
    text-decoration: none;
  }
  
  .login-btn {
    width: 100%;
    padding: 12px;
    background: #00e6e6;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .login-btn:hover {background: #00b3b3;
}
>>>>>>> origin/nhan
</style>