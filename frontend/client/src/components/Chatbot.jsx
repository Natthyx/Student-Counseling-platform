import React, { useState } from 'react';
import prompt from '../prompts';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: prompt,
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = { role: 'user', content: inputMessage };
    setMessages([...messages, newMessage]);
    setInputMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
        credentials: 'include',
      });

      const data = await response.json();
      const botResponse = { role: 'assistant', content: data.response };
      const userResponse = {role: 'user', content: data.message}
      setMessages([...messages, userResponse, botResponse]);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="chat-container">
      <div className="card flex-grow-1">
        <div className="card-header bg-primary text-white">Chat</div>
        <div className="card-body messages-box">
          <ul className="list-unstyled messages-list">
            {messages.map((message, index) => (
              <li key={index} className={`message ${message.role === 'user' ? 'sent' : 'received'}`}>
                <div className="message-text">
                  <div className="message-sender">
                    <b>{message.role === 'user' ? 'You' : 'AI Chatbot'}</b>
                  </div>
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control message-input"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary btn-send">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
