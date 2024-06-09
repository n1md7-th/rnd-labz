import { Logger } from '../abstract/logger.js';
import { LoggerFormat } from '../logger.format.js';
import { stdout, stderr } from 'node:process';
import { LoggerEnum } from '../logger.enum.js';
import { Context } from 'grammy';

export class StdoutStrategy extends Logger {
  #format = new LoggerFormat();

  /**
   * @param {string | object} message
   * @param {Context} [ctx]
   *
   * @override
   * @returns {void}
   */
  info(message, ctx) {
    stdout.write(this.#format.format(message, LoggerEnum.INFO, ctx) + '\n');
  }

  /**
   * @param {string | object} message
   * @param {Context} [ctx]
   *
   * @override
   * @returns {void}
   */
  debug(message, ctx) {
    stdout.write(this.#format.format(message, LoggerEnum.DEBUG, ctx) + '\n');
  }

  /**
   * @param {string | object} message
   * @param {Context} [ctx]
   *
   * @override
   * @returns {void}
   */
  error(message, ctx) {
    stderr.write(this.#format.format(message, LoggerEnum.ERROR, ctx) + '\n');
  }
}
