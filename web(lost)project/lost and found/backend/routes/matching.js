const express = require('express');
const router = express.Router();
const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');

// Get matching lost items for a found item
router.get('/lost/:name', async (req, res) => {
  try {
    const searchName = req.params.name.toLowerCase();
    const items = await LostItem.find({
      name: { $regex: searchName, $options: 'i' },
      status: 'lost'
    }).sort({ createdAt: -1 }).limit(10);
    
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get matching found items for a lost item
router.get('/found/:name', async (req, res) => {
  try {
    const searchName = req.params.name.toLowerCase();
    const items = await FoundItem.find({
      name: { $regex: searchName, $options: 'i' },
      status: 'found'
    }).sort({ createdAt: -1 }).limit(10);
    
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;

