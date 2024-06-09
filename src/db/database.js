import { Sequelize } from 'sequelize';
import { env } from '../services/env/env.service.js';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: env.config.db.path,
  logging: env.isDev() ? console.log : false,
});

sequelize
  .sync({
    force: env.isDev(),
  })
  .catch((err) => {
    console.error(err);
  });
