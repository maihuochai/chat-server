import { Controller, Get, HttpCode, Post, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('basic')
export class AppController {
  constructor (private readonly appService: AppService) {
  }

  @Get('getHello')
  @HttpCode(200)
  getHello (): string {
    return this.appService.getHello()
  }

  @Get('getName')
  getName (@Query() query): string {
    console.log(query)
    return this.appService.getName()
  }
}
