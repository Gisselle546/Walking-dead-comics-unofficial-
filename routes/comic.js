var express = require("express");
var router  = express.Router();
var Comic   = require("../models/comic");



router.get("/",function(req, res){
    Comic.find({},function(err,foundComics){
        if(err){
            console.log(err);
        }else{
           res.render("comic/index",{foundComics : foundComics });
        }
    });
});

router.get("/:id",function(req,res){
    Comic.findById(req.params.id).populate("comments").exec(function(err,showcomics){
        if(err){
            console.log(err);
        }else{
            res.render("comic/show",{showcomics : showcomics});
        }
    });
});




module.exports = router;