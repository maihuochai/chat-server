import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class TransformPipe implements PipeTransform<number,string> {
  transform (value: number, metadata: ArgumentMetadata): string {
    if (isNaN(value)) {
      throw new BadRequestException('请输入有效的id')
    }
    return value.toString()
  }
}
