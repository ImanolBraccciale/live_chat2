"use client";

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from './chat.module.css';

interface Message {
  username: string;
  content: string;
}
const authToken = 'Bearer your-auth-token'; // Reemplaza con tu token de autenticación

const socket = io('https://serverchat-eight.vercel.app/', {
  // Configurar los headers para la conexión
  auth: {
    authorization: authToken,
  },
});

const Chat = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    // Manejar la recepción de mensajes del servidor
    socket.emit('obtenerTodosMensajes');


    socket.on('nuevoMensaje', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('todosMensajes', (allMessages: Message[]) => {
      setMessages(allMessages);
    });
    
    // Limpieza de event listeners al desmontar el componente
    return () => {
      socket.off('nuevoMensaje');
      socket.off('todosMensajes');
      
    };
  }, []);
  
   const sendMessage = () => {
    // Enviar el mensaje al servidor
    const username = localStorage.getItem('username') || 'anonimo';
    if (newMessage.trim() !== '') {
      socket.emit('enviarMensaje', { mensaje: newMessage, username:username });
      setNewMessage(''); // Limpiar el campo de nuevo mensaje después de enviar
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h1>Live Chat</h1>
      <div id="chat" className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <p key={index} className={styles.message}>
            <strong>{msg.username}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here"
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.button}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
