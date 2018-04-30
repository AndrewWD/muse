const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      user = require('../models/user');

router.get('/', (req, res)=>{
    res.render('landing');
});

//NEW ROUTE for user
router.get('/register', (req, res)=>{
    res.render('register');
});

//CREATE ROUTE for user
router.post('/register', (req, res)=>{
    let newUser = new user({username: req.body.username}); 
    user.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, ()=>{
            req.flash('success', 'Welcome, ' + user.username + '!');
            res.redirect('/museums')
        });
    });
});

//Show Login page
router.get('/login', (req, res)=>{
    res.render('login', {message: req.flash('error')});
});

//Handling login logic
router.post('/login', passport.authenticate('local', {
    successRedirect: '/museums',
    failureRedirect: '/login'
}), (req, res)=>{});

//LOGOUT ROUTE
router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('success', 'Logged you out');
    res.redirect('/museums');
});

module.exports = router;