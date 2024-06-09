import { Logger } from '../abstract/logger.js';
import { LoggerFormat } from '../logger.format.js';
import { appendFile } from 'node:fs/promises';
import { LoggerEnum } from '../logger.enum.js';
import { Context } from 'grammy';
import { join } from 'node:path';
import { cwd, exit, stderr } from 'node:process';

export class FileStrategy extends Logger {
  /**
   * @type {LoggerFormat}
   */
  #format;
  /**
   * @type {string}
   */
  #path;

  constructor(fileName = 'logs.txt') {
    super();

    this.#format = new LoggerFormat();
    this.#path = join(cwd(), fileName);
    this.#createFile();
  }

  /**
   * @param {string | object} message
   * @param {Context} [ctx]
   *
   * @override
   * @returns {void}
   */
  info(message, ctx) {
    appendFile(this.#path, this.#format.format(message, LoggerEnum.INFO, ctx)).catch(this.#handleError);
  }

  /**
   * @param {string | object} message
   * @param {Context} [ctx]
   *
   * @override
   * @returns {void}
   */
  debug(message, ctx) {
    appendFile(this.#path, this.#format.format(message, LoggerEnum.DEBUG, ctx)).catch(this.#handleError);
  }

  /**
   * @param {string | object} message
   * @param {Context} [ctx]
   *
   * @override
   * @returns {void}
   */
  error(message, ctx) {
    appendFile(this.#path, this.#format.format(message, LoggerEnum.ERROR, ctx)).catch(this.#handleError);
  }

  #handleError(error) {
    stderr.write('File logger has failed to write the log\n');
    stderr.write(error.message);
    exit(1);
  }

  #createFile() {
    appendFile(this.#path, 'All your logs are here').catch(this.#handleError);
  }
}
