const mongoose = require('mongoose');

const museumSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

const museum = mongoose.model('museum', museumSchema);

module.exports = museum;