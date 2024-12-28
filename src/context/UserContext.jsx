import { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState({}); // Centralized message state


  const emitWhenSocketReady = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    } else {
      console.error("Socket not ready. Unable to emit event:", event);
    }
  };

  useEffect(() => {
    if (user) {
      const newSocket = io('http://localhost:3000');
      setSocket(newSocket);

      newSocket.emit("join", { user });

      newSocket.on('connect', () => {
        console.log('Connected to socket server');
        console.log(user)
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      newSocket.on('onlineUsers', (onlineUsers) => {
        setUsers(onlineUsers);
        
      });

      // Handle incoming private messages
      newSocket.on('privateMessage', (message) => {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [message.sender]: [...(prevMessages[message.sender] || []), message],
        }));
      });

      return () => newSocket.disconnect();
    }
  }, [user]);

  const sendMessage = (recipient, content) => {
    const message = { sender: user, recipient, content };
    if (socket) {
      socket.emit('privateMessage', message);
    }
    setMessages((prevMessages) => ({
      ...prevMessages,
      [recipient]: [...(prevMessages[recipient] || []), message],
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, users, socket, emitWhenSocketReady, messages, sendMessage }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
