// we need this otherwise we'll have issue with app is not defined
var express  = require("express");
// we0ll pass this var instead of app
var router   = express.Router();

var passport = require("passport");
var User     = require("../models/user");


router.get("/", function(req, res){
  res.render("landing");
});


// AUTH ROUTES
//show the register form
router.get("/register", function(req, res) {
  res.render("register");
});
// sign up logic
router.post("/register",function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      req.flash("error", "Wrong user or pass try again or sign up");
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to YelpCamp " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

// login form
router.get("/login", function(req, res) {
  res.render("login");
});

// login logic      this is the middleware
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res) {
});

// logout
router.get("/logout",function(req, res) {
  req.logout();
  req.flash("success","Logged you out!");
  res.redirect("/campgrounds");
});

module.exports = router;
