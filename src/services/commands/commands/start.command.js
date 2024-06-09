import { Command } from '../abstract/command.js';
import { env } from '../../env/env.service.js';
import { Context } from 'grammy';

export class StartCommand extends Command {
  /**
   * @param {Context} ctx
   *
   * @override
   * @returns {Promise<void>}
   * @throws {Error}
   */
  async execute(ctx) {
    this.logger.info('User started the bot', ctx);
    await this.users.saveBy({
      telegramId: ctx.from.id,
      isAdmin: env.config.user.admin === ctx.from.username,
      username: ctx.from.username,
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name,
    });
    this.logger.debug(ctx.from, ctx);

    const url = `${env.getServerUrl()}?name=${ctx.from.first_name}`;

    await ctx.reply(`Hello, ${ctx.from.first_name}!`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Phase#1 - Open External', url: url.toString() }],
          [
            {
              text: 'Phase#2 - Open Web App',
              web_app: {
                url: env.getServerUrl(),
              },
            },
          ],
        ],
      },
    });
  }

  getHelpCommand() {
    return '/start - Start the bot';
  }

  getText() {
    return '/start';
  }
}
