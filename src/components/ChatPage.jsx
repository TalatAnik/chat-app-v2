import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import './ChatPage.css';

const ChatPage = () => {
  const [activeChats, setActiveChats] = useState([]);

  const openChat = (username) => {
    if (!activeChats.includes(username)) {
      setActiveChats((prevChats) => [...prevChats, username]);
    }
  };

  const closeChat = (username) => {
    setActiveChats((prevChats) => prevChats.filter((chat) => chat !== username));
  };

  return (
    <div className="chat-page">
      <Sidebar onUserSelect={openChat} />
      <div className="chat-windows">
        {activeChats.map((username) => (
          <ChatWindow
            key={username}
            recipient={username}
            onClose={() => closeChat(username)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
