import { Context } from 'grammy';

/**
 * @description Logger abstract class
 *
 * Acts as a base class and the interface for all Logger strategies
 *
 * @abstract
 */
export class Logger {
  constructor() {
    if (new.target === Logger) {
      throw new TypeError('Cannot construct LoggerStrategy instances directly');
    }
  }

  /**
   * @param {string | object} message
   * @param {Context} [ctx]
   *
   * @returns {void}
   */
  info(message, ctx) {
    throw new Error('Method not implemented');
  }

  /**
   * @param {string | object} message
   * @param {Context} [ctx]
   *
   * @returns {void}
   */
  debug(message, ctx) {
    throw new Error('Method not implemented');
  }

  /**
   * @param {string | object} message
   * @param {Context} [ctx]
   *
   * @returns {void}
   */
  error(message, ctx) {
    throw new Error('Method not implemented');
  }
}
