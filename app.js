const express = require('express'),
      app = express(),
      bodyparser = require('body-parser'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      passportLocal = require('passport-local'),
      expressSession = require('express-session'),
      museum = require('./models/museum'),
      comment = require('./models/comment'),
      user = require('./models/user'),
      seedDB = require('./seed'),
      methodOverride = require('method-override');

const museumRouter = require('./routes/museums'),
      commentRouter = require('./routes/comments'),
      indexRouter = require('./routes/index');

app.use(express.static(__dirname+ '/public'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
mongoose.connect('mongodb://127.0.0.1/museums');

//Passport configuration
app.use(expressSession({
    secret: 'new york university',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    next();
});

//ROUTER configuration
app.use('/museums', museumRouter);
app.use('/museums/:id/comments', commentRouter);
app.use('/', indexRouter);


//Initialize the data 
seedDB();

app.listen(3000, ()=>{
    console.log('The server has started!');
});