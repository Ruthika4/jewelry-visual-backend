const mongoose = require('mongoose');

const jewelryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['rings', 'earrings', 'necklaces', 'bracelets', 'others'], // Add more as needed
    required: true
  },
  path: {
    type: String,
    required: true
  },
}, { timestamps: true });

const JewelryItem = mongoose.model('JewelryItem', jewelryItemSchema);

module.exports = JewelryItem;
