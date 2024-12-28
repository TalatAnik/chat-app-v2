import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './ChatWindow.css';

// eslint-disable-next-line react/prop-types
const ChatWindow = ({ recipient, onClose }) => {
  const { user, messages, sendMessage } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState('');

  const recipientMessages = messages[recipient] || [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(recipient, newMessage.trim());
      setNewMessage('');
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(); // Send message when Enter is pressed
    }
  };
  


  return (
    <div className="chat-window">
      <div className="chat-header">
        <h4>Chat with {recipient}</h4>
        <button onClick={onClose}>X</button>
      </div>
      <div className="chat-messages">
        {recipientMessages.map((msg, index) => (
          <>
            
            {msg.sender != user && <div className='sender'>{recipient}:</div>}
            
            <div
                key={index}
                className={`message ${msg.sender === user ? 'sent' : 'received'}`}
            >
                
                {msg.content}
            </div>
          </>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress} // Listen for key press
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
