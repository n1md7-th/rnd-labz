import { Context } from 'grammy';
import { env } from '../env/env.service.js';
import { isPrimitive } from '../utils/payload.utils.js';

export class LoggerFormat {
  /**
   * @param {string | object} message
   * @param {string} level
   * @param {Context} [ctx]
   * @returns {string}
   */
  format(message, level, ctx) {
    if (ctx) return this.#withContext(message, level, ctx);

    return this.#withoutContext(message, level);
  }

  /**
   * @param {string | object} message
   * @param {string} level
   * @param {Context} ctx
   * @returns {string}
   */
  #withContext(message, level, ctx) {
    const id = ctx?.from?.id || 'unknown-ID';
    const username = ctx?.from?.username || 'unknown-Username';

    return `${new Date().toISOString()} [${level}] from "${username}:${id}" - ${this.#stringify(message)}`;
  }

  /**
   * @param {string | object} message
   * @param {string} level
   * @returns {string}
   */
  #withoutContext(message, level) {
    return `${new Date().toISOString()} [${level}] - ${message}`;
  }

  /**
   * @param {string | object} message
   * @returns {string}
   */
  #stringify(message) {
    if (isPrimitive(message)) return message;

    if (env.isDev()) return JSON.stringify(message, null, 2);

    return JSON.stringify(message);
  }
}
