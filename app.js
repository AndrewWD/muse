const express = require('express'),
      app = express(),
      bodyparser = require('body-parser'),
      mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/museums');


const museumSchema = new mongoose.Schema({
    name: String,
    image: String
});

const museum = mongoose.model('museum', museumSchema);

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
    let name = req.body.name;
    let image = req.body.image;
    const newMuseum = {name: name, image: image};
    museum.create(newMuseum, (err, museums)=>{
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
app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log('The server has started!');
});