// we need this otherwise we'll have issue with app is not defined 
var express = require("express");
// well pass this var instead of app
var router = express.Router({mergeParams: true}); // otherwise it will be null

var Campground = require("../models/campground");
var Comment = require("../models/comment");


// NEW middleware we add middleware.isLoggedIn bc we have the middle "isLoggedIn" in another dir 
var middleware = require("../middleware");


// =====================
// COOMENT ROUTES
                                      // BOOM logged in check
router.get("/new", middleware.isLoggedIn ,function(req, res) {
    // everytime you need some info to give to a page you need to first find it and then pass 
    // it like in other routes when you need to display the name title id or else 
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

 // same here so wew prevent somebody enter a post req and add a comment 
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup for campground using ID 
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment,function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // this will add the connebt tio particular user and save it
                    // using the user atr which contains the username and _id
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                     req.flash("success", "Added coment!")
                    // redirect campground show page
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});

// ULTRA NEW after we set all routes like below we still have comments that cna be deleted from any one 
// lets add a middleware like we did in campgroind checkownership   

// EDIT COMMENT NEW
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE a comment
router.put("/:comment_id", middleware.checkCommentOwnership,function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back")
       } else {
           res.redirect("/campgrounds/" + req.params.id)
       }
   })
});

// AAAND DELETE 
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("back");
           req.flash("success", "Deleted coment!")

       }
   });
})



// MIDDLEWARE went to dir middleware

module.exports = router;