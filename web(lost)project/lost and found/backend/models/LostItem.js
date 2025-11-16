const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide item name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Please provide date'],
    default: Date.now
  },
  image: {
    type: String,
    default: ''
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reporterName: {
    type: String,
    required: true
  },
  reporterEmail: {
    type: String,
    default: ''
  },
  reporterPhone: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['lost', 'found'],
    default: 'lost'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LostItem', lostItemSchema);

