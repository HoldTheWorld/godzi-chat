import React, { useState, useEffect } from 'react';
import socket from './socket'; 
import './App.css'; 

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('Component mounted');
    const handleMessage = (msg) => {
      console.log('Received message on client:', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on('message', handleMessage);

    return () => {
      console.log('Component unmounted');
      socket.off('message', handleMessage);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      socket.emit('message', message);
      setMessage('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Godzilla Chat</h1>
      </header>
      <main className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">{msg}</div>
          ))}
        </div>
        <div className="input-container">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="input-field"
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage} className="send-button">Send</button>
        </div>
      </main>
    </div>
  );
}

export default App;
