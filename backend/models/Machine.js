const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  sellPrice: { type: Number, default: 0 }, // Make sellPrice optional with default value
  purchaseDate: { type: Date, required: true },
  companyName: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['power tools', 'fan', 'light', 'pump and motors'] // Valid categories
  },
  product_code: { type: String, required: true }, // New field
  purchased_from: { type: String, required: true } // New field
});

module.exports = mongoose.model('Machine', machineSchema);
