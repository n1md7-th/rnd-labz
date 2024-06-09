import { Command } from '../abstract/command.js';

export class HelpCommand extends Command {
  #helpText = 'No help text provided';

  /**
   * @param {UsersService} usersService
   * @param {Logger} logger
   * @param {string} text
   */
  constructor(usersService, logger, text) {
    super(usersService, logger);

    this.#helpText = text;
  }

  async execute(ctx) {
    await ctx.reply(this.#helpText + '\n' + this.getHelpCommand());
  }

  getHelpCommand() {
    return '/help - Show this help message';
  }

  getText() {
    return '/help';
  }
}
