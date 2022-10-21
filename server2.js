const express = require('express');
const connectDB = require('./db');
require('dotenv').config(); // allows us to use the environmental variables in .env
const {  PORT } = process.env;
//or using process.env.PORT

//initailize express
const app = express()

// conect to db
connectDB();

//Initialize Express middleware
app.use(express.json({ extended: false}));

//Create a basic express route
app.get('/', (req, res) => {
    res.json({message: "Welcome to your nodejs app!!"});
})

//create a port
const port = process.env.PORT || PORT;

//Listen to connection
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
})