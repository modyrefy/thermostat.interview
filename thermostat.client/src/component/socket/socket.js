import React, { useEffect, useState } from 'react';
import {NotificationBox} from "../box/notificationBox";
export function SocketBox({socket,notificationMessage,eventName,doAction}){
    const [messages, setMessages] = useState({})
    const [isOPen,setIsOpen]=useState(false);
    useEffect(() => {
        const messageListener = (message) => {
            console.log('message '+ message);
            setIsOpen(true)
            doAction(message);
            //doAction();
           /*
            setMessages((prevMessages) => {
                setIsOpen(true);
                const newMessages = {...prevMessages};
                newMessages[message.id] = message;
                return 'xxxxxxx';
            });
            */
        };
        socket.on(eventName, messageListener);
        return () => {
            socket.off(eventName, messageListener);
        };
    },[socket])
        return(
            <React.Fragment>
                <NotificationBox open={isOPen}
                                 vertical='top'
                                 horizontal='left'
                                 message={notificationMessage}
                                 handleClose={()=>setIsOpen(false)}
                />
            </React.Fragment>
        );
};