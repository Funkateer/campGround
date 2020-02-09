var express = require("express");

var router = express.Router({ mergeParams: true });

var Campground = require("../models/campground");
var Comment = require("../models/comment");

// middleware
var middleware = require("../middleware");

// COMMENT ROUTES
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

// prevent somebody enter a post req and add a comment
router.post("/", middleware.isLoggedIn, function(req, res) {
  // lookup for campground using ID
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          // this will add the connect to particular user and save it
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          // connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Added comment!");
          // redirect campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// EDIT a comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(
  req,
  res
) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: foundComment
      });
    }
  });
});

// UPDATE a comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(
  req,
  res
) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(
  req,
  res
) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("back");
      req.flash("success", "Deleted comment!");
    }
  });
});

// MIDDLEWARE went to dir middleware
module.exports = router;
