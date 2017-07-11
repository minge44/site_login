// REQUIRE
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const data = require('./userData.js');


var app = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(expressValidator());


app.use(session({
  secret: 'ssshhh',
  resave: false,
  saveUninitialized: true
}));

function authenticate(req, username, password) {

   var authenticatedUser = data.users.find(function (user) {
    if (username === user.username && password === user.password) {
      return req.session.authenticated = true;

    } else {

      return req.session.autheticated = false;
      res.redirect('/login');
     }
   });
   console.log(req.session);
   return req.session;
}

app.get('/', function (req, res) {
      res.redirect('/login');
});

app.get('/login' ,function(req, res){
   res.render('login');
});


app.post('/login', function(req, res) {
      let username = req.body.username;
      let password = req.body.password;
      authenticate(req, username, password);
      if (req.session && req.session.authenticated) {
         res.render('index', {username : username})
      } else {
         res.redirect('/login');
      };
});

app.post('/go-to-signup', function(req, res) {
   res.redirect('/sign-up');
});

app.get('/sign-up', function(req, res){
   res.render('signUp')
});



app.listen(3000, function(){

});
