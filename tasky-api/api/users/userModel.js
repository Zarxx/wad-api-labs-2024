import mongoose from "mongoose";

const Schema = mongoose.Schema;

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const validatePassword = function (password) {
  return passwordRegex.test(password);
};

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: validatePassword,
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character.",
    },
  },
});

export default mongoose.model("User", UserSchema);
