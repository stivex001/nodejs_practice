const express = require('express')
const app = express()
const port = 4000
// const MongoClient = require('mongodb').MongoClient

//connection string  mongodb://localhost:27017

app.use(express.json())


// SET UP MONGOOSE
const mongoose = require('mongoose')
const connectionString = "mongodb://localhost:27017/bookshop"

 mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Successfully connected to MongoDB")
    }
});


// CREATE SCHEMA
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    category: String,
    purchaseCount: Number,
    imageUrl: String,
    tags: Array
})
// CREATE A MODEL
const Book = mongoose.model('Book', bookSchema)

// Post request to /books to create a new book

app.post('/books', (req, res) => {
    // retrieve new books details from req.body
    const book = req.body.book
    // Create a new book and save to db
    Book.create({
        title: book.title,
        author: book.author,
        description: book.description,
        category: book.category,
        purchaseCount: book.purchaseCount,
        imageUrl: book.imageUrl,
        tags: book.tags
    }, (err, newBook) => {
        if(err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({message: "new book created", newBook})
        }
    })
})

// Get request to /books to fetch all  book

app.get('/books', (req, res) => {
    Book.find({}, (err, books) => {
    if (err) {
        return res.status(500).json({message: err})
    }else {
        return res.status(200).json({books})
    }
})
})

// Get request to /books/:id to fetch a single book

app.get('/books/:id', (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) {
            return res.status(500).json({message: err})
        }else if(!book) {
            return res.status(404).json({message: "Book not found"})
        }else {
            return res.status(200).json({book})
        }
    })
})

// put request to /books/:id to update a single  book

app.put('/books/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author
    }, (err, book) => {
        if(err) {
            return res.status(500).json({message: err})
        } else if (!book) {
            return res.status(404).json({message: "Book not found"})
        }
        else{
            book.save((err, saveBook) => {
                if (err) {
                    return res.status(400).json({message: err})
                }else {
                    return res.status(200).json({message: "book updated"})
                }
            })
        }
    })
})

// Delete request to /books/:id to delete a single book

app.delete('/books/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if(err) {
            return res.status(500).json({message: err})
        }
        else if(!book) {
            return res.status(404).json({message: "Book not found"})
        }
        else {
            return res.status(200).json({message: "Book deleted successfully"})
        }
    })
})


app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server running on port ${port}`)
})




// app.get('/books', (req, res) => {
//     client.connect((err, connectedClient) => {
//         if (err) return res.status(500).json({message: err})
//         const db = connectedClient.db('bookshop')
//         db.collection('books').find({}).toArray((err, book) => {
//             if(err) {
//                 return res.status(500).json({message: err})
//             }
//             return res.status(200).json({books: book})
//         })
//     })
// })

// app.post('/books', (req, res) => {
//     client.connect((err, connectedClient) => {
//         if (err) return res.status(500).json({message: err})
//         const db = connectedClient.db('bookshop')
//         db.collection('books').insertOne({
//             author: req.body.author,
//             title: req.body.title
//         }, (err, result) => {
//             if(err) return res.status(500).json({message: err})
//             return res.status(200).json({message: "new book has been added succesfully"})
//         })
//     })
// })

