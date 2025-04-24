const mongoose = require('mongoose');
const Admin = require('../models/adminModel');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const createAdminAccount = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI không được định nghĩa trong file .env');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Kết nối MongoDB thành công');
    
    // Kiểm tra admin đã tồn tại chưa
    const adminExists = await Admin.findOne({ username: 'admin' });
    
    if (adminExists) {
      console.log('Tài khoản admin đã tồn tại!');
    } else {
      // Tạo tài khoản admin mới
      await Admin.create({
        username: 'admin',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Tạo tài khoản admin thành công!');
    }
    
  } catch (error) {
    console.error('Lỗi:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

createAdminAccount();