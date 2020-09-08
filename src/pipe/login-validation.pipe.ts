import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { LoginUserDto } from '../types/user'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

/**
 使用@Injectable()装饰器,需要实现PipeTransform的transform方法
 PipeTransform<T, R>是一个通用类型接口，T为value的值，R为transform方法返回的值
 */
@Injectable()
export class LoginValidationPipe implements PipeTransform<LoginUserDto, Promise<LoginUserDto>> {
  async transform (value: LoginUserDto, { metatype }: ArgumentMetadata): Promise<LoginUserDto> {
    // 当不是JavaScript数据类型时跳过验证
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    // 转换JavaScript的参数为可验证的类型对象
    const object = plainToClass(metatype, value)
    // 对数据进行验证
    const errors = await validate(object)
    // 如果有错误，则抛出第一个错误
    if (errors.length > 0) {
      throw new BadRequestException(errors[0])
    }
    return value
  }

  private toValidate (metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
