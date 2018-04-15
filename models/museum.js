const mongoose = require('mongoose');

const museumSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const museum = mongoose.model('museum', museumSchema);

module.exports = museum;