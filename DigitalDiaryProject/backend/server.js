const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); // <-- Yeh zaroori hai

const app = express();

app.use(cors());
app.use(bodyParser.json());

// --- IMAGE FOLDER KO PUBLIC BANAO ---
// Is line ki wajah se browser images dekh payega
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect("mongodb://localhost:27017/digital-diary-db")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/entries", require("./routes/entries"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on Port ${PORT}`));
