import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();

    this.useMorgan(req, res, next);
    this.logRequestDetailsOnFinish(req, res, start);
  }

  private useMorgan(req: Request, res: Response, next: NextFunction): void {
    // 'dev' format is a pre-defined log format from morgan
    // it looks like -> :method :url :status :response-time ms - :res[content-length]
    morgan('dev', {
      stream: {
        write: (message) => this.logger.log(message.trim()),
      },
    })(req, res, next);
  }

  private logRequestDetailsOnFinish(
    req: Request,
    res: Response,
    start: number,
  ): void {
    res.on('finish', () => {
      const duration = Date.now() - start;
      const isSuccess = res.statusCode >= 200 && res.statusCode < 300;
      const successMsg = isSuccess ? 'SUCCESS' : 'FAILURE';
      const message = `${successMsg}: ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`;
      this.logger.debug(message);
    });
  }
}
