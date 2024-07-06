import { Injectable } from '@nestjs/common';
 
export interface Message {
  username: string;
  content: string;
}

@Injectable()
export class ChatService {
  private messages: Message[] = [];

  guardarMensaje(mensaje: string,username:string): Message {
    const newMessage: Message = {
      username: username,
      content: mensaje,
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  obtenerMensajes(): Message[] {
    return this.messages;
  }
}

