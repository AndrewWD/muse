const express = require('express'),
      router = express.Router(),
      museum = require('../models/museum');
      
//INDEX ROUTE
router.get('/', (req, res)=>{
    museum.find({}, (err, museums)=>{
        if(err){
            console.log(err);
        } else{
            res.render('museums/museums', {museums: museums});
        }
    })
});

//CREATE ROUTE for museum
router.post('/', isLogIn, (req, res)=>{
    museum.create(req.body.newMuseum, (err, museums)=>{
        if(err){
            console.log(err);
        } else{
          museums.author.id = req.user._id;
          museums.author.username = req.user.username;
          museums.save();
          res.redirect('/museums'); 
        }
    });
});

//NEW ROUTE for museum
router.get('/new', isLogIn, (req, res)=>{
    res.render('museums/new');
});

//SHOW ROUTE
router.get('/:id', (req, res)=>{
    museum.findById(req.params.id).populate('comments').exec((err, museum)=>{
        if(err){
            console.log(err);
        } else{
            res.render('museums/show', {museum: museum});
        }
    });
});

//middleware to make sure the user is log in
function isLogIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;