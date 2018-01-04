const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load Blogs Model
require('../models/Blogs');
const Blogs = mongoose.model('blogs');

router.get('/', (req, res) => {
  Blogs
    .find()
    .sort({ date: 'desc' })
    .then((Blogs) => {
      res.json(Blogs);
    })
    .catch(error => {
      res.status(500).send(error)
    });
})

router.post('/', (req, res) => {

  const newPost = {
    title: req.body.title,
    details: req.body.details,
    date: req.body.date

  }
  Blogs(newPost)
    .save()
    .then(() => {
      Blogs
        .find()
        .sort({ date: 'desc' })
        .then((Blogs) => {
          res.json(Blogs);
        })
    })
    .catch((err) => {
      console.log('BLOG POST ERROR ' + err)
    })
})

router.post('/delete', (req, res) => {

  Blogs.remove({ _id: req.body.id })
    .then(() => {
      Blogs
        .find()
        .sort({ date: 'desc' })
        .then((Blogs) => {
          res.json(Blogs);
        })
    })
    .catch((err) => {
      console.log('DELETE BLOG ERROR' + err)
    })
})

router.put('/update', (req, res) => {
  Blogs.findOne({
    _id: req.body.id
  })
    .then(blog => {
      // new values
      blog.title = req.body.title;
      blog.details = req.body.details;

      blog.save()
        .then(blogs => {
          Blogs
            .find()
            .sort({ date: 'desc' })
            .then((Blogs) => {
              res.json(Blogs);
            })
        })
    })
});


module.exports = router;