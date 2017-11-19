var express=require('express');
var router=express.Router();
var campground=require('../models/campground');


router.get('/',function(req,res){
res.render('landing');
    console.log("hii");
    
});
router.get('/campgrounds',function(req,res){
    //console.log(req.user);
    
    campground.find({},function(err,dcamps){
        if(err){
            console.log("ohh no");
            
        }
        else{
            console.log("passed");
   res.render('campgrounds',{camps:dcamps,currentuser:req.user}); 
            
        }
    });
});
router.get('/campgrounds/new',loggedin,function(req,res){
    res.render('new');
});
router.post('/campgrounds',loggedin,function(req,res){
//get data from the form and add to the camps array
    //redirect to the form
    var name=req.body.name;
    var url=req.body.url;
    var price=req.body.price;
    var description=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newcamps={name: name,image: url,description: description,author:author,price:price}
    //console.log(req.user);
    
    campground.create(newcamps,function(err,newly){
        if(err){
            console.log("oh no error");
         
        }
        else{
    res.redirect('/campgrounds');          
        }
    });
    //console.log(name);
    //console.log(url);
    
    //camps.push(newcamps);
  
    
});
router.get('/campgrounds/:id',function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err,foundata){
      if(err){
          console.log(err);
          
      }  else{
          console.log(foundata);
        res.render('show',{campGround:foundata});
          }
    });
    //req.params.id

    
});
//EDIT 
router.get('/campgrounds/:id/edit',check,function(req,res){
    campground.findById(req.params.id,function(err,found){
    res.render('edit',{found:found
                      });       
    });
                    
});


//UPDATE
 router.put('/campgrounds/:id',check,function(req,res){
     var name=req.body.name;
     var image=req.body.image;
     var price=req.body.price;
     var description=req.body.description;
     var updated={
         name:name,
         image:image,
         description:description,
         price:price
     }
    campground.findByIdAndUpdate(req.params.id,updated,function(err,updatedCamp){
        if(err){
            res.redirect('/campgrounds');
        }
        else{
            res.redirect('/campgrounds/'+ req.params.id);
        }
    });
 });
//DESTROY
router.delete('/campgrounds/:id',check,function(req,res){
   campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect('/campgrounds');
       }
       else{
           res.redirect('/campgrounds');
       }
   });
});
function loggedin(req,res,next){
if(req.isAuthenticated())    {
    return next();
}
    req.flash("error","You must first login"); //error is the key and using the key we pass in the message
    res.redirect('/login');
}
function check(req,res,next){
     if(req.isAuthenticated()){
         
        //does the user owns the campground?        
         campground.findById(req.params.id,function(err,found){
             
        if(err){
            req.flash("error","Campground not found");
            res.redirect('back');
        }
        else{
            //console.log(req.user.id); //-->this is the string
            //console.log(found.author.id); //-->this is the mongoose id
            if(found.author.id.equals(req.user.id)){ //-->equals comes wth the mongoose library
//res.render('edit',{found:found});                
                next();
                
            }
            else{
                req.flash("error","You don't have permission to do that");
               // res.send("you do not have the permission");
                res.redirect('back');
                
            }
            


        }
                      });

     }
    else{
        req.flash("error","You need to be logged in to do that!");
        res.redirect('back');
    }
}
module.exports=router;
