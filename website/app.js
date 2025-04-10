const express = require('express');
const session = require('express-session');
const twig = require('twig');
const path =require('path');

const app = express();
const port = 3000;

var pianoRouter = require('./src/routes/piano');
var userRouter = require('./src/routes/user');



//settings
app.set('views', path.join(__dirname, 'views'));        // Set 'views' directory for any views
app.set('view engine', 'twig');                         // Set view engine as Twig
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/styles', express.static(__dirname + '/public/stylesheets/style.css'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    }
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup router
app.use('/piano',pianoRouter);
app.use('/user',userRouter);



module.exports = app;