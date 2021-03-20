// Thursday March 18, 2021 521. Adding a Reviews Controller
const User = require("../models/user");

module.exports.renderRegister = function(req, res){
    res.render("users/register");
};

module.exports.register = async function(req, res, next){
    try{
        const {username, email, password} = req.body;
        const newUser = new User({email: email, username: username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, function(err){
            //await not supported, so a callback required
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to YelpCamp!");
            res.redirect("/campgrounds");
        });
        
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("register");
    }
};

module.exports.renderLogin = function(req, res){
    res.render("users/login");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";//if returnTo is undef, then "/campgrounds" is set
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = function(req, res) {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
};