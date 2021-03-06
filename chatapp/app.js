var express = require('express');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var mongoose = require("mongoose");
var users = {
    
}
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/chat");

var chatSchema = mongoose.Schema({
    nick: String,
    msg: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var Chat = mongoose.model('Message', chatSchema);

server.listen(process.env.PORT, process.env.IP, function() {
   console.log("Chat Server has started"); 
   
});

app.get("/", function(req, res) {
   res.render("index") 
});

app.get("/poop", function(req, res) {
   res.send("poop") 
});





io.sockets.on('connection', function(socket) {
    var query = Chat.find({});
    query.sort('-created').limit(8).exec(function(err, docs) {
       if(err) throw(err);
       console.log('Sending old msgs');
       socket.emit('load old msgs', docs);
    });
    
    
    socket.on('new user', function(data, callback) {
       if (data in users) {
           callback(false);
       } else {
           callback(true);
           socket.nickname = data;
           users[socket.nickname] = socket;
        
           updateNicknames();
       }
    });
    
    function updateNicknames() {
        io.sockets.emit('usernames', Object.keys(users));
    }
    socket.on('send message', function(data, callback) {
        var msg = data.trim();
        if(msg.substr(0, 3) === '/w ') {
            msg = msg.substr(3);
            var ind = msg.indexOf(' ');
            if(ind !== -1) {
                var name = msg.substring(0, ind);
                var msg = msg.substring(ind + 1);
                if(name in users) {
                    users[name].emit('whisper', {msg: msg, nick: socket.nickname})
            console.log('whisper')
                } else {
                    callback('Error! Enter a valid user.');
                }
            } else {
                callback('Error! Please enter a message for your whisper.')
            }
        } else {
            var newMsg = new Chat({msg:msg, nick:socket.nickname});
            newMsg.save(function(err){
                if(err) throw err;
       io.sockets.emit('new message', {msg: msg, nick: socket.nickname}); 
            });
       //or send to everyone but the sender
       //socket.broadcast.emit('new message', data);
        }
    });
    
    socket.on('disconnect', function(data) {
       if(!socket.nickname) {
           return
       } delete users[socket.nickname];
    updateNicknames()
    });
});