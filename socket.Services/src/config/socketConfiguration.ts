const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server,{
    cors:{
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let any;
module.exports = {
    socket :any = io.on('connection', (socket:any) => {
        console.log('User Socket Connected');
        socket.on("disconnect", () => console.log(`${socket.id} User disconnected.`));
    })
};

server.listen(1923);