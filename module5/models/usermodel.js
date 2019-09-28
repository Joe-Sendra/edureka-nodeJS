var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    name:{type:String},
    address:{type:String},
    email:{type:String}
});

module.exports = mongoose.model('user', userModel, 'users');