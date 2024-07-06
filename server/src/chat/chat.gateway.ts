import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({
  cors: true,
  path: '/socket.io',
})
export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  public server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    const authToken = client.handshake.headers.authorization;
    console.log(`Token de autenticación recibido: ${authToken}`);

    const mensajes = this.chatService.obtenerMensajes();
    client.emit('todosMensajes', mensajes);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('enviarMensaje')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: { mensaje: string, username: string }): void {
    if (!client) {
      console.log(`Error: Cliente no encontrado`);
      return;
    }
    
    const authToken = client.handshake.auth.authorization;
    if (!authToken || !authToken.startsWith('Bearer ')) {
      console.log('Error: Token no encontrado en el header Authorization');
      return;
    }
    if (!data.mensaje) return;
    
    const token = authToken.split(' ')[1];
    const username = data.username || 'anonimo';  // Nombre de usuario enviado por el cliente
    
    this.chatService.guardarMensaje(data.mensaje);
    this.server.emit('nuevoMensaje', { content: data.mensaje, remitente: username });
  }

  @SubscribeMessage('obtenerTodosMensajes')
  handleObtenerTodosMensajes(@ConnectedSocket() client: Socket): void {
    if (!client) {
      console.log(`Error: Cliente no encontrado`);
      return;
    }

    const mensajes = this.chatService.obtenerMensajes();
    client.emit('todosMensajes', mensajes);
  }
}
