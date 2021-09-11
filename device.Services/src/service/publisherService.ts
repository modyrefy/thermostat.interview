
var amqp = require('amqplib/callback_api');
export  const SendMessage =async(message:string,queueName:string)=> {
    amqp.connect(process.env.RABBIT_MQ_CONNECTION, function (error: any, connection: any) {
        if (error) {
            throw error;
        }
        connection.createChannel(function (error: any, channel: any) {
            if (error) {
                throw error;
            }
            channel.assertQueue(queueName, {
                durable: false
            });
            channel.sendToQueue(queueName, Buffer.from(message));
            console.log(" [x] Sent %s", message);
        });
        /*
                setTimeout(function() {
                    connection.close();
                    process.exit(0);
                }, 500);
          */
    });
};



