import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { STATUS_CODES } from 'http';

interface HttpExceptionResponse {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let errorMessage: string = STATUS_CODES[statusCode] || 'Error';

    // Handle Nest HTTP exceptions
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const responseBody = exception.getResponse();
      if (typeof responseBody === 'object' && responseBody !== null) {
        const res = responseBody as HttpExceptionResponse;
        if (res.message) {
          message = res.message;
        }
        if (typeof res.error === 'string') {
          errorMessage = res.error;
        } else {
          errorMessage = STATUS_CODES[statusCode] || exception.name;
        }
      } else if (typeof responseBody === 'string') {
        message = responseBody;
        errorMessage = STATUS_CODES[statusCode] || exception.name;
      }
      // Ensure message is a string or array of strings
      if (!(typeof message === 'string' || Array.isArray(message))) {
        message = exception.message;
      }
      // Log the exception
      this.logger.error(
        `[${request.method}] ${request.url} -> ${statusCode}`,
        exception.stack || '',
      );
    }
    // Handle Prisma Client known errors
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002': {
          // Unique constraint failed
          statusCode = HttpStatus.CONFLICT;
          const meta = exception.meta;
          let fields: string[] | undefined;
          if (meta && typeof meta === 'object' && 'target' in meta) {
            const target = (meta as { target?: unknown }).target;
            if (isStringArray(target)) {
              fields = target;
            }
          }
          if (fields && fields.length > 0) {
            message = `Unique constraint failed on the field(s): ${fields.join(', ')}`;
          } else {
            message = 'Unique constraint failed';
          }
          errorMessage = STATUS_CODES[statusCode] || exception.code;
          break;
        }
        case 'P2025':
          // Record not found
          statusCode = HttpStatus.NOT_FOUND;
          message = exception.message || 'Record not found';
          errorMessage = STATUS_CODES[statusCode] || exception.code;
          break;
        case 'P2003':
          // Foreign key constraint failed
          statusCode = HttpStatus.BAD_REQUEST;
          message = exception.message || 'Foreign key constraint failed';
          errorMessage = STATUS_CODES[statusCode] || exception.code;
          break;
        default:
          // Other Prisma errors
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = exception.message || 'Internal server error';
          errorMessage = STATUS_CODES[statusCode] || exception.code;
          break;
      }
      // Log the Prisma exception
      this.logger.error(
        `[${request.method}] ${request.url} -> ${statusCode}`,
        exception.stack || '',
      );
    }
    // Handle all other errors (system errors, unexpected exceptions)
    else if (exception instanceof Error) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
      errorMessage = exception.name;
      this.logger.error(
        `[${request.method}] ${request.url} -> ${statusCode}`,
        exception.stack || '',
      );
    }
    // Fallback for unknown exception types
    else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      errorMessage = STATUS_CODES[statusCode] || 'Error';
      this.logger.error(
        `[${request.method}] ${request.url} -> ${statusCode}`,
        JSON.stringify(exception),
      );
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error: errorMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
