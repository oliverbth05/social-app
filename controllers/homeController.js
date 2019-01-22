exports.get_landing = async(req, res) => {
    console.log(req.session)
    res.render('landing.ejs', {route: 'landing', isAuthenticated: req.session.isAuthenticated})
}

exports.get_home = async(req, res) => {
    console.log(req.session)
    res.render('home.ejs', {route: 'home', isAuthenticated: req.session.isAuthenticated})
}


