const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
<<<<<<< HEAD

=======
>>>>>>> e6045a86539bd40f86ef40f106a89543c0146aac
    fullname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    }
  },
  { timestamps: true }
<<<<<<< HEAD

=======
>>>>>>> e6045a86539bd40f86ef40f106a89543c0146aac
);

// Mã hóa mật khẩu trước khi lưu
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Tạo tài khoản admin mặc định
adminSchema.statics.createDefaultAdmin = async function () {
  try {
    const adminExists = await this.findOne({ email: "admin@gmail.com" });
    if (!adminExists) {
      await this.create({
        email: "admin@gmail.com",
        password: "Admin123",
        fullname: "Quản trị hệ thống",
      });
      console.log("Tạo tài khoản admin mặc định thành công!");
    }
  } catch (error) {
    console.error("Lỗi khi tạo admin:", error);
  }
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
<<<<<<< HEAD

=======
>>>>>>> e6045a86539bd40f86ef40f106a89543c0146aac
