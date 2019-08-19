// CONNECT TO MONGODB
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


// SCHEMA
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});


// MODELS
const Course = mongoose.model('Course', courseSchema);
const course = new Course({
  name: 'Node.js Course',
  author: 'Dimas',
  tags: ['node', 'backend'],
  isPublished: true
});