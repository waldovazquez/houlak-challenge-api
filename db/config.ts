import {
  Sequelize,
} from 'sequelize';

const db = new Sequelize('houlak_spotify', 'root', 'waldo.123', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
