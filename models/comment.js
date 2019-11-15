var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  text: String,
  author: { // author will be an object that has an id and user name
    id: { // id is an object as well, this will make the comments associate with users
      type:mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Comment", commentSchema);
