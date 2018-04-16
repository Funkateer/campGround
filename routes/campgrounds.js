// we need this otherwise we'll have issue with app is not defined 
var express = require("express");
// well pass this var instead of app
var router = express.Router();

var Campground = require("../models/campground");

// NEW middleware 
var middleware = require("../middleware");


//INDEX - show all campgrounds ..  we took aout the campground route and put the "/"
router.get("/", function(req, res){
    // passport makes a lil note of the user you can access by using so you can use it to know if somebody is logged or not to cosumiz our nav bar lol
    // console.log(req.user)
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user}); // NEW here we put the note about the user.. and you need to put them in all routes there is a functio on top for that 
       }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    // lets add who created the campground by adding another object in the array newCampground
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    // this is a collection oif all the info above
    var newCampground = {name: name, image: image, description: desc, price: price, author:author}; // NEW we add the author to the new campground
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    // refactor adding the comment to the show page
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // this will print the array populated with the comment 
           // console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
     });
});


// UPDATE CAMP ROUTE  
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and up date and mongoose makes it easy with this method find by id and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campgroundAtr, function (err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// DESTROY CAMP  you need to use a mongoose method find by id and remove and the id 
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
   });
});



// middleware went to dir middleware


module.exports = router;