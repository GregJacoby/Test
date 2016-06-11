var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments")

var data = [
    {name:"Cloud's Perch",
    image: "https://gringotrailblog.files.wordpress.com/2014/05/p1040348.jpg",
    descrpition: "A beautiful place."},
    
   {name:"Rocky Love",
    image: "https://img.buzzfeed.com/buzzfeed-static/static/enhanced/webdr02/2013/6/10/22/enhanced-buzz-wide-3591-1370918733-4.jpg",
    descrpition: "A beautiful place."},
    
    {name:"Cloud's Perch",
    image: "https://gringotrailblog.files.wordpress.com/2014/05/p1040348.jpg",
    descrpition: "A beautiful place."}
    
    ]

function seedDB(){
    //remove campgrounds
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds!");
            
            
            data.forEach(function(seed){
            
            Campground.create(seed, function(err, campground){
                if(err) {
                    console.log(err)
                } else {
                    console.log("added a campground!")
                    //create a comment
                    Comment.create(
                        
                        {text: "This place is amazing. Very healing.",
                        author: "Poopy Mcpoopers",
                        }
                        
                        , function(err, comment) {
                           if(err){
                                console.log(err)
                            } else {
                                campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                            }
                            
                        });
                }
            });
});

});



}

module.exports = seedDB;