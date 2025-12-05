const express = require("express");
const router = express.Router();
const Entry = require("../models/Entry");
const multer = require("multer");
const path = require("path");

// Image Config
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, "diary-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// 1. GET ALL ENTRIES (Dashboard ke liye)
router.get("/:userId", async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.params.userId }).sort({
      date: -1,
    });
    res.json(entries);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// 2. GET SINGLE ENTRY (Edit karne ke liye data lane wala route)
router.get("/entry/:id", async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    res.json(entry);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// 3. CREATE ENTRY
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { userId, title, content, mood } = req.body;
    let imageUrl = "";
    if (req.file)
      imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const newEntry = new Entry({
      user: userId,
      title,
      content,
      mood,
      image: imageUrl,
    });
    const entry = await newEntry.save();
    res.json(entry);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// 4. UPDATE ENTRY (Yeh naya route hai Edit ke liye)
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, content, mood } = req.body;
    let updateData = { title, content, mood };

    // Agar nayi image ayi hai to update karo
    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedEntry);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// 5. DELETE ENTRY
router.delete("/delete/:id", async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
