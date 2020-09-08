import { IsString, Length } from 'class-validator'

export class User {
  readonly username: string
  readonly password: string
  readonly sex: 0 | 1
  readonly email: string
}

export class LoginUserDto {
  @Length(5,20,{message:'用户名在5-20位之间'})
  @IsString({ message: '请输入用户名' })
  username: string

  @Length(6,20,{message:'密码名在6-20位之间'})
  @IsString({ message: '请输入密码' })
  password: string
}
