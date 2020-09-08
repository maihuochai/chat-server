import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param, ParseUUIDPipe,
  Post,
  UseFilters, UseGuards, UsePipes
} from '@nestjs/common'
import { UserService } from './user.service'
import {  LoginUserDto, User } from '../../types/user'
import { HttpExceptionFilter } from '../../filters/http-exception.filter'
import { LoginValidationPipe } from '../../pipe/login-validation.pipe'
import { TransformPipe } from '../../pipe/transform.pipe'
import { AuthGuard } from '../../guard/auth.guard'

@Controller({
  path: '/user'
})
export class UserController {
  constructor (private readonly userService: UserService) {
  }

  @Get('getUser/:id')
  // 指定需要转换的是id，并传入管道实例
  getUser (@Param('id',new ParseUUIDPipe()) params): User | null {
    return this.userService.getUser(params.id)
  }

  @Get('getAll')
  @UseGuards(AuthGuard)
  getAllUser () {
    return this.userService.getAllUser()
  }


  @Post('login')
  @UsePipes(new LoginValidationPipe())
  login (@Body() user:LoginUserDto) {
    return 'success'
  }

  @Get('/expansionAsString')
  expansion(@Param() params:string):string{
    return params
  }
}
