import React, { useEffect, useState, useRef } from 'react';
import '../Style/Chat.css';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Adjust the server URL if needed

export default function Chat({ close }) {
  const [messages, setMessages] = useState([]); // State to store messages
  const [inputMessage, setInputMessage] = useState(''); // State for input message
  const messageAreaRef = useRef(null); // Ref for message area to scroll to the bottom

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, { ...msg, type: 'incoming' }]);
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.off('message'); // Remove listener
      socket.disconnect(); // Disconnect socket
    };
  }, []);

  // Function to send messages
  const sendMessage = (message) => {
    if (!message.trim()) return; // Prevent sending empty messages

    const msg = {
      user: "sailaja", 
      message: message.trim(),
    };

    // Emit the message to the server
    socket.emit('message', msg);

    // Add the outgoing message to local state
    setMessages((prevMessages) => [...prevMessages, { ...msg, type: 'outgoing' }]);
    setInputMessage(''); // Clear input field
  };

  // Scroll to the bottom of the message area
  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="chat-header">
          <button className="close-button" onClick={close}>
            &times;
          </button>
          <h4>Chat</h4>
        </div>
        <div className="chat-window">
          <div className="message__area" ref={messageAreaRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <h4>{msg.user}</h4>
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-input">
          <input
            type="text"
            className="message-input"
            placeholder="Type your message here"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                sendMessage(inputMessage);
              }
            }}
          />
          <button className="send-button" onClick={() => sendMessage(inputMessage)}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
