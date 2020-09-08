import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { LoggerMiddleware } from '../../middleware/logger.middleware'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule implements NestModule{
  configure (consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .exclude('user/login')
      .forRoutes({
        path:'user',
        method:RequestMethod.ALL
      })
  }
}
