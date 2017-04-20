const express = require('express');
const path = require('path');
const request = require('request-promise');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || '5000';
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose   = require('mongoose');
const session = require('express-session');
const User = require('./server/User.js')
let http = require('http').Server(app);
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var cors = require('cors');
mongoose.connect('localhost');
/***********************
** Facebook auth      **
***********************/
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new FacebookStrategy({
	    clientID: '247549532383578', 
	    clientSecret: 'c220282d22f9d48f49cf8842e07b19d0',
	    callbackURL: "http://localhost:5000/auth/facebook/callback",
        profileFields: ['email','devices','profileUrl','picture','gender']
  	},
  	function(accessToken, refreshToken, profile, done) {
    	User.find({username: profile.username}, function(err, user) {
            if (err) { 
                return done(err); 
            }
            console.log(profile);
            done(null, user);
        });
  	}
));
app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')));
app.use(session({ secret: "keyboard cat", cookie: { maxAge: new Date(Date.now() + 3600000) }, rolling: true,resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    next();
});
app.get('/auth/facebook',
    passport.authenticate('facebook',{ scope: ['email','public_profile','user_photos']})
);
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/Accounts/Messages',
                                      failureRedirect: '/Accounts/Login' }));
/*
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: 'http://localhost:5000/Accounts/Login' }),
    function(req, res) {
      console.log('Done');
      res.redirect('http://localhost:5000/Accounts/Messages');
  }
);/**/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Create HTTP server.
 */
//const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
http.listen(port, () => console.log(`API running on localhost:${port}`));