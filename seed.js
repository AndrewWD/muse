const mongoose = require('mongoose'),
      museum = require('./models/museum');
      comment = require('./models/comment');

let data = [
    {
        name: 'Metropolitan Museum of Art',
        image: 'https://media.timeout.com/images/100494701/1372/1029/image.jpg',
        description: 'Occupying an 11.5 acre footprint, the Metropolitan Museum of Art (New York, NY’s biggest museum), which opened in 1880, is impressive in terms both of quality and scale. However, this iconic New York attraction—one of the world\'s top art museums—is surprisingly easy to negotiate, particularly if you come early on a weekday to avoid the crowds. Hang out in an Egyptian temple, gawk at period costumes and take pictures on the gorgeous rooftop garden, showcasing views of Central Park and the city skyline.'
    },
    {
        name: 'Guggenheim New York Museum',
        image: 'https://media.timeout.com/images/100614413/1372/1029/image.jpg',
        description: 'The Guggenheim New York Museum is as famous for its landmark building—designed by Frank Lloyd Wright and restored for its 50th birthday in 2009—as it is for its impressive collection and daring temporary art shows. The museum owns Peggy Guggenheim’s trove of cubist, surrealist and abstract expressionist works, along with the Panza di Biumo Collection of American minimalist and conceptual art from the 1960s and ’70s. '
    },
    {
        name: 'American Museum of Natural History',
        image: 'https://media.timeout.com/images/100616765/1372/1029/image.jpg',
        description: 'Beyond the iconic, show-stopping displays–the grizzly bear in the Hall of North American Mammals, the 94-feet long blue whale, the prehistoric Barosaurus skeleton rearing up as if to scare the adjacent Allosaurus skeleton–is an expertly curated, 148-year-old museum that fills visitors of all ages with a curiosity about the universe.'
    },
    {
        name: 'Whitney Museum of American Art',
        image: 'https://media.timeout.com/images/102427507/750/562/image.jpg',
        description: 'After nearly 50 years in its Marcel-Breur-designed building on Madison Avenue at 75th Street, the Whitney Museum decamped in 2015 to a brand new home in Lower Manhattan\'s Meatpacking District, conceived by international starchitect Renzo Piano.'
    }
];

function createDB(data) {
    data.forEach((val)=>{
        museum.create(val, (err, newMuseum)=>{
            if(err) {
                console.log(err);
            } else {
                comment.create({
                    text: 'Awesome museum!',
                    author: 'Anonymous'
                }, (err, newComment)=>{
                    if(err) {
                        console.log(err);
                    } else {
                        newMuseum.comments.push(newComment);
                        newMuseum.save();
                    }
                });               
            }
        });
    });
}

function seedDB(){
    museum.remove({}).then(()=>{
        return createDB(data);
    }, (err)=>{
        console.log(err);
    });
};

module.exports = seedDB;
