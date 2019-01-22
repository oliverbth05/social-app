module.exports = function(req, res, next) {
    const openPaths = [
        '/landing',
        '/login',
        '/register'
    ]
    if (openPaths.indexOf(req.path) !== -1 || req.session.isAuthenticated) {
        return next();
    }
    else {
        res.redirect('/login');
        next();
    }
}