const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Vui lòng nhập họ và tên!"],
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email!"],
      unique: [true, "Email đã tồn tại!"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email không hợp lệ!",
      ],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Vui lòng nhập số điện thoại!"],
      unique: [true, "Số điện thoại đã tồn tại!"],
      match: [/^[0-9]{10}$/, "Số điện thoại không hợp lệ!"],
    },
    password: {
      type: String,
      required: [true, "Vui lòng nhập mật khẩu!"],
      minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự!"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("User", userSchema);
