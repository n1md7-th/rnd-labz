import { StartCommand } from './commands/start.command.js';
import { UsersService } from '../users/users.service.js';
import { HelpCommand } from './commands/help.command.js';
import { AdminHelloCommand } from './commands/admin-hello.command.js';

/**
 * @description Command's composition
 */
export class Commands {
  /**
   * @type {Command[]} list of commands
   */
  #commands;

  /**
   * @param {UsersService} users
   * @param {Logger} logger
   */
  constructor(users, logger) {
    this.#commands = [new StartCommand(users, logger), new AdminHelloCommand(users, logger)];
    this.#commands.push(new HelpCommand(users, logger, this.getHelpText()));
  }

  /**
   * @param {string} text
   * @returns {Command | undefined}
   */
  getByTextMatch(text) {
    return this.#commands.find((command) => text.startsWith(command.getText()));
  }

  getHelpText() {
    return 'Available commands are below:\n\n' + this.#commands.map((command) => command.getHelpCommand()).join('\n');
  }
}
