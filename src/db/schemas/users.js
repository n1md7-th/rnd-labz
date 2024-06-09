import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

/**
 * @typedef {{
 *   telegramId: number,
 *   firstName: string,
 *   lastName: string,
 *   username: string,
 *   isAdmin: boolean,
 * }} UserType
 */

export const User = sequelize.define('Users', {
  telegramId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
});
