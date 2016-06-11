var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comments"),
    seedDB = require("./seeds")




mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine", "ejs");

seedDB();




app.get("/", function(req, res) {
   res.render('landing');
});

app.get("/campgrounds", function(req, res){
    
    Campground.find({}, function(err, allcampgrounds) {
       if(err){
           console.log(err);
       } else {
           res.render("index", {campgrounds: allcampgrounds});
       }
    });
    

});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description };
    
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    
    
});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
   //find the campground with provided ID
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err)
       } else {
           console.log(foundCampground);
           res.render("show", {campground: foundCampground});
       }
   });
   //render show template with that campground
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp Server has started"); 
   
});