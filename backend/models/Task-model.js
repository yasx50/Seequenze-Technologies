const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed','Expired'], default: 'To Do' },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
});

module.exports = mongoose.model('Task', taskSchema);
