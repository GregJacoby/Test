var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require ("body-parser");
var LocalStrategy = require ("passport-local");
var passportLocalMongoose = require ('passport-local-mongoose');
var User = require("./models/user");



mongoose.connect("mongodb://localhost/auth_demo_app");



var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret: "may all beings be happy",
    resave: false,
    saveUninitialized: false
}))

app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//======================
// Routes
//=================

app.get("/", function(req, res) {
  res.render("home");  
})


app.get("/secret", isLoggedIn, function(req, res) {
    
   res.render("secret"); 
});

//Auth Routes
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res){
    
    
User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err) {
            console.log(err)
            return res.render('register');
        } else {
            passport.authenticate("local")(req, res, function() {
               res.redirect("/secret"); 
            });
        }
    });
    
});

//LOGIN ROUTES
//login form

app.get('/login', function(req, res){
   res.render("login") 
});


app.post('/login',passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
    }), 
    function(req, res){
});

app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
   
    
});

//function is loggedi n

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

//express listener
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server Started...")  
})