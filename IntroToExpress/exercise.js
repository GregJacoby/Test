var express = require("express");
var app = express();


app.get("/", function(req, res){
   res.send("Hi! Welcome to my assignment.") 
    
});

app.get("/speak/:animal", function(req, res){
   var animal = req.params.animal.toLowerCase();
var sounds = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof Woof!",
    cat: "Meow!",
    goldfish: "..."
}
var sound = sounds[animal];
res.send("The " + animal + " says" + "'" + sound + "'")
});
app.get("/repeat/:string/:num", function(req, res) {
    var string = req.params.string + " ";
    var num = req.params.num;
res.send(string.repeat(num));
    
    // for(i = 0; i <= num; i++) {
    //     console.log(string);
    // }
});

app.get("*", function(req, res){
   res.send("this isn't a valid page, you silly goose!") 
});
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server has started!");
});