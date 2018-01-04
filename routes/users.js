const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


require('../models/Users'); // require it
const User = mongoose.model('users'); // assign it to a local variable called User

router.get('/', (req, res) => {
  res.json('hello')
})

router.post('/register', (req, res) => {

  const newUser = new User({ // add new users to database
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.json(false)
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash; // set password to the hash password generated by bcrypt.
            newUser.save() // Save new user to the database with mongoose .save() function.
          })
        });
        res.json(true)
      }
    })
})


router.post("/login", (req, res) => {

  User.findOne({
    email: req.body.email // find email passed in
  })
  .then(user => {
    if (!user) { // if user not found with that email address
      res.json({success: false, message: 'no email found'});
    }

    // match passsword
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) { // if password matched return the user from the db
        
        const token = jwt.sign({ userId: user._id }, config.secret, {expiresIn: '24h'});

        res.json({success: true, message:'user found', token: token, user: { email: user.email}})
        // res.json(null, user);
      } else {
        res.json({success: false, message: 'Passwords do not match'})
       
      }
    }) 

  
});

});

router.use((req, res, next) => {
  const token = req.headers['authorization']; // Create token found in headers
  // Check if token was found in headers
  if (!token) {
    res.json({ success: false, message: 'No token provided' }); // Return error
  } else {
    // Verify the token is valid
    jwt.verify(token, config.secret, (err, decoded) => {
      // Check if error is expired or invalid
      if (err) {
        res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
      } else {
        req.decoded = decoded; // Create global variable to use in any request beyond
        next(); // Exit middleware
      }
    });
  }
});

router.get('/profile', (req, res) => {
  // Search for user in database
  User.findOne({ _id: req.decoded.userId }).select('name email ').exec((err, user) => {
    // Check if error connecting
    if (err) {
      res.json({ success: false, message: err }); // Return error
    } else {
      // Check if user was found in database
      if (!user) {
        res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
      } else {
        res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
      }
    }
  });
});

module.exports = router;