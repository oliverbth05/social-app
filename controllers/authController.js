const User = require('../models/User');
const bcrypt = require('bcrypt');



exports.get_login = async(req, res) => {
    res.render('login.ejs', {passwordError: false, accountError: false, route: 'login', isAuthenticated: req.session.isAuthenticated})
}

exports.post_login = async(req, res) => {
    
    try {
        var foundUser = await User.findOne({email: req.body.email});
        console.log(foundUser);
        
        if (foundUser) {
            var isValid = bcrypt.compareSync(req.body.password, foundUser.password);
            if(isValid) {
                console.log(req.session)
                req.session.isAuthenticated = true;
                res.render('home.ejs', {isAuthenticated: true});
            }
            else {
                console.log('incorrect password')
                res.render('login.ejs', { passwordError: true, accountError: false, route: 'login', isAuthenticated: req.session.isAuthenticated})
            }
        }
        else {
            console.log('No such user')
            res.render('login.ejs', { passwordError: false, accountError: true, route: 'login', isAuthenticated: req.session.isAuthenticated });
        }
    }
    
    catch (err) {
        console.log(err)
        res.end()
    }
   
} 

exports.get_register = async(req, res) => {
    res.render('register.ejs', {userExists: false, route: 'register', isAuthenticated: req.session.isAuthenticated})
}

exports.post_register = async(req, res) => {

    const doesExist = await User.findOne({email: req.body.email});
    
    if(doesExist) {
        res.render('register.ejs', {userExists: true, route: 'register', isAuthenticated: req.session.isAuthenticated})
    }
    
    else {
        var newUser = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12)
        })
        res.redirect('/home')
    }
}