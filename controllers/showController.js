const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.get_post = async(req, res) => {
    try {
        await Post.updateOne({_id : req.params.id}, {$inc : {views : 1}});
        var post = await Post.findOne({_id : req.params.id});
        var user = await User.findOne({_id : req.session.user._id});
        
        var canLike = post.likes.indexOf(req.session.user._id) === -1;
        console.log(post.likes, req.session.user._id);
        var canPin = user.pins.map( pin => { return pin.post_id }).indexOf(req.params.id) === -1;
        var isUser = post.user_id == req.session.user._id;
        
        res.render('show.ejs', {
            post, 
            canLike,
            isUser,
            canPin,
            isAuthenticated : req.session.isAuthenticated,
            user : req.session.user,
        });
    }
   
    catch (err) {
        console.log(err)
    }
}

exports.get_comments = async(req, res) => {
    var comments = await Comment.find({post_id : req.params.id});
    res.json(comments)
}

exports.post_comment = async(req, res) => {
    var comment = await Comment.create({
        body: req.body.body,
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        post_id: req.body.post_id
    })
    
    res.status(200).json(comment);
}

exports.post_like = async(req, res) => {
    await Post.updateOne({_id: req.body.post_id}, { $addToSet: { likes: req.body.user_id}});
    res.status(200).json()
}

exports.post_pin = async(req, res) => {
    
    var pinData = {
        post_id: req.body.post_id,
        pin_date: new Date(),
        post_title: req.body.post_title
    }
    
    await User.updateOne({_id: req.body.user_id}, {$push: {pins: pinData}})
    res.status(200).json()
}