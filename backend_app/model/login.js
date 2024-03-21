const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Corrected 'require' to 'required'
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"], // Define enum values for the role field
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
