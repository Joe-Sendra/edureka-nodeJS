var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var orderModel = new Schema({
    name:{type:String},
    address:{type:String},
    email:{type:String},
    itemSize:{type:String},
    itemQty:{type:Number},
    date:{type:Date, default:Date.now}
});

module.exports = mongoose.model('order', orderModel, 'orders');