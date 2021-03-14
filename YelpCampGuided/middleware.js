// Tuesday March 9, 2021 509. isLoggedIn Middleware
module.exports.isLoggedIn = function(req, res, next){
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
};