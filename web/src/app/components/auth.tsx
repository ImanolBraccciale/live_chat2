"use client"
import { useState } from 'react';

const Login = ({ onLogin }: { onLogin: (username: string) => void }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim() !== '') {
      localStorage.setItem('username', username);
      onLogin(username);
    }
  };

  return (
    <div >
      <h1>Enter your username</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button onClick={handleLogin} >Login</button>
    </div>
  );
};

export default Login;
