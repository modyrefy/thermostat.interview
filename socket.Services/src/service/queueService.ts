import {QueueModel} from "../model/queueModel/queueModel";
import {sleep} from "../helper/common";

let io = require('../config/socketConfiguration');
var amqp = require('amqplib/callback_api');

amqp.connect(process.env.RABBIT_MQ_CONNECTION as string, function (error0:any, connection:any) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1:any, channel:any) {
        if (error1) {
            throw error1;
        }
        var queue = process.env.RABBIT_MQ_QUEUE_NAME as string;
        channel.assertQueue(queue, {
            durable: false
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for stockData messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (data:any) {
            var stock:QueueModel = JSON.parse(data.content.toString())
            console.log(" [x] Received Stock:", stock.message );
            //Socket Trigger All Clients
            io.socket.emit("message",  stock.message);
            console.log('before ' +new Date());
            sleep(3000);
            console.log('after ' +new Date());
        }, {
            noAck: true
        });
    });
});


function sleep1(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}