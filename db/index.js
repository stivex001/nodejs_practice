/**
 * 1. creating a connection function for mongodb
 * 2. Start a local mongodb server connection
 *
 */

const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;

// create a connection function first way
// const connectDB = () => {
//     mongoose.connect(MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     })
//     .then(() => {
//         console.log('MongoDB connected...')
//     })
//     .catch((err) => {
//         console.log(err.message);

//         // Exit with failure
//         process.exit(1);
//     })
// }

// Async mongoose connection second way
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected succesfully")
  } catch (err) {
    console.log(err.message);

    // Exit with failure
    process.exit(1);
  }
};

module.exports = connectDB