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
                    newComment.author.username = req.user.username;
                    newComment.author.id = req.user._id;
                    newComment.save();
                    foundMuseum.comments.push(newComment);
                    foundMuseum.save(); 
                    res.redirect('/museums/'+ req.params.id);
                }
            });
        }
    });
});

//EDIT ROUTE for comment
router.get('/:commentId/edit', (req, res)=>{
    comment.findById(req.params.commentId, (err, foundComment)=>{
        if(err){
            res.redirect('back');
        } else {
            res.render('comments/edit', {foundComment: foundComment, museumId: req.params.id})
        }
    });
});

//UPDATE ROUTE for comment
router.put('/:commentId', (req, res)=>{
    comment.findByIdAndUpdate(req.params.commentId, req.body.newComment ,(err, newComment)=>{
        if(err){
            res.redirect('back');
        } else{
            res.redirect('/museums/' + req.params.id);
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