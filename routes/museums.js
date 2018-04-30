const express = require('express'),
      router = express.Router(),
      museum = require('../models/museum'),
      middleware = require('../middleware');
      
//INDEX ROUTE
router.get('/', (req, res)=>{
    museum.find({}, (err, museums)=>{
        if(err){
            req.flash('error', err.message);
        } else{
            res.render('museums/museums', {museums: museums});
        }
    })
});

//CREATE ROUTE for museum
router.post('/', middleware.isLogIn, (req, res)=>{
    museum.create(req.body.newMuseum, (err, museums)=>{
        if(err){
            req.flash('error', err.message);
        } else{
          museums.author.id = req.user._id;
          museums.author.username = req.user.username;
          museums.save();
          req.flash('success', 'Successfully post!')
          res.redirect('/museums'); 
        }
    });
});

//NEW ROUTE for museum
router.get('/new', middleware.isLogIn, (req, res)=>{
    res.render('museums/new');
});

//SHOW ROUTE
router.get('/:id', (req, res)=>{
    museum.findById(req.params.id).populate('comments').exec((err, museum)=>{
        if(err){
            req.flash('error', err.message);
        } else{
            res.render('museums/show', {museum: museum});
        }
    });
});

//EDIT ROUTE for museum
router.get('/:id/edit', middleware.checkOwnershipMuseum, (req, res)=>{
    museum.findById(req.params.id, (err, foundMuseum)=>{
        if (err){
            req.flash('error', err.message);
        } else {
            res.render('museums/edit', {foundMuseum: foundMuseum});
        }
    });
});

//UPDATE ROUTE for museum
router.put('/:id', middleware.checkOwnershipMuseum, (req, res)=>{
    museum.findByIdAndUpdate(req.params.id, req.body.newMuseum, (err, museum)=>{
        if(err){
            req.flash('error', err.message);
            res.redirect('/museums');
        } else{
            req.flash('success', 'Successfully updated!');
            res.redirect('/museums/' + museum._id);
        }
    });
});

//DELETE ROUTE for museum
router.delete('/:id', middleware.checkOwnershipMuseum, (req, res)=>{
    museum.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            req.flash('error', err.message);
        } else {
            req.flash('success', 'Succefully deleted!');
            res.redirect('/museums');
        }
    });
});

module.exports = router;