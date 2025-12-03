import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        response.status(HttpStatus.CONFLICT).json({
          message: `Conflict occurred @ ${request.url}`,
          pcode: exception.code,
          details: exception.meta,
        });
        break;
      }
      case 'P2025': {
        response.status(HttpStatus.NOT_FOUND).json({
          message: `Record not found @ ${request.url}`,
          pcode: exception.code,
          description: exception.message,
          details: exception.meta,
        });
        break;
      }
      case 'P2003': {
        response.status(HttpStatus.BAD_REQUEST).json({
          message: `Bad request @ ${request.url}`,
          pcode: exception.code,
          description: exception.message,
          details: exception.meta,
        });
        break;
      }
      case 'P1001': {
        response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
          message: `Service unavailable @ ${request.url}`,
          pcode: exception.code,
          description: exception.message,
          details: exception.meta,
        });
        break;
      }
      case 'P2000': {
        response.status(HttpStatus.BAD_REQUEST).json({
          message: `String exceeds max length @ ${request.url}`,
          pcode: exception.code,
          description: exception.message,
          details: exception.meta,
        });
        break;
      }
      case 'P2001': {
        response.status(HttpStatus.BAD_REQUEST).json({
          message: `Update on non-existent record @ ${request.url}`,
          pcode: exception.code,
          description: exception.message,
          details: exception.meta,
        });
        break;
      }
      case 'P2014': {
        response.status(HttpStatus.BAD_REQUEST).json({
          message: `Deleting record that has required relationships @ ${request.url}`,
          pcode: exception.code,
          description: exception.message,
          details: exception.meta,
        });
        break;
      }
      default:
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: `Internal server error @ ${request.url}`,
          pcode: exception.code,
          description: exception.message,
          details: exception.meta,
        });
    }
  }
}
