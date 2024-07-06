"use client"
import { useState } from 'react';
import styles from './Login.module.css';

const Login = ({ onLogin }: { onLogin: (username: string) => void }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim() !== '') {
      localStorage.setItem('username', username);
      onLogin(username);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Enter your username</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className={styles.input}
      />
      <button onClick={handleLogin} className={styles.button}>Login</button>
    </div>
  );
};

export default Login;
