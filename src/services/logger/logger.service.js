import { Logger } from './abstract/logger.js';
import { Context } from 'grammy';

export class LoggerService extends Logger {
  /**
   * @type {Logger} strategy
   */
  #strategy;

  /**
   * @param {Logger} strategy
   */
  constructor(strategy) {
    super();

    this.#strategy = strategy;
  }

  /**
   * @param {string | object} message
   * @param {Context} [ctx]
   *
   * @returns {void}
   */
  info(message, ctx) {
    this.#strategy.info(message, ctx);
  }

  /**
   * @param {string | object} message
   * @param {Context} [ctx]
   *
   * @returns {void}
   */
  debug(message, ctx) {
    this.#strategy.debug(message, ctx);
  }

  /**
   * @param {string | object} message
   * @param {Context} [ctx]
   *
   * @returns {void}
   */
  error(message, ctx) {
    this.#strategy.error(message, ctx);
  }
}
