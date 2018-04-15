const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

const comment = mongoose.model('Comment', commentSchema);

module.exports = comment;