const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    body: String,
    user_id: String,
    user_name: String,
    comment_id: String,
    date: {
        type: Date,
        default : Date.now()
    },
    likes: [],
    replies: []
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;