const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.get_post = async(req, res) => {
    var post = await Post.findOne({_id: req.params.id});
    await Post.updateOne({_id: req.params.id}, {$inc : {views: 1}});
    var canLike = post.likes.indexOf(req.session.user._id) === -1;
    res.render('show.ejs', {post, isAuthenticated: req.session.isAuthenticated, user: req.session.user, canLike});
}

exports.get_comments = async(req, res) => {
    var comments = await Comment.find({post_id: req.params.id});
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
    
    // var post = await Post.findOne({_id: req.body.post_id})
    // var comments = await Comment.find({post_id: req.body.post_id})
    
    // res.render('show.ejs', {post, comments, isAuthenticated: req.session.isAuthenticated, user: req.session.user})
}

exports.post_like = async(req, res) => {
    await Post.updateOne({_id: req.body.post_id}, { $addToSet: { likes: req.body.user_id}});
    res.status(200).json()
}