const express = require("express");
const router = express.Router();
const User = require("../models/User"); // User Model import
const bcrypt = require("bcryptjs"); // Password encryption
const jwt = require("jsonwebtoken"); // Token generation
const multer = require("multer"); // Image upload
const path = require("path");

// --- IMAGE UPLOAD CONFIGURATION ---
// Yeh batata hai ke images 'uploads' folder mein save hongi
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    // File ka naam unique rakhne ke liye timestamp add karte hain
    cb(null, "user-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// --- 1. REGISTER USER (Signup) ---
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check karo user pehle se to nahi hai
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Password ko encrypt (hash) karo
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Naya user banao
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.json({ msg: "User Registered Successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// --- 2. LOGIN USER (Yahan Correction ki hai) ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email check karo
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    // Password match karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });

    // Token generate karo
    const payload = { user: { id: user.id } };
    jwt.sign(payload, "secretKey", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;

      // --- FIX: Picture bhi bhej rahe hain ---
      // Is se frontend ko pata chalega ke photo kya hai
      res.json({
        token,
        userId: user.id,
        username: user.username,
        profilePic: user.profilePic,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// --- 3. GET USER DETAILS ---
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// --- 4. UPDATE PROFILE (Picture + DOB + Name) ---
// Note: 'upload.single' middleware image handle karta hai
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { username, email, dob } = req.body;

    let updateData = { username, email, dob };

    // Agar user ne nayi picture upload ki hai
    if (req.file) {
      // Poora URL bana kar database mein save karo
      updateData.profilePic = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    // Database mein update karo
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // Return updated user data
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
