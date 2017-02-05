var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");


router.get("/register",function(req,res){
    res.render("auth/register");
});

router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("auth/register");
        }
        
        passport.authenticate("local")(req,res, function(){
            res.redirect("/comic");
        });
    });
});


router.get("/login",function(req,res){
    res.render("auth/login");
});

router.post("/login", passport.authenticate("local",
{
    successRedirect: "/comic",
    failureRedirect: "/login"
    }), function(req,res){
});


router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/comic");
});


function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect("/login");
}





module.exports = router;