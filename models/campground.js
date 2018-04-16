var mongoose = require("mongoose");

// SCHEMA SETUP 
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number, // NEW we add a price
  author: { //  so now we can add a campground with an user associated
    id: { 
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }
    ]
});


// var Campground = mongoose.model("Campground", campgroundSchema);

// we need something that export what has been executed like a function return
module.exports = mongoose.model("Campground", campgroundSchema);

