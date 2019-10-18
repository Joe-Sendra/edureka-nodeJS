const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({  
  product: String,
  data: {
      size: String,
      color: String,
      description: String
  },
  price: String
});

module.exports = mongoose.model('Product', ProductSchema, 'products');