import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

export interface Message {
  id: number;
  content: string;
}

@Injectable()
export class ChatService {
  private messages: Message[] = [];

  guardarMensaje(mensaje: string): Message {
    const newMessage: Message = {
      id: this.messages.length + 1,
      content: mensaje,
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  obtenerMensajes(): Message[] {
    return this.messages;
  }
}

