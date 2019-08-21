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
  name: 'CRUD Mongo.db',
  author: 'Dimas',
  tags: ['angular', 'frontend'],
  isPublished: true
});

const result = await course.save();
console.log(result);
}

createCourse();


async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    .find({ author: 'Dimas', isPublished: true})
    .skip((pageNumber -1) * pageSize)
    .limit(pageSize)
    .sort({name: 1})
    .select({ name: 1, tags: 1});

  console.log(courses);
}

// getCourses();


// // Updating Document - Query First
// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;

//   course.isPublished = true;
//   course.author = 'Another Author';

//   const result = await course.save();
//   console.log(result);
// }
// updateCourse('5d5a3dbebf51661f18bd178d');


// // Updating Document - Update First
// async function updateCourse(id) {
//   const result = await Course.update({ _id: id }, {
//     $set: {
//       author: 'Karto Tuying',
//       isPublished: true,
//       name: 'Update Document Mongo.db'
//     }
//   });
//   console.log(result);
// }
// updateCourse('5d5a3d28ca820b17346404a2');

// // atau bisa dengan cara:
// async function updateCourse(id) {
//   const course = await Course.findByIdAndUpdate( id, {
//     $set: {
//       author: 'Sinyo',
//       isPublished: true,
//       name: 'Update Document'
//     }
//   }, { new: true });
//   console.log(course);
// }
// updateCourse('5d5a3dbebf51661f18bd178d');


// // Removing Document
// async function removeCourse(id) {
//   // const result = await Course.deleteOne({ _id: id }); // -> mengembalikan hasil yang di remove
//   const course = await Course.findByIdAndRemove(id); // -> mengembalikan semua value yang di remove
//   console.log(course);
// }
// removeCourse('5d5a3d28ca820b17346404a2');