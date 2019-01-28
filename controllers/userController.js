const Post = require('../models/Post');
const User = require('../models/User');

exports.get_user = async(req, res) => {
    try {
        var posts = await Post.find({user_id: req.params.id});
        var userData = await User.findOne({_id: req.params.id});
        var isUser = userData._id == req.session.user._id;
        res.render('user.ejs', {isAuthenticated: req.session.isAuthenticated, userData: userData, posts: posts, user: req.session.user, isUser})
    }
    
    catch(err) {
        
    }
}

exports.get_edit_user = async(req, res) => {
    var userData = await User.findOne({_id: req.params.id})
    res.render('edit_user.ejs', {user: req.session.user, isAuthenticated: req.session.isAuthenticated, userData})
} 

exports.put_user = async(req, res) => {
    console.log('reached')
    console.log(req.body.summary)
    console.log(req.body.user_id)
   await User.updateOne({_id: req.body.user_id}, {$set : {summary: req.body.summary}})
   res.status(200).json()
}