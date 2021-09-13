

export const  TestPublisher=(io:any ,message:string )=> {
    try {
        console.log('socket process start');
        io.emit('message',message )
    } catch (err: any) {
        console.log('socket error ' + err.message);
    };
}