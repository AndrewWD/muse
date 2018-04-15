const express = require('express'),
      app = express(),
      bodyparser = require('body-parser'),
      mongoose = require('mongoose'),
      museum = require('./models/museum'),
      comment = require('./models/comment')
      seedDB = require('./seed');

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
mongoose.connect('mongodb://127.0.0.1/museums');

//Initialize the data 
seedDB();

app.get('/', (req, res)=>{
    res.render('landing');
});

//INDEX ROUTE
app.get('/museums', (req, res)=>{
    museum.find({}, (err, museums)=>{
        if(err){
            console.log(err);
        } else{
            res.render('museums/museums', {museums: museums});
        }
    })
});

//CREATE ROUTE for museum
app.post('/museums', (req, res)=>{
    museum.create(req.body.newMuseum, (err, museums)=>{
        if(err){
            console.log(err);
        } else{
          res.redirect('/museums'); 
        }
    });
});

//NEW ROUTE for museum
app.get('/museums/new', (req, res)=>{
    res.render('museums/new');
});

//SHOW ROUTE
app.get('/museums/show/:id', (req, res)=>{
    museum.findById(req.params.id).populate('comments').exec((err, museum)=>{
        if(err){
            console.log(err);
        } else{
            console.log(museum);
            res.render('museums/show', {museum: museum});
        }
    });
});

//NEW ROUTE for comment
app.get('/museums/:id/comments/new', (req, res)=>{
    museum.findById(req.params.id, (err, foundMuseum)=>{
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {foundMuseum: foundMuseum});
        }
    });
});

app.post('/museums/:id/comments', (req, res)=>{
    museum.findById(req.params.id, (err, foundMuseum)=>{
        if(err) {
            console.log(err);
        } else {
            comment.create(req.body.newComment, (err, newComment)=>{
                if (err) {
                    console.log(err);
                } else {
                    foundMuseum.comments.push(newComment);
                    foundMuseum.save(); 
                    res.redirect('/museums/show/'+ req.params.id);
                }
            });
        }
    });
});

app.listen(3000, ()=>{
    console.log('The server has started!');
});