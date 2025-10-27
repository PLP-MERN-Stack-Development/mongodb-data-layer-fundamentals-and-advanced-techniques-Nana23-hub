// Find all Fiction books
db.books.find({ genre: "Fiction" })

// Find all Dystopian bookss
db.books.find({ genre: "Dystopian" })

 //Find books by a specific author
javascript// Find all books by George Orwell
db.books.find({ author: "George Orwell" })

// Find all bookss by J.R.R. Tolkien
db.books.find({ author: "J.R.R. Tolkien" })

 //Update the price of a specific book
javascript// Update price of "1984" to 15.99
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 15.99 } }
)

// Update price of "The Hobbit" to 16.99
db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 16.99 } }
)
 //Delete a book by its title
javascript// Delete "Animal Farm"
db.books.deleteOne({ title: "Animal Farm" })

// Delete "Moby Dick"
db.books.deleteOne({ title: "Moby Dick" })


//Advanced Queries
// Books that are in stock AND published after 2010
db.books.find({ 
  in_stock: true, 
  published_year: { $gt: 2010 } 
})

// With multiple conditions, both must be true
db.books.find({ 
  in_stock: true, 
  published_year: { $gte: 1950 } 
})

//Projection - Return only title, author, and price
// Show only title, author, and price (hide _id)
db.books.find(
  {}, 
  { title: 1, author: 1, price: 1, _id: 0 }
)

// With a filter: Fiction books, show only title, author, price
db.books.find(
  { genre: "Fiction" },
  { title: 1, author: 1, price: 1, _id: 0 }
)

// In stock books after 1950, show only title, author, price
db.books.find(
  { in_stock: true, published_year: { $gt: 1950 } },
  { title: 1, author: 1, price: 1, _id: 0 }
)

// Sort by price ASCENDING (lowest to highest)
db.books.find().sort({ price: 1 })

// Sort by price DESCENDING (highest to lowest)
db.books.find().sort({ price: -1 })

// With projection: show title and price, sorted ascending
db.books.find(
  {},
  { title: 1, price: 1, _id: 0 }
).sort({ price: 1 })

// Fiction books sorted by price descending
db.books.find(
  { genre: "Fiction" },
  { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: -1 })

// PAGE 1: First 5 books
db.books.find().limit(5)

// PAGE 2: Skip first 5, show next 5
db.books.find().skip(5).limit(5)

// PAGE 3: Skip first 10, show next 5
db.books.find().skip(10).limit(5)

// Formula: skip = (page - 1) * pageSize
// Page 1: skip(0).limit(5)
// Page 2: skip(5).limit(5)
// Page 3: skip(10).limit(5)

db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      booksCount: { $sum: 1 }
    }
  },
  {
    $sort: { averagePrice: -1 }
  }
])

//Find the author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      booksCount: { $sum: 1 },
      books: { $push: "$title" }
    }
  },
  {
    $sort: { booksCount: -1 }
  },
  {
    $limit: 1
  }
])

//Group books by publication decade and count them
db.books.aggregate([
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
      booksCount: { $sum: 1 },
      books: { $push: { title: "$title", year: "$published_year" } }
    }
  },
  {
    $sort: { _id: 1 }
  },
  {
    $project: {
      decade: "$_id",
      booksCount: 1,
      books: 1,
      _id: 0
    }
  }
])

//Create an index on the title field
// Create single field index on title
db.books.createIndex({ title: 1 })

// Verify the index was created
db.books.getIndexes()


//Create a compound index on author and published_year
// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Verify all indexes
db.books.getIndexes()

//Use explain() to demonstrate performance improvement
//BEFORE creating indexes:
// Query by title WITHOUT index - use explain("executionStats")
db.books.find({ title: "1984" }).explain("executionStats")

// Query by author WITHOUT index
db.books.find({ author: "George Orwell" }).explain("executionStats")

// Compound query WITHOUT index
db.books.find({ 
  author: "J.R.R. Tolkien", 
  published_year: { $gte: 1950 } 
}).explain("executionStats")


//AFTER creating indexes:
// NOW create the indexes
db.books.createIndex({ title: 1 })
db.books.createIndex({ author: 1, published_year: 1 })

// Query by title WITH index
db.books.find({ title: "1984" }).explain("executionStats")

// Query by author WITH index (uses compound index)
db.books.find({ author: "George Orwell" }).explain("executionStats")

// Compound query WITH index
db.books.find({ 
  author: "J.R.R. Tolkien", 
  published_year: { $gte: 1950 } 
}).explain("executionStats")

