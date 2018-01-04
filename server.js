const users = require('./routes/users')
const blogs = require('./routes/blogs');

const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');



// set angular to use node port 8080 or env port.
const port = process.env.PORT || 8080;

const db = require('./config/database');
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect(db.uri, {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// set dist folder as our static folder
app.use(express.static(__dirname + '/dist'));

// Body parser middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/blogs', blogs); // use custom routes
app.use('/users', users); // use custom routes

app.get('/*', (req, res) => { // use angular router not sever router.
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})

//start server
app.listen(port, () => {
  console.log(`Server Online on port ${port}`)
})