var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bugModel = new Schema({
    title:{type:String},
    description:{type:String},
    assignee:{type:String},
    dateTime:{type:Date, default:Date.now}
});

module.exports = mongoose.model('bug', bugModel, 'bugs');