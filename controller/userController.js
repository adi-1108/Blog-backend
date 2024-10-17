const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register the User
// POST /api/user/register
// access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.statusCode(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already exsists");
  }

  //Creating Hashpassword
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password is : ", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User Data is not valid");
  }
});

// @desc Login the User
// POST /api/user/login
// access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });

  // jwt.sign(payload, secretKey, options)
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      //PAYLOAD
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      //SECRETKEY
      process.env.ACCESS_TOKEN_SECRET,
      //OPTIONS
      {
        expiresIn: "30m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password not valid");
  }
});

// @desc Get the current user
// GET /api/user/current
// access private
const currentUser = asyncHandler((req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
