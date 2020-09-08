import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { APP_FILTER } from '@nestjs/core'
import { AnyException } from './exception/any-exception'
import { ChatModule } from './modules/chat/chat.module'

@Module({
  imports: [UserModule,ChatModule],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_FILTER,
    useClass:AnyException
  }]
})
export class AppModule{
}
