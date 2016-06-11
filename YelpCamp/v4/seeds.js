var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments")

var data = [
    {name:"Cloud's Perch",
    image: "https://gringotrailblog.files.wordpress.com/2014/05/p1040348.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur augue elit, vel commodo massa auctor ut. Vestibulum auctor erat feugiat, ullamcorper lacus at, bibendum tellus. Sed eu fermentum dui. Mauris id lectus eu ex ultricies pretium. Fusce suscipit felis nec sollicitudin ultrices. Nulla lacinia feugiat egestas. Vestibulum cursus velit a mi aliquam ornare. Phasellus maximus tellus sed interdum ornare. Praesent pharetra lacus eu dui ultrices dignissim. Donec ut ex id leo fringilla eleifend. Sed ex mi, lobortis et condimentum a, finibus eget neque. Aliquam in euismod lorem. Ut ornare, nisi quis tristique aliquam, orci nisl congue turpis, eu vehicula purus turpis nec justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed orci ex, eleifend et nulla vel, egestas convallis ipsum. Morbi fermentum in enim eleifend pellentesque."},
    
   {name:"Rocky Love",
    image: "https://img.buzzfeed.com/buzzfeed-static/static/enhanced/webdr02/2013/6/10/22/enhanced-buzz-wide-3591-1370918733-4.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur augue elit, vel commodo massa auctor ut. Vestibulum auctor erat feugiat, ullamcorper lacus at, bibendum tellus. Sed eu fermentum dui. Mauris id lectus eu ex ultricies pretium. Fusce suscipit felis nec sollicitudin ultrices. Nulla lacinia feugiat egestas. Vestibulum cursus velit a mi aliquam ornare. Phasellus maximus tellus sed interdum ornare. Praesent pharetra lacus eu dui ultrices dignissim. Donec ut ex id leo fringilla eleifend. Sed ex mi, lobortis et condimentum a, finibus eget neque. Aliquam in euismod lorem. Ut ornare, nisi quis tristique aliquam, orci nisl congue turpis, eu vehicula purus turpis nec justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed orci ex, eleifend et nulla vel, egestas convallis ipsum. Morbi fermentum in enim eleifend pellentesque."},
    
    {name:"Winter's Respite",
    image: "http://distractify-media-prod.cdn.bingo/1475294-980x.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur augue elit, vel commodo massa auctor ut. Vestibulum auctor erat feugiat, ullamcorper lacus at, bibendum tellus. Sed eu fermentum dui. Mauris id lectus eu ex ultricies pretium. Fusce suscipit felis nec sollicitudin ultrices. Nulla lacinia feugiat egestas. Vestibulum cursus velit a mi aliquam ornare. Phasellus maximus tellus sed interdum ornare. Praesent pharetra lacus eu dui ultrices dignissim. Donec ut ex id leo fringilla eleifend. Sed ex mi, lobortis et condimentum a, finibus eget neque. Aliquam in euismod lorem. Ut ornare, nisi quis tristique aliquam, orci nisl congue turpis, eu vehicula purus turpis nec justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed orci ex, eleifend et nulla vel, egestas convallis ipsum. Morbi fermentum in enim eleifend pellentesque."}
    
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