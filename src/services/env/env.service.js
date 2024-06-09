import { cwd, env as sysEnv } from 'node:process';
import { join } from 'node:path';
import ip from 'ip';

/**
 * @typedef {'development' | 'production' | 'test'} Env
 */

export class EnvService {
  /**
   * @type {Env[]}
   */
  #envs = ['development', 'production', 'test'];
  /**
   * @type {Env}
   */
  #env;

  constructor() {
    this.#assertRequiredEnv();
    this.#env = sysEnv.NODE_ENV;
  }

  isDev() {
    return this.#env === 'development';
  }

  isProd() {
    return this.#env === 'production';
  }

  isTest() {
    return this.#env === 'test';
  }

  get config() {
    return {
      bot: {
        token: sysEnv.BOT_TOKEN,
      },
      db: {
        path: join(cwd() + '/db.sqlite'),
      },
      user: {
        admin: sysEnv.ADMIN_USERNAME,
      },
      server: {
        port: sysEnv.SERVER_PORT || 3000,
        host: sysEnv.SERVER_HOST || ip.address(),
        protocol: sysEnv.SERVER_PROTOCOL || 'http',
      },
    };
  }

  getServerUrl() {
    return `${this.config.server.protocol}://${this.config.server.host}:${this.config.server.port}`;
  }

  #assertRequiredEnv() {
    if (!this.#envs.includes(sysEnv.NODE_ENV)) {
      throw new Error(`Invalid environment: "${sysEnv.NODE_ENV}"`);
    }

    if (!sysEnv.BOT_TOKEN) {
      throw new Error('BOT_TOKEN not found in environment variables');
    }
  }
}

export const env = new EnvService();
