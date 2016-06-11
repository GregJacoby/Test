var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    LocalStrategy = require ("passport-local"),
    passportLocalMongoose = require ('passport-local-mongoose'),
    expressSanitizer = require("express-sanitizer"),
    passport = require("passport"),
    app = express(),
   User = require("./models/user");
    app.use(require("express-session")({
    secret: "may all beings be happy",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
mongoose.connect("mongodb://localhost/restful_blog_app");


//tell express to use ejs
app.set("view engine", "ejs");

//serve public dir
app.use(express.static("public"));
    
//tell express to use body parser
app.use(bodyParser.urlencoded({extended:true}));

//tell express to use method override
app.use(methodOverride("_method"));

//tell express to use sanitizer
app.use(expressSanitizer());

//set database schema for blog posts
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now} 
});

//compile mongoose model
var Blog = mongoose.model("Blog", blogSchema);


//index routes
app.get("/blogs", function(req, res) {
    Blog.count(function (err, count) {
    if (!err && count === 0) {
        return res.render("index1");
    } Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index", {blogs: blogs});
        }
    });
});
    
});

app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

//new & create routes
app.get("/blogs/new",isLoggedIn, function(req, res){
   res.render("new"); 
});


app.post("/blogs", function(req, res) {
    
req.body.blog.body = req.sanitize(req.body.blog.body);
    
   Blog.create(req.body.blog, function(err, newBlog) {
       
       if(err) {
           res.render("new");
       } else {
           res.redirect("/blogs");
       }
       
   });
});

//show route
app.get("/blogs/:id", function(req, res) {
Blog.findById(req.params.id, function(err, showBlog) {
    if(err) {
        res.redirect("/blogs");
    } else {
        res.render("show", {blog: showBlog});
    }
});
});

// edit route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, editBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render('edit', {blog: editBlog});
        }
    });
});

//update route
app.put("/blogs/:id", function(req, res) {
    
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
      if(err){
          res.redirect("/blogs");
      } else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

//delete
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});


app.get("/register", function(req, res){
    
    
   res.render("register"); 
    
});

app.post("/register", function(req, res) {
    
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err) {
            console.log(err)
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function() {
               res.redirect("/blogs"); 
            });
        }
    });
    
    
});

app.get("/login", function(req, res) {
    
   res.render("login") 
});

app.post('/login',passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/blogs"
    }), 
    function(req, res){
});

app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
   
    
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/blogs");
};

//tell express to listen
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Blog server is running"); 
});