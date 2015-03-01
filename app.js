//TODO:socket.io's server begin
//require modules
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/'));

//the server begin in there
server.listen(3000, function () {
    console.log('the battle begin');
});

//TODO:socket.io+'s logic
var us = {
    io: io,
    list: []
};
us.io.on('connection', function (socket) {
    socket.on('join', function (msg) {
        if (!us.list[msg.house]) {
            us.list[msg.house] = {};
        }
        us.list[msg.house][socket.id] = msg.from;

        us.io.emit(msg.house, msg);
        console.log("数据:", msg.from, ":", "加入了", msg.house);
    });

    socket.on('send', function (msg) {
        us.io.emit(msg.house, msg);
    });

    socket.on('exit',function(msg){
        us.io.emit(msg.house,msg);
        delete us.list[msg.house][socket.id];
    });

    socket.on('list',function(msg){
        us.io.emit(socket.id,us.list[msg.house]);
    });

    socket.on('disconnect', function () {
        for(var i in us.list){
              if(us.list[i][socket.id]){
                  us.io.emit(i,{
                      type:"exit",
                      from:us.list[i][socket.id]
                  });
                  delete us.list[i][socket.id];
              }
        }
    });
});

