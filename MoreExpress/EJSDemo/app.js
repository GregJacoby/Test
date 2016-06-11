var express = require('express');
var app = express();

//tell express we're using EJS
app.set("view engine", "ejs");
//serve public dr
app.use(express.static("public"));

//get home page
app.get("/", function(req, res) {
    res.render("home"); 
});


app.get("/fallinlovewith/:thing", function(req, res) {
   var thing = req.params.thing;
   res.render("love", {thingVar: thing})
});

app.get("/posts", function(req, res){
   var posts = [
      {title: "Post 1", author: "Susy"},
      {title: "My bun bun", author: "Chrissy"},
      {title: "Look at this!", author: "greggy"},
      ]
res.render("posts", {posts: posts})

});
//Tell Express to listen
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server has started!") 
});