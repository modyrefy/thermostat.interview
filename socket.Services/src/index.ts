/*
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http,{
    cors:{
        origin: '*',
        methods: ['GET', 'POST']
    }
});
import * as dotenv from "dotenv";
import {QueueWorker} from "./service/queueWorker";
dotenv.config();
const PORT= 3005


http.listen(PORT).on('error', (err: any) => {
    console.log('✘ Application failed to start');
    console.error('✘', err.message);
    process.exit(0);
}).on('listening', () => {
    console.log('✔ Application Started');
    console.log(`Listening on port  http://localhost:${PORT}`);

    io.on("connection", function(socket:any) {
        console.log('socket connected');
    });
    setInterval( function() {
        var msg = Math.random();
        QueueWorker(io,"message");
        console.log (msg);
    }, 1000);
    //QueueWorker(io,"message");
});
*/

import * as dotenv from "dotenv";
import {io} from "./config/socket"
dotenv.config();
import {QueueWorker} from "./service/queueWorker";
import {MessageListener} from "./service/listnerService";
import {sleep} from "./helper/common";
/*
setInterval( function() {
    var msg = Math.random();
   // QueueWorker(io,`testttt ${msg}`)
    QueueWorker(io,process.env.RABBIT_MQ_QUEUE_NAME)
    //io.emit('message',`testttt ${msg}` );
    console.log (msg);
}, 1000);
*/
setInterval(()=> MessageListener(io,"DEVICE_MANAGER_QUEUE"),5000);
//setTimeout(()=>{QueueWorker(io,"xxxxxxxxxx")},5000);

