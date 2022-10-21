const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { SECRET } = process.env;


// / @route POST route and the uri = api/auth/login
//@desc     Auth user(student, tutor, admin) and get token
//@access   Public

exports.getLoggedInUser = async (req, res) => {
    try {
        // Get user from db
        const user = await User.findById(req.user.id).select("-password")

        // return user
        res.json({
            statusCode: 200,
            message: "User gotten successfully",
            user
        })
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
}

// @route POST route and the uri = api/auth/login
//@desc     Auth user(student, tutor, admin) and get token
//@access   Public

exports.loginUser = async (req, res) => {
  // check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }

  //else
  // destructure request body
  const { email, password } = req.body;

  try {
    // initialize user
    let user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ ststusCode: 400, message: "Invalid Credientials" });

    // else..
    //check the password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ statusCode: 400, message: "Invalid credientials" });

        // else
        // there is a match, send token
        // send payload and signed token

        const payload = {
            user: {
                id: user.id
            }
        };


        jwt.sign(
            payload,
            SECRET,
            {
                expiresIn: 360000,
            },
            (err, token) => {
                if(err) throw err;
                res.json({
                    statusCode: 200,
                    message: "Login Successful",
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastNamer,
                        email: user.email,
                        userRole: user.userRole,
                        isTutor: user.isTutor,
                        isAdmin: user.isAdmin
                    },
                    token
                })
            }
        )


  } catch (error) {
    console.log(error.message)

    res.status(500).send("server error")
  }
};
