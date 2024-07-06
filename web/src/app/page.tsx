"use client"
import { useState, useEffect } from 'react';
 import Chat from './components/chat';
import Login from './components/auth';
 

const Home = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (username: string) => {
    setUsername(username);
  };

  return (
    <div>
     
      <main>
        <h1>Chat Application</h1>
        {username ? <Chat /> : <Login onLogin={handleLogin} />}
      </main>
    </div>
  );
};

export default Home;
