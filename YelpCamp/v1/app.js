var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine", "ejs");

 var campgrounds = [
        {name: "Salmon Creek", image: "http://photosforclass.com/download/8737645223"},
        {name: "Granite Hill", image:"http://photosforclass.com/download/11407596925"},
        {name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/7121863467"}
        ];
        
app.get("/", function(req, res) {
   res.render('landing');
});

app.get("/campgrounds", function(req, res){
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
    
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp Server has started"); 
});