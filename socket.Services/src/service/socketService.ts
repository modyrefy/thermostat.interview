import {QueueModel} from "../model/queueModel/queueModel";
import {io} from "../config/socket";
import {Server} from "socket.io";
export const  SocketPublisher=(io:Server ,message:QueueModel )=> {
    try {
        console.log('socket process start');
        io.emit('message',message.message )
    } catch (err: any) {
        console.log('socket error ' + err.message);
    };
}


