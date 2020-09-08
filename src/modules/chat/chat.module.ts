import { Module } from '@nestjs/common';
import { ChatGateway } from '../../gateway/chat.gateway'
import { ChatController } from './chat.controller'

@Module({
  providers:[ChatGateway],
  controllers:[ChatController],
})
export class ChatModule {}
