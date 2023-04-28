const mongoose = require('mongoose');

const SavelaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  price: { type: Number, required: true},
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
    },
     amount: {
        type: Number,
        required: false
    }
});

module.exports = Savelater=mongoose.model('Savelater', SavelaterSchema);