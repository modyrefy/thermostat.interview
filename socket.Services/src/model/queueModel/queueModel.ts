export class QueueModel {
    message:string;
    type:string;
    queueName:string

    constructor(_message:string,_type:string,_queueName:string) {
        this.message=_message;
        this.type=_type;
        this.queueName=_queueName;
    }
}