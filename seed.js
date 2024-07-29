const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Author = require('./models/author');
const Book = require('./models/book');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const authors = [
  { name: 'Author 1' },
  { name: 'Author 2' },
  { name: 'Author 3' },
  { name: 'Author 4' },
  { name: 'Author 5' },
  { name: 'Author 6' },
  { name: 'Author 7' },
  { name: 'Author 8' },
  { name: 'Author 9' },
  { name: 'Author 10' },
];

const books = [
  { title: 'Book 1', author: 'Author 1', publicationYear: 2001, genre: 'Fiction' },
  { title: 'Book 2', author: 'Author 2', publicationYear: 2002, genre: 'Science' },
  { title: 'Book 3', author: 'Author 3', publicationYear: 2003, genre: 'Fantasy' },
  { title: 'Book 4', author: 'Author 4', publicationYear: 2004, genre: 'History' },
  { title: 'Book 5', author: 'Author 5', publicationYear: 2005, genre: 'Biography' },
  { title: 'Book 6', author: 'Author 6', publicationYear: 2006, genre: 'Adventure' },
  { title: 'Book 7', author: 'Author 7', publicationYear: 2007, genre: 'Mystery' },
  { title: 'Book 8', author: 'Author 8', publicationYear: 2008, genre: 'Horror' },
  { title: 'Book 9', author: 'Author 9', publicationYear: 2009, genre: 'Romance' },
  { title: 'Book 10', author: 'Author 10', publicationYear: 2010, genre: 'Thriller' },
];

const seedDatabase = async () => {
  try {
    console.log('Clearing existing data...');
    await Author.deleteMany({});
    await Book.deleteMany({});

    console.log('Inserting authors...');
    const createdAuthors = await Author.insertMany(authors);
    console.log('Authors inserted:', createdAuthors);

    const booksWithAuthorIds = books.map(book => {
      const author = createdAuthors.find(a => a.name === book.author);
      return {
        ...book,
        author: author._id
      };
    });

    console.log('Inserting books...');
    const createdBooks = await Book.insertMany(booksWithAuthorIds);
    console.log('Books inserted:', createdBooks);

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedDatabase();
