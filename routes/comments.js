var express = require("express");
var router  = express.Router({mergeParams:true});
var Comic   = require("../models/comic");
var Comment = require("../models/comment");

router.get("/new",isLoggedIn,function(req,res){
   Comic.findById(req.params.id,function(err,Comic){
       if(err){
           console.log(err);
       }else{
           res.render("comments/new",{Comic:Comic});
       }
       
       
   }) ;
});

router.post("/",isLoggedIn,function(req,res){
    Comic.findById(req.params.id,function(err,Comic){
        if(err){
            console.log(err);
            res.redirect("/comic");
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username =req.user.username;
                    comment.save();
                    
                    
                    Comic.comments.push(comment);
                    Comic.save();
                    res.redirect("/comic/"+ Comic._id);
                }
            });
        }
    });
});
    

router.get("/:comment_id/edit",checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{Comic_id:req.params.id, comment:foundComment});
        }
    });
});


router.put("/:comment_id",function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/comic/"+req.params.id);
        }
    });
});


router.delete("/:comment_id", checkCommentOwnership,function(req,res){
    
    Comment.findById(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/comic/"+req.params.id);
        }
    })
    
})




function checkCommentOwnership(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
            
        });
    }else{
        res.redirect("back");
    }
}

   
function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect("/login");
}

module.exports = router;
