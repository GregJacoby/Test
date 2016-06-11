var express = require("express");
var app = express();


// "/" => "Hi There!"
app.get("/", function(req, res) {
   res.send("Hi there!"); 
});
// "/bye" => "goodbye!"
app.get("/bye", function(req, res) {
   res.send("Goodbye!"); 
});
// "/dog" => "meow!"
app.get("/dog", function(req, res) {
    console.log("someone made a request!");
   res.send("meow!"); 
});

app.get("/r/:subredditName", function(req, res) {
   var subreddit = req.params.subredditName;
   res.send("welcome to the " + subreddit.toUpperCase() + " subreddit!"); 
});

app.get("*", function(req, res) {
   res.send("sowwy :( page not found!") 
});


//Tell Express to Listen
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server has started!");
});