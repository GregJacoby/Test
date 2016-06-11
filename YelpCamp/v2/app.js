var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");



mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine", "ejs");


//Schema Setup

var Campground = require("./models/campgrounds")


// Campground.create(

//      {name: "Granite Hill", image:"http://photosforclass.com/download/11407596925"},
//      function(err, campground){
         
//      if(err){
//          console.log(err);
//      } else {
//          console.log("newly created campground");
//          console.log(campground);
//      }
    
    
    
//     });


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
    
//   res.render('campgrounds', {campgrounds: campgrounds});
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
   Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err)
       } else {
           res.render("show", {campground: foundCampground});
       }
   });
   //render show template with that campground
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp Server has started"); 
   
});