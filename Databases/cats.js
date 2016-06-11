var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");


var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String,
    
});

var Cat = mongoose.model("Cat", catSchema);



//adding a new cat to the DB

// var george = new Cat({
//   name: "Mrs. Norris",
//   age: 7,
//   temperament: "Evil"
// });

// george.save(function(err, cat) {
//   if(err){
//       console.log("oops! something has gone wrong")
//   }  else {
//       console.log("we saved a cat to the db!")
//       console.log(cat);
//   }
// });

Cat.create({
   name: "Snowpea",
   age: 15,
   temperament: "Affectionate"
    
}, function(err, cat){
    if(err){
        console.log(err)
    } else {
        console.log(cat)
    }
}


);
//retrieve cats from DB and console log them

Cat.find({}, function(err, cats){
    if(err){
        console.log("uh oh, error");
        console.log(err);
    } else {
        console.log("all the cats.....")
        console.log(cats);
    }
});