//=====================
//AUTH ROUTES
var express=require('express');
var router=express.Router();
var User=require('../models/user');
var passport=require('passport');
var localStrategy=require('passport-local');

router.get('/register',function(req,res){
    res.render('register');
});
router.post('/register',function(req,res){
    //res.send('singing');
    //provided by passport local mongoose
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
                req.flash('error',err.message);
return res.redirect('/register')        ;
            
            console.log(err);
           //return res.render("register");
        }
       passport.authenticate("local")(req,res,function(){
           req.flash('success',"Welcome to YelpCamp " + user.username);
           res.redirect('/campgrounds');
       });
    });
    
});
router.get('/login',function(req,res){
    res.render('login');
});
router.post('/login',passport.authenticate("local",{
 successRedirect:'/campgrounds',
  failureRedirect:'/login'  
}),function(req,res){
    
});
router.get('/logout',function(req,res){
    req.logout();
    req.flash("success","You are logged out");
    res.redirect('/');
});
function loggedin(req,res,next){
if(req.isAuthenticated())    {
    return next();
}
    req.flash("error","You must first login");
    res.redirect('/login');
}
module.exports=router;
