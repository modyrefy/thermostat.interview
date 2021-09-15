export class QueueModel {
    message:object;
    type:string;
    queueName:string

    constructor(_message:object,_type:string,_queueName:string) {
        this.message=_message;
        this.type=_type;
        this.queueName=_queueName;
    }
}