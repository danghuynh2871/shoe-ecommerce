const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Vui lòng nhập địa chỉ email hợp lệ",
      ],
    },
    password: {
      type: String,
      required: [true, "Mật khẩu không được để trống"],
      minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
    },
    fullname: {
      type: String,
      required: [true, "Họ và tên không được để trống"],
      trim: true,
      minlength: [2, "Họ và tên phải có ít nhất 2 ký tự"],
      maxlength: [50, "Họ và tên không được vượt quá 50 ký tự"],
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^(\+\d{1,3}[- ]?)?\d{10,12}$/,
        "Vui lòng nhập số điện thoại hợp lệ",
      ],
    },
    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "admin"],
        message: "Vai trò phải là 'user' hoặc 'admin'",
      },
    },
  },
  { timestamps: true }
);

// Mã hóa mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Phương thức kiểm tra mật khẩu
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
