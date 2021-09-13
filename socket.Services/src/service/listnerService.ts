import {QueueModel} from "../model/queueModel/queueModel";
import {sleep} from "../helper/common";

var amqp = require('amqplib/callback_api');
//, callBack:(ioServer:Server,entity:object) => void
export  const MessageListener =(io:any,queueName:string)=> {
    var message:QueueModel;
    const INTERVAL_MS:number= parseInt(process.env.INTERVAL_MS as string);
    console.log('INTERVAL_MS' + INTERVAL_MS);
    amqp.connect(process.env.RABBIT_MQ_CONNECTION, function (error: any, connection: any) {
        if (error) {
            throw error;
        }
        connection.createChannel(function (error: any, channel: any) {
            if (error) {
                throw error;
            }
           channel.prefetch(1);
            channel.assertQueue(queueName, {
                durable: false
            })
               channel.prefetch(1);
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);
            channel.consume(queueName,  function (data:any) {

                    message = JSON.parse(data.content.toString())
                    //console.log(new Date())
                    console.log(" [x] Received %s", message);
                    //callBack(io,message);
                    io.emit('message',message.message );
                    sleep(INTERVAL_MS);
                    //console.log('after ' + new Date());
                }
            , {
                noAck: true
            }
            );
        });
    });
}

