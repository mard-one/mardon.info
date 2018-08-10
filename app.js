const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

const app = express();

// middleware
app.use(compression());
app.set('view engine', 'ejs');
app.set('view options', {rmWhitespace: true});
app.set('view cache', true);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get('/', function(req, res) {
  res.render('home');
});
app.get('/profile', function(req, res) {
  res.render('profile');
});
app.get('/resume', function(req, res) {
  res.render('resume');
});
app.get('/portfolio', function(req, res) {
  res.render('portfolio');
});
app.get('/contact', function(req, res) {
  res.render('contact');
});

app.post('/getintouch', function(req, res) {
  console.log(req.body);
  var mailOptions = {
    from: 'mardon.mashrabov2@gmail.com',
    to: 'mardon.mashrabov@gmail.com',
    html:
      " <h1> Message form Mardon.com </h1>\n    <br>\n    Sender's email: " +
      req.body.email +
      ' <br>\n    Message: ' +
      req.body.message +
      '<br>\n'
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      res.send({
        success: false,
        message: 'Something went wrong. Try again later'
      });
    } else {
      res.send({
        success: true,
        message:
          'Your email has successfully sent. I will contact you ASAP. Thank you!'
      });
    }
  });
});

app.listen(port, function(err) {
  if (err) {
    throw err;
  } else {
    console.log('Server started on http//localhost:', port);
  }
});
