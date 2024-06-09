import { Context } from 'grammy';
import { UsersService } from '../../users/users.service.js';
import { Logger } from '../../logger/abstract/logger.js';

/**
 * @description Command abstract class, acts as an interface too
 *
 * @abstract
 */
export class Command {
  /**
   * @type {UsersService} users service
   */
  #usersService;

  /**
   * @type {Logger} logger
   */
  #logger;

  /**
   * @param {UsersService} usersService
   * @param {Logger} logger
   */
  constructor(usersService, logger) {
    if (new.target === Command) {
      throw new TypeError('Cannot construct Command instances directly');
    }

    this.#logger = logger;
    this.#usersService = usersService;
  }

  /**
   * @description Shared users service instance
   * @returns {UsersService}
   */
  get users() {
    return this.#usersService;
  }

  /**
   * @description Shared logger instance
   * @returns {Logger}
   */
  get logger() {
    return this.#logger;
  }

  /**
   * @description Execute the command
   * @param {Context} ctx
   * @throws {Error}
   * @returns {Promise<void>}
   * @override - needs to be overridden in super class
   */
  execute(ctx) {
    throw new Error('Method not implemented');
  }

  /**
   * @description Get the text of the command, it is used to identify the command
   * @example '/start', '/help', '/adminHello'
   * @returns {string}
   * @override - needs to be overridden in super class
   */
  getText() {
    throw new Error('Method not implemented');
  }

  /**
   * @description Get the help command, it is used to display the current command text in the help command.
   * @example '/start - Start the bot'
   * @returns {string}
   * @override - needs to be overridden in super class
   */
  getHelpCommand() {
    throw new Error('Method not implemented');
  }
}
