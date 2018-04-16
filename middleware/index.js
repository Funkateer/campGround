var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all middleware here

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
 if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
        req.flash("error", "Campground no found!")
            // res.redirect("/campgrounds");
            res.redirect("back");
        } else {
            // checking if user is the owner of the post using a mongoose method .equals
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else{
                req.flash("error", "You dont have permission to do that!")
                res.redirect("back");
            }
            }
         });
    } else{
        req.flash("error", "You need to be logged in to do that Mr Postman")
        res.redirect("back");// this will .. ok I know!!  NEW 
    }    
}


middlewareObj.checkCommentOwnership = function (req, res, next){
     if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            if(foundComment.author.id.equals(req.user._id)){
                next();
            } else{
                res.redirect("back");
            }
            }
         });
    } else{
        res.redirect("back");
    }    
};

// This function is for making dure to comment you need t be logged in
// you can add "isLoggedIn" between the route and function of any route you want
middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first") // NEW this is a flash messagge error is hte color and next to it the txt showen in the flash mess 
    res.redirect("/login"); // we put flash before bc it will handled as req but it will show only after the NEXT  
};


module.exports = middlewareObj;