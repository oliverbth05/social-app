const Post = require('../models/Post');
const User = require('../models/User');

exports.get_user = async(req, res) => {
    try {
        var posts = await Post.find({user_id: req.params.id});
        var userData = await User.findOne({_id: req.params.id});
        
        console.log(posts, userData)
        
        res.render('user.ejs', {isAuthenticated: req.session.isAuthenticated, userData: userData, posts: posts, user: req.session.user})
    }
    
    catch(err) {
        
    }
    
}