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
            console.log(err);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, ()=>{
            res.redirect('/museums')
        });
    });
});

//Show Login page
router.get('/login', (req, res)=>{
    res.render('login');
});

//Handling login logic
router.post('/login', passport.authenticate('local', {
    successRedirect: '/museums',
    failureRedirect: '/login'
}), (req, res)=>{});

//LOGOUT ROUTE
router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/museums');
});

//middleware to make sure the user is log in
function isLogIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;