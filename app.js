let express = require('express');
let app = express();
let bodyparser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

let campgrounds = [
        {name: 'Nam Shan Campsite', image: 'https://media.timeout.com/images/103933543/750/562/image.jpg'},
        {name: 'Tap Mun Campsite', image: 'https://media.timeout.com/images/103819969/750/562/image.jpg'},
        {name: 'Hok Tau Campsite', image: 'https://media.timeout.com/images/103931927/750/562/image.jpg'},
        {name: 'Nam Shan Campsite', image: 'https://media.timeout.com/images/103933543/750/562/image.jpg'},
        {name: 'Tap Mun Campsite', image: 'https://media.timeout.com/images/103819969/750/562/image.jpg'},
        {name: 'Hok Tau Campsite', image: 'https://media.timeout.com/images/103931927/750/562/image.jpg'},
        {name: 'Nam Shan Campsite', image: 'https://media.timeout.com/images/103933543/750/562/image.jpg'},
        {name: 'Tap Mun Campsite', image: 'https://media.timeout.com/images/103819969/750/562/image.jpg'},
        {name: 'Hok Tau Campsite', image: 'https://media.timeout.com/images/103931927/750/562/image.jpg'}
];

app.get('/', (req, res)=>{
    res.render('landing');
});

app.get('/campgrounds', (req, res)=>{
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', (req, res)=>{
    var name = req.body.name;
    var image = req.body.image;
    campgrounds.push({name: name, image: image});
    res.redirect('/campgrounds'); 
});

app.get('/campgrounds/new', (req, res)=>{
    res.render('new');
});
app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log('The server has started!');
});