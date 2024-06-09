import { Command } from '../abstract/command.js';
import { Context } from 'grammy';

/**
 * @typedef {import('../../../db/schemas/users.js').UserType} User
 */

export class AdminHelloCommand extends Command {
  /**
   * @param {Context} ctx
   *
   * @override
   * @returns {Promise<void>}
   * @throws {Error}
   */
  async execute(ctx) {
    this.#validateFormat(ctx.message.text);

    const { telegramId, text } = this.#parse(ctx.message.text);
    const user = await this.users.getById(telegramId);

    this.#assertPermissions(user);

    await ctx.api.sendMessage(telegramId, text);
  }

  getHelpCommand() {
    return '/adminHello <telegramId> <text> - Say hello to user';
  }

  getText() {
    return '/adminHello';
  }

  /**
   * @description Validates the format of the command
   * @param {string} payload
   * @returns {void}
   * @throws {Error}
   * @private
   */
  #validateFormat(payload) {
    if (!payload.startsWith('/adminHello')) {
      throw new Error(`Invalid command given: ${payload}`);
    }
  }

  /**
   * @description Asserts that the user is an admin and exists, otherwise throws an error
   * @param {User} user
   * @returns {void}
   * @throws {Error}
   * @private
   */
  #assertPermissions(user) {
    if (!user) {
      throw new (class extends Error {
        constructor() {
          super('User not found');

          this.name = 'UserNotFound';
        }
      })();
    }

    if (!user.isAdmin) {
      throw new (class extends Error {
        constructor() {
          super(`User "${user.username}" is not an admin`);

          this.name = 'UserNotAdmin';
        }
      })();
    }
  }

  /**
   * @description Parses the command payload
   * @param {string} payload - Full command payload e.g. "/adminHello 12345 Hello, user!"
   * @returns {{text: string, telegramId: number}}
   * @private
   */
  #parse(payload) {
    const [, telegramId, ...text] = payload.split(' ');

    return {
      telegramId: Number(telegramId),
      text: text.join(' '),
    };
  }
}
