const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require('../middleware/auth')

// Import the router controller
const usersController = require("../controllers/usersController");

//Login user route
router.post(
  "/api/auth/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").exists(),
  ],
  usersController.loginUser
);


//Get logged in user
router.get('/api/auth', auth, usersController.getLoggedInUser)

module.exports = router;
