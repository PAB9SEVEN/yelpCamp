var mongoose=require('mongoose');
var campground=require('./models/campground');
var Comment=require('./models/comment');

var data=[
    {
        name:'clouds',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnzYAPM_l3E8WrnV6XKBKlNjPHDbH3ZcuMuhIhD4RQyTTJ_Kk9',
        description:'nicer blue gren'
    },
    {
        name:'misty',
        image:"https://static.pexels.com/photos/60006/spring-tree-flowers-meadow-60006.jpeg",
        description:'asdfgh dfghj yuk'
    }
    
    
];
function seedDB(){
campground.remove({},function(err){
    //REMOVE THE DATA
    /*
    if(err){
        console.log(err);
    }
    else{
        console.log('removed the campgrounds');
            //add
data.forEach(function(seed){
    campground.create(seed,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log("added");
            Comment.create({text:"this is a great place woithout the internet",
                            author:"Preet bangad"
                
            },function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
//                    console.log(campground.comments);
                    
                   campground.comments.push(comment);
                    campground.save();
                   console.log("created a new comment");
                }
            });
        }
    });
});
    }
*/
});

}
module.exports=seedDB;

