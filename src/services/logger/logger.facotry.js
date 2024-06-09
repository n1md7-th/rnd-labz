import { FileStrategy } from './strategies/file.strategy.js';
import { StdoutStrategy } from './strategies/stdout.strategy.js';
import { env } from '../env/env.service.js';
import { LoggerService } from './logger.service.js';

export class LoggerFactory {
  create() {
    if (env.isDev()) return new LoggerService(new StdoutStrategy());

    return new LoggerService(new FileStrategy('.bot.logs'));
  }
}

export const loggerFactory = new LoggerFactory();
