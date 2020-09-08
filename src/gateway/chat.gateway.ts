// https://github.com/shadow88sky/Nest-WebSocket
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

interface Record{
  username:string;
  message:string;
}

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect{
  @WebSocketServer() server:Server
  users:{[id:string]:string}={}
  recording:Array<Record>=[]

  handleConnection (client: Socket, ...args: any[]): any {
    console.log(client.client.id)
  }

  handleDisconnect (client: Socket): any {
    delete this.users[client.id]
    this.server.emit('Users',this.users)
  }

  // 监听客户端发送的‘chart’消息
  @SubscribeMessage('Chat')
  async onChat(@MessageBody() data:any,@ConnectedSocket() client:Socket){
    if (this.recording.length===200){
      this.recording=[]
    }
    this.recording.push({
      username:this.users[client.id],
      message:data
    })
    this.server.emit('Record',this.recording)
  }

  @SubscribeMessage('Login')
  onLogin(@MessageBody() data: { username:string },@ConnectedSocket() client:Socket){
    this.users[client.id]=data.username
    this.server.emit('Users',this.users)
  }
}
