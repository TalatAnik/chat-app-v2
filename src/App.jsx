import { Routes, Route } from "react-router-dom"
import './App.css'
import Login from './components/Login'
import ChatPage from './components/ChatPage'

const App = () => {

  return (
    <Routes>
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default App