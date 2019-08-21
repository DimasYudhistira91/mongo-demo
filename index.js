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
  // Pagination
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    .find({ author: 'Dimas', isPublished: true})

    // Logical Operators: OR, AND (fungsinya hampir sama dengan find)
    // .or([{author: 'Dimas'}, {isPublished: true}])
    // .and([])

    // Regular Expressions
    // find untuk mencari berdasarkan key dan value yg ada
    // Start with Dimas:
    .find({author: /^Dimas/ })

    // Ends with Yudhistira
    .find({author: /Yudhistira$/i })  // i = insensitif

    // Contains Dimas
    .find({author: /.*Dimas.*/i })
    
    // Pagination
    .skip((pageNumber -1) * pageSize)
    .limit(pageSize)

    // Untuk mensortir data, berdasarkan abjad, dll
    .sort({name: 1}) // 1 untuk a - z, -1 untuk z - a

    // untuk menyeleksi data apa saja yang akan diambil/ditampilkan
    .select({ name: 1, tags: 1});

  console.log(courses);
}

getCourses();