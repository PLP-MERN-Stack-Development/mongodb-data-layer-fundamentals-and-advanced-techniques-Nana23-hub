📚 MongoDB Books Database
A MongoDB database project demonstrating CRUD operations, advanced queries, aggregation pipelines, and indexing using a classic books collection.
📋 Table of Contents

About
Prerequisites
Setup & Installation
How to Run
Database Schema
Features & Tasks
Screenshots
Author

📖 About
This project showcases MongoDB operations through a books database containing 12 classic literature titles. It demonstrates fundamental database concepts including CRUD operations, complex queries, data aggregation, and performance optimization through indexing.
🔧 Prerequisites

MongoDB Atlas account (free tier) or MongoDB installed locally
MongoDB Shell (mongosh) - Download
MongoDB Compass (optional) - Download

🚀 Setup & Installation
1. Set Up MongoDB Atlas

Create a free account at MongoDB Atlas
Create a new cluster (M0 free tier)
Create a database user with username and password
Whitelist your IP address (Network Access)
Get your connection string

2. Connect to Database
bash# Connect using mongosh
mongosh "mongodb+srv://username:password@cluster.mongodb.net/"
3. Create Database and Collection
javascript// Switch to books database
use books

// Create collection
db.createCollection("book")
📝 How to Run
Insert Sample Data
javascriptdb.book.insertMany([
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
])
Verify Data Insertion
javascript// Count documents
db.book.countDocuments()
// Expected output: 12

// View all books
db.book.find()
📊 Database Schema
javascript{
  _id: ObjectId,              // Auto-generated
  title: String,              // Book title
  author: String,             // Author name
  genre: String,              // Book genre
  published_year: Number,     // Publication year
  price: Number,              // Price in USD
  in_stock: Boolean,          // Stock availability
  pages: Number,              // Number of pages
  publisher: String           // Publisher name
}
✨ Features & Tasks
Task 1: Database Setup

Created books database
Created book collection
Inserted 12 book documents

Task 2: CRUD Operations
Find all books in a specific genre:
javascriptdb.book.find({ genre: "Fiction" })
Find books published after a certain year:
javascriptdb.book.find({ published_year: { $gt: 1950 } })
Find books by a specific author:
javascriptdb.book.find({ author: "George Orwell" })
Update the price of a specific book:
javascriptdb.book.updateOne(
  { title: "1984" },
  { $set: { price: 15.99 } }
)
Delete a book by its title:
javascriptdb.book.deleteOne({ title: "Animal Farm" })
Task 3: Advanced Queries
Find books in stock AND published after a certain year:
javascriptdb.book.find({ 
  in_stock: true, 
  published_year: { $gt: 1950 } 
})
Use projection to return only title, author, and price:
javascriptdb.book.find(
  { genre: "Fiction" },
  { title: 1, author: 1, price: 1, _id: 0 }
)
Sort books by price (ascending):
javascriptdb.book.find().sort({ price: 1 })
Sort books by price (descending):
javascriptdb.book.find().sort({ price: -1 })
Pagination - Page 1 (5 books per page):
javascriptdb.book.find().limit(5)
Pagination - Page 2:
javascriptdb.book.find().skip(5).limit(5)
Task 4: Aggregation Pipeline
Calculate average price by genre:
javascriptdb.book.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      bookCount: { $sum: 1 }
    }
  },
  { $sort: { averagePrice: -1 } }
])
Find author with the most books:
javascriptdb.book.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 },
      books: { $push: "$title" }
    }
  },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])
Group books by publication decade:
javascriptdb.book.aggregate([
  {
    $project: {
      title: 1,
      author: 1,
      published_year: 1,
      decade: {
        $subtract: [
          "$published_year",
          { $mod: ["$published_year", 10] }
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      bookCount: { $sum: 1 },
      books: { $push: { title: "$title", year: "$published_year" } }
    }
  },
  { $sort: { _id: 1 } }
])
Task 5: Indexing
Create index on title field:
javascriptdb.book.createIndex({ title: 1 })
Create compound index on author and published_year:
javascriptdb.book.createIndex({ author: 1, published_year: 1 })
View all indexes:
javascriptdb.book.getIndexes()
Test performance with explain():
javascript// Before index
db.book.find({ title: "1984" }).explain("executionStats")

// After creating index
db.book.createIndex({ title: 1 })
db.book.find({ title: "1984" }).explain("executionStats")
Performance comparison:

Without index: COLLSCAN (scans all documents)
With index: IXSCAN (uses index for faster lookup)

📸 Screenshots
MongoDB Compass - Collections View
Show Image
Books database showing the book collection with 12 documents
MongoDB Compass - Sample Data
Show Image
Sample book documents with all fields visible
MongoDB Atlas - Database View
Show Image
Books database in MongoDB Atlas cloud
👨‍💻 Author
Aishat Mikail

GitHub: @Nana23-hub
Email: aishatomolara2020@gmail.com.com

📄 License
This project is open source and available under the MIT License.
