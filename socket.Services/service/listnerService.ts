var amqp = require('amqplib/callback_api');
export  const testPublisher=async(param:string, doAction: (a: string,b:string) => void)=>{
    console.log(param);
    doAction(param,'xxxxxxxxxxxxxxxxx');
}
export  const MessageListner =async(queueName:string)=> {
    var message :string=null;
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
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);
            channel.consume(queueName, function(data) {
                message=JSON.parse(data.content.toString())
                console.log(" [x] Received %s", message);
            }, {
                noAck: true
            });
        });
    });

}