import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // Handle the exception
    let {
      message, 
      error, 
      statusCode
    } = exception.response;

    // throw new HttpException(message, statusCode);
    

    return;
  }
}
