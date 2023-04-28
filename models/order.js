const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for orders collection
const orderSchema = new Schema({
      amount: { type: Number, required: false},
      name: { type: String, required: false },
      price: { type: Number, required: false },
      url: {type: String, required: false},
      id: {
        type: String,
        required:false
      },
      type: {
        type: String,
        required: false
      },
      gender: {
        type: String,
        required: false
      },
      brand: {
        type: String,
        required: false
      }
});

// Create model for orders collection using schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;