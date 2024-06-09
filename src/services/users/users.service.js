import { User } from '../../db/schemas/users.js';

/**
 * @typedef {import('../../db/schemas').UserType} User
 */

export class UsersService {
  /**
   * @param {number} telegramId - user Telegram ID
   * @returns {Promise<User | undefined>}
   */
  async getById(telegramId) {
    return await User.findByPk(telegramId);
  }

  /**
   * @param {User} user - user object
   */
  async saveBy(user) {
    await User.upsert(user);
  }
}
