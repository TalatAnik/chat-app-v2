import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import './Sidebar.css';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ onUserSelect }) => {
  const { user, users } = useContext(UserContext); // Online usernames from context
  const [allUsers, setAllUsers] = useState([]); // All users fetched from the API
  const [onlineUsers, setOnlineUsers] = useState([]); // Online users (user objects)
  const [offlineUsers, setOfflineUsers] = useState([]); // Offline users (user objects)

  // Fetch all users from the database
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setAllUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchAllUsers();
  }, []);

  // Update onlineUsers and offlineUsers when allUsers or users change
useEffect(() => {
  // Extract online usernames from the UserContext `users`
  const onlineUsernames = users.map((u) => u.username); // Extract usernames from online users array

  // Filter the allUsers to get online users (users who are online and not the logged-in user)
  const online = allUsers.filter(
    (allUser) =>
      onlineUsernames.includes(allUser.username) && allUser.username !== user // Match online users and exclude logged-in user
  );

  // Filter the allUsers to get offline users (users who are not online and not the logged-in user)
  const offline = allUsers.filter(
    (allUser) =>
      !onlineUsernames.includes(allUser.username) && allUser.username !== user // Exclude online users and logged-in user
  );

  // Set the online and offline users state
  setOnlineUsers(online);
  setOfflineUsers(offline);
}, [allUsers, users, user]);

  
  return (
    <div className="sidebar">
      <h4>Users</h4>
      <ul className="user-list">
        {/* Online users list */}
        {onlineUsers.map((onlineUser) => (
          <li
            key={onlineUser._id} // Use _id as the unique key
            className="user-item"
            onClick={() => onUserSelect(onlineUser.username)}
          >
            <span className="status-indicator online"></span>
            {onlineUser.username}
          </li>
        ))}

        {/* Offline users list */}
        {offlineUsers.map((offlineUser) => (
          <li
            key={offlineUser._id} // Use _id as the unique key
            className="user-item"
            onClick={() => onUserSelect(offlineUser.username)}
          >
            <span className="status-indicator offline"></span>
            {offlineUser.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
