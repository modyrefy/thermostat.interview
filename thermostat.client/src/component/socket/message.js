import React, { useEffect, useState } from 'react';
function Messages({ socket }) {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const messageListener = (message) => {
            //alert('messageListener')
            setMessages((prevMessages) => {
                console.log('message '+ message);
                const newMessages = {...prevMessages};
                newMessages[message.id] = message;
                return newMessages;
            });
        };

        const deleteMessageListener = (messageID) => {
            setMessages((prevMessages) => {
                const newMessages = {...prevMessages};
                delete newMessages[messageID];
                return newMessages;
            });
        };

        socket.on('message', messageListener);

        return () => {
            socket.off('message', messageListener);
        };
    }, [socket]);

    return (
        <div className="message-list">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </div>
    );
}
//https://developer.okta.com/blog/2021/07/14/socket-io-react-tutorial
export default Messages;