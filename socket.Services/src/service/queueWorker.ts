
//, callBack:(ioServer:Server,entity:object) => void
export  const QueueWorker =(io:any,message:string)=> {
    try {
        var msg = Math.random();
        console.log('socket process start');
        io.emit('message',`${message}-${msg}` )
    } catch (err: any) {
        console.log('socket error ' + err.message);
    };
}

function sleep(milliseconds:number) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}