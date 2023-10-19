const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, required: true }
})

// dueDate: { type: Date, required: true, default: Date.now },

module.exports = mongoose.model('Todo', todoSchema)