import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

@Catch()
export class AnyException implements ExceptionFilter{
  catch (exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    response
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message:exception.response,
        path: request.url
      })
  }

}
