const express = require('express'),
      router = express.Router({mergeParams: true}),
      museum = require('../models/museum'),
      comment = require('../models/comment')
//NEW ROUTE for comment
router.get('/new', isLogIn, (req, res)=>{
    museum.findById(req.params.id, (err, foundMuseum)=>{
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {foundMuseum: foundMuseum});
        }
    });
});

//CREATE ROUTE for comment
router.post('/', isLogIn, (req, res)=>{
    museum.findById(req.params.id, (err, foundMuseum)=>{
        if(err) {
            console.log(err);
        } else {
            comment.create(req.body.newComment, (err, newComment)=>{
                if (err) {
                    console.log(err);
                } else {
                    newComment.author = req.user.username;
                    newComment.save();
                    foundMuseum.comments.push(newComment);
                    foundMuseum.save(); 
                    res.redirect('/museums/'+ req.params.id);
                }
            });
        }
    });
});

function isLogIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;