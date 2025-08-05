import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm Volt-EV Chatbot. How can I help you today?",
      isBot: true
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const predefinedQuestions = [
    "How many vehicles do you have?",
    "What's your price range?",
    "How far can the cars go?",
    "Tell me about charging",
    "Show me available vehicles",
    "I need help"
  ];

  const getBotResponse = async (userMessage) => {
    try {
      const response = await axios.post('http://localhost:8080/api/chatbot/query', {
        message: userMessage
      });
      return response.data.response;
    } catch (error) {
      return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
  };

  const sendMessage = async (messageText) => {
    if (messageText.trim() === '') return;

    const userMessage = { text: messageText, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    const botResponseText = await getBotResponse(messageText);
    const botResponse = { text: botResponseText, isBot: true };
    setMessages(prev => [...prev, botResponse]);
  };

  const handleSendMessage = () => {
    sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Toggle Button */}
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Volt-EV Chatbot</h3>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.isBot ? 'bot' : 'user'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
            
            {messages.length === 1 && (
              <div className="predefined-questions">
                <p className="questions-label">Quick questions:</p>
                <div className="questions-grid">
                  {predefinedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="predefined-question-btn"
                      onClick={() => sendMessage(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about our vehicles..."
              className="chatbot-input-field"
            />
            <button 
              onClick={handleSendMessage}
              className="send-btn"
              disabled={!inputMessage.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 