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
// const course = new Course({
//   name: 'Node.js Course',
//   author: 'Dimas',
//   tags: ['node', 'backend'],
//   isPublished: true
// });


// Saving Document
async function createCourse() {
  const course = new Course({
  name: 'Angular Course',
  author: 'Dimas',
  tags: ['angular', 'frontend'],
  isPublished: true
});

const result = await course.save();
console.log(result);
}

// createCourse();


// Querying Documents
async function getCourses() {
  const courses = await Course
    .find({ author: 'Dimas', isPublished: true})
    .limit(10)
    .sort({name: 1})
    .select({ name: 1, tags: 1});

  console.log(courses);
}

getCourses();