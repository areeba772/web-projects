const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // User ka naam
  username: {
    type: String,
    required: true,
  },
  // User ki email (Unique honi chahiye)
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Password (Encrypt ho kar save hoga)
  password: {
    type: String,
    required: true,
  },
  // Profile Picture ka link/path (Default khali hoga)
  profilePic: {
    type: String,
    default: "",
  },
  // Date of Birth (String format mein store hogi e.g., "2000-01-01")
  dob: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", UserSchema);
