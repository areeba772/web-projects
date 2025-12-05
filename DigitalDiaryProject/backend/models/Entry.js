const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }, // Voice note ka text yahan ayega
  mood: { type: String, default: "😊" }, // Emoji yahan save hoga
  image: { type: String, default: "" }, // Image ka link/path
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Entry", EntrySchema);
