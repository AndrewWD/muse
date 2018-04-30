const express = require('express'),
      router = express.Router({mergeParams: true}),
      museum = require('../models/museum'),
      comment = require('../models/comment'),
      middleware = require('../middleware');
//NEW ROUTE for comment
router.get('/new', middleware.isLogIn, (req, res)=>{
    museum.findById(req.params.id, (err, foundMuseum)=>{
        if(err) {
            req.flash('error', err.message);
        } else {
            res.render('comments/new', {foundMuseum: foundMuseum});
        }
    });
});

//CREATE ROUTE for comment
router.post('/', middleware.isLogIn, (req, res)=>{
    museum.findById(req.params.id, (err, foundMuseum)=>{
        if(err) {
            req.flash('error', err.message);
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
router.get('/:commentId/edit', middleware.checkOwnershipComment, (req, res)=>{
    comment.findById(req.params.commentId, (err, foundComment)=>{
        if(err){
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            res.render('comments/edit', {foundComment: foundComment, museumId: req.params.id})
        }
    });
});

//UPDATE ROUTE for comment
router.put('/:commentId', middleware.checkOwnershipComment, (req, res)=>{
    comment.findByIdAndUpdate(req.params.commentId, req.body.newComment ,(err, newComment)=>{
        if(err){
            req.flash('error', err.message);
            res.redirect('back');
        } else{
            res.redirect('/museums/' + req.params.id);
        }
    });
});

//DELETE ROUTE for comment
router.delete('/:commentId', middleware.checkOwnershipComment, (req, res)=>{
    comment.findByIdAndRemove(req.params.commentId, (err)=>{
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/museums/' + req.params.id);
        }
    });
});


module.exports = router;