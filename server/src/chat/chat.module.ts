import { Module } from '@nestjs/common';
 import { ChatService } from './chat.service';
import { ChatGateWay } from './chat.gateway';

@Module({
  providers: [ChatGateWay, ChatService],
})
export class ChatModule {}
