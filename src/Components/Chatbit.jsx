import React, { useState } from 'react';
import '../Style/Chatbot.css';

const key = "AIzaSyAQmCi7abdZ0gVxejCKbGlZ2zeOTKoFDgo";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`;

export default function Chatbit() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    if (inputText.trim() === '') {
      return;
    }

    // Add the user's outgoing message to the state
    const outgoingMessage = { text: inputText, type: 'outgoing' };
    setMessages((prevMessages) => [...prevMessages, outgoingMessage]);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: inputText }] }],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const incomingMessage = {
          text: data.candidates[0]?.content?.parts[0]?.text || 'No response received.',
          type: 'incoming',
        };
        // Add the incoming message to the state
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      } else {
        console.error('Error fetching data from the API:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data from the API:', error);
    }
    setInputText(''); // Clear the input field
  };

  return (
    <div className='Chatbot'>
    <div className="chat-card">
      <div className="chat-header">
        <div className="h2">Jarvis</div>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'incoming' ? 'incoming' : 'outgoing'}`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type your message"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
    </div>

  );
}
