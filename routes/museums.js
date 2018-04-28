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
router.post('/', (req, res)=>{
    museum.create(req.body.newMuseum, (err, museums)=>{
        if(err){
            console.log(err);
        } else{
          res.redirect('/museums'); 
        }
    });
});

//NEW ROUTE for museum
router.get('/new', (req, res)=>{
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

module.exports = router;