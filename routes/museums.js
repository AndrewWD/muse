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

//EDIT ROUTE for museum
router.get('/:id/edit', checkOwnership, (req, res)=>{
    museum.findById(req.params.id, (err, foundMuseum)=>{
        if (err){
            console.log(err);
        } else {
            res.render('museums/edit', {foundMuseum: foundMuseum});
        }
    });
});

//UPDATE ROUTE for museum
router.put('/:id', checkOwnership, (req, res)=>{
    museum.findByIdAndUpdate(req.params.id, req.body.newMuseum, (err, museum)=>{
        if(err){
            res.redirect('/museums');
        } else{
            res.redirect('/museums/' + museum._id);
        }
    });
});

//DELETE ROUTE for museum
router.delete('/:id', checkOwnership, (req, res)=>{
    museum.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.redirect('/museums');
        } else {
            res.redirect('/museums');
        }
    });
});

function checkOwnership(req, res, next){
    if(req.isAuthenticated()){
        museum.findById(req.params.id, (err, foundMuseum)=>{
            if(err){
                console.log(err);
            } else {
                if(foundMuseum.author.id.equals(req.user._id)){
                    return next();
                }
                res.send('You are not allowed to do that!');
            }
        });
    } else {
        res.send('You should log in first');
    }

}

//middleware to make sure the user is log in
function isLogIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;