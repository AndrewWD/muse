const express = require('express'),
      app = express(),
      bodyparser = require('body-parser'),
      mongoose = require('mongoose'),
      museum = require('./models/museum');

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
mongoose.connect('mongodb://127.0.0.1/museums');

app.get('/', (req, res)=>{
    res.render('landing');
});

app.get('/museums', (req, res)=>{
    museum.find({}, (err, museums)=>{
        if(err){
            console.log(err);
        } else{
            res.render('museums', {museums: museums});
        }
    })
});

app.post('/museums', (req, res)=>{
    museum.create(req.body.newMuseum, (err, museums)=>{
        if(err){
            console.log(err);
        } else{
          res.redirect('/museums'); 
        }
    });
});

app.get('/museums/new', (req, res)=>{
    res.render('new');
});

app.get('/museums/show/:id', (req, res)=>{
    museum.findById(req.params.id, (err, museum)=>{
        if(err){
            console.log(err);
        } else{
            res.render('show', {museum: museum});
        }
    });
});
app.listen(3000, ()=>{
    console.log('The server has started!');
});