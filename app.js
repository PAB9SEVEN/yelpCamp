var express=require('express');
var exphbs=require('express-handlebars');
var path=require('path');
//var port=8000;
var campground=require('./models/campground');
var bodyParser=require('body-parser');
var Comment=require('./models/comment');
var passport=require('passport');
var localStrategy=require('passport-local');
var User=require('./models/user');
var methodOverride=require('method-override');
var flash=require('connect-flash');

//var user=require('./models/user');
var seedDB=require('./seed');
var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost/yelpcamp');
mongoose.connect('mongodb://preeti:rusty@ds157799.mlab.com:57799/yelpcampdb');
//mongodb://preeti:rusty@ds157799.mlab.com:57799/yelpcampdb
//seedDB();
//passport configuration
var app=express();
var commentroutes=require('./routes/comments');
var campgroundroutes=require('./routes/campground');
var authroutes=require('./routes/auth');
app.use(flash());
app.use(require('express-session')({
    secret:"cats",
    resave:false,
    saveUninitialized:false
}));
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');
app.use(express.static(__dirname+"/public"));
    app.set('partials',path.join(__dirname + '/views','partials'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req,res,next){
    res.locals.currentuser=req.user;
    res.locals.error=req.flash('error');
    res.locals.success=req.flash('success');
    
    next();
});

//setting up the schema

/*
campground.create(
    {name:'samon creek',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWqGNZsy8h7WMP6gL7xIvoWL3WRd6HSsD15grDFW3CnOvtaEN3',description:"this is very beautiful"},function(err,campground){
    if(err){
        console.log("oops error");
        
    }
    else{
        console.log("passed");
        console.log(campground);
    }
});
*/
app.use(authroutes);
app.use(campgroundroutes);
app.use(commentroutes);

app.set('port',process.env.PORT||8000);

app.listen(app.get('port'),function(){
   console.log('server started on '+app.get('port'));
    
});
