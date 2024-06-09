import { loggerFactory } from './src/services/logger/logger.facotry.js';
import { env } from './src/services/env/env.service.js';
import { Commands } from './src/services/commands/commands.js';
import { UsersService } from './src/services/users/users.service.js';
import { Bot } from 'grammy';

const logger = loggerFactory.create();
const bot = new Bot(env.config.bot.token);
const users = new UsersService();
const commands = new Commands(users, logger);

logger.info('Bot initialized successfully');

bot.on('message:text', async (ctx) => {
  const { text } = ctx.message;

  if (!text.startsWith('/')) return;

  logger.info('Command received', ctx);

  const command = commands.getByTextMatch(text);

  if (!command) {
    await ctx.reply(`Invalid command: ${text}`);
    return logger.info(`Command not found by "${text}"`);
  }

  try {
    await command.execute(ctx);
  } catch (e) {
    logger.error(`An error occurred while executing the command: ${e.name} - ${e.message}`, ctx);
    await ctx.reply('An error occurred while executing the command: ' + e.name);
  }
});

bot.catch((error) => {
  logger.error(
    {
      name: error,
      message: error.message,
      cause: error.cause,
      stack: error.stack,
    },
    error.ctx,
  );
});

bot
  .start()
  .then(() => logger.info('Bot started successfully'))
  .catch((error) => {
    logger.error('Bot failed to start');
    logger.error(error, error);
  });
