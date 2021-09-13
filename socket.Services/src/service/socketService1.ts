import exp = require("constants");

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server,{
        cors: {
            origin: "*",
        }
    })

server.listen(process.env.PORT || 8899);
console.log('Server Running...');



io.sockets.on('connection', function(socket){
    console.log('Socket Connected...');

    // Send Message
    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg: data});
    });
});

export {io};