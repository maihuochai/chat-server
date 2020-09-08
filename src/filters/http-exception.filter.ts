import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch (exception: HttpException, host: ArgumentsHost): any {
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
        path: request.url
      })
  }
}
