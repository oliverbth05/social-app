const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    summary: {
        type: String,
        default: 'No summary provided'
    },
    pins: [{}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;