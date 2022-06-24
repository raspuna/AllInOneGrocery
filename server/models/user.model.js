const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is requried"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be 6 characters or longer"],
    },
  },
  { timestamps: true }
);
// password confirmation
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));
UserSchema.pre("validate", function (next) {
  console.log(this);
  console.log(this.password, this.confirmPassword);
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});
// password encrytion
UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
