const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CartSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

CartSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Cart', CartSchema, 'carts');