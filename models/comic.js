var mongoose = require("mongoose");

var comicSchema = new mongoose.Schema({
    title: String,
    image: String,
 description: String,
 amazonlink: String,
 comments: [
     {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
         
     }
  ]
  
 
});

module.exports = mongoose.model("Comic",comicSchema);