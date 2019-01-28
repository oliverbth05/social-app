const Post = require('../models/Post');

exports.get_landing = async(req, res) => {
    res.render('landing.ejs', {route: 'landing', isAuthenticated: req.session.isAuthenticated, user: req.session.user})
}

exports.get_home = async(req, res) => {
    try {
        var posts = await Post.find()
        res.render('home.ejs', {route: 'home', isAuthenticated: req.session.isAuthenticated, posts: posts, user: req.session.user})
    }
    catch(err) {
        
    }
}

exports.get_new = async(req, res) => {
    res.render('new.ejs', {router: 'new',  isAuthenticated: req.session.isAuthenticated, user: req.session.user})
}

exports.post_new = async(req, res) => {
    try {
        await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            image: req.body.image,
        })
        res.redirect('/home')
    }
    catch(err) {
        
    }
}
