const museum = require('../models/museum'),
      comment = require('../models/comment');

const middleware = new Object();

middleware.isLogIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Please log in first');
    res.redirect('/login');
}

middleware.checkOwnershipMuseum = function(req, res, next){
    if(req.isAuthenticated()){
        museum.findById(req.params.id, (err, foundMuseum)=>{
            if(err){
                req.flash('error', err.message);
                res.redirect('back');
            } else {
                if(foundMuseum.author.id.equals(req.user._id)){
                    return next();
                }
                req.flash('error', 'You have no permission to do that');
                res.redirect('back');
            }
        });
    } else {
        req.flash('error', 'Please log in first');
        res.redirect('back');
    }
}

middleware.checkOwnershipComment = function(req, res, next){
    if(req.isAuthenticated()){
        comment.findById(req.params.commentId, (err, foundComment)=>{
            if(err){
                req.flash('error', err.message);
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    return next();
                }
                req.flash('error', 'You have no permission to do that');
                res.redirect('back');
            }
        });
    } else {
        req.flash('error', 'Please log in first');
        res.redirect('back');
    }
}

module.exports = middleware;

