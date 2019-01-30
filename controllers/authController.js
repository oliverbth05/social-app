const User = require('../models/User');
const bcrypt = require('bcryptjs'); 

exports.get_login = async(req, res) => {
    res.render('login.ejs', {
        passwordError : false,
        accountError : false,
        route : 'login',
        isAuthenticated : req.session.isAuthenticated,
        user : req.session.user
    })
}
exports.post_login = async(req, res) => {
    try {
        
        var foundUser = await User.findOne({email : req.body.email});
        
        if (!foundUser) {
            return res.render('login.ejs', {
                passwordError : false,
                accountError : true,
                route : 'login',
                isAuthenticated : req.session.isAuthenticated
            });
        }
            
        var isValid = bcrypt.compareSync(req.body.password, foundUser.password);
            
        if(!isValid) {
            return res.render('login.ejs', { 
                passwordError : true,
                accountError : false,
                route : 'login',
                isAuthenticated : req.session.isAuthenticated
            })
        } 
                
        var userData = {...foundUser.toObject()}
        delete userData.password;
        req.session.user = userData;
        req.session.isAuthenticated = true;
        res.redirect('/home');
    }
    catch (err) {
        console.log(err)
        res.end()
    }
} 
exports.get_logout = async(req, res) => {
    req.session.isAuthenticated = false;
    res.redirect('/login')
}
exports.get_register = async(req, res) => {
    res.render('register.ejs', {userExists: false, route: 'register', isAuthenticated: req.session.isAuthenticated})
}
exports.post_register = async(req, res) => {
    const doesExist = await User.findOne({email: req.body.email});
    
    if(doesExist) {
        return res.render('register.ejs', {
            userExists : true,
            route : 'register',
            isAuthenticated : req.session.isAuthenticated
        })
    }
    
    var newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12)
    })

    var welcomeNotification = {
        title: 'Welcome to Social App',
        body: 'Blah blah blah blah blah',
        read: false
    }

    await User.updateOne({_id : newUser._id}, {$push: {notifications: welcomeNotification}, $inc: {unread_notifications: 1}})

    newUser.notifications.push(welcomeNotification);
    newUser.unread_notifications = 1;

    console.log(newUser)
        
    req.session.user = newUser;
    req.session.isAuthenticated = true
    res.redirect('/home')
}