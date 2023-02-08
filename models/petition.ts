import { DataTypes } from 'sequelize';

import db from '../db/config';

const Petition = db.define('petitions', {
  artist_name: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATE
  },
  user_ip: {
    type: DataTypes.STRING
  },
}, {
  timestamps: false
});

export default Petition;
