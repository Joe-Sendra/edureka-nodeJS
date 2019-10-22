const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({  
  name: {
    type: String,
    required: true,
    unique: true
  },
  text: {
    type: String,
    required: true
  }
});

const Task = mongoose.model('Task', TaskSchema, 'tasks');

module.exports = { Task };