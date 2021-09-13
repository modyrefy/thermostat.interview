
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http,{
    cors:{
        origin: '*',
        methods: ['GET', 'POST']
    }
});


http.listen(3017, function(){
    console.log('listening on *:3001');
});

io.on("connection", function(socket:any) {
    console.log('socket connected');
});
export { io}
