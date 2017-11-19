var express=require('express');
var router=express.Router();
//mergeParams:true in order to use the shortcuts to the routing
var Comment=require('../models/comment');
var campground=require('../models/campground');

router.get('/campgrounds/:id/comments/new',loggedin,function(req,res){
    campground.findById(req.params.id,function(err,data){
        if(err){
            console.log(err);
        }
        else{
           // console.log(data);
                res.render('newc',{data:data});

        }
    });
});
router.post('/campgrounds/:id/comments',loggedin,function(req,res){
   campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }
    else{
        var text=req.body.text;
        var author=req.body.author;
        var form={text:text,author:author};
        Comment.create(form,function(err,comment){
            if(err){
                console.log(err);
            }
            else{
                //console.log("THIS IS THE NEW USER IN THE DB"+req.user.username);
                comment.author.id=req.user._id;
                comment.author.username=req.user.username;
                comment.save();
                campground.comments.push(comment);
                campground.save();
                 res.redirect('/campgrounds/'+campground._id);
            }
        });
        //console.log(req.body.text);
        //console.log(req.body.author);
    }
   });
});
//EDIT
router.get('/campgrounds/:id/comments/:comment_id/edit',function(req,res){
    res.render('editcomment');
});


//UPDATE
function loggedin(req,res,next){
if(req.isAuthenticated())    {
    return next();
}
    req.flash("error","You must first login");
    res.redirect('/login');
}
module.exports=router;
