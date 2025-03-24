import sequelize from '../config/database.js'; // Utiliser import par défaut
import { DataTypes } from 'sequelize';

const HeuresSup = sequelize.define('HeuresSup', {
  employe_id: {
    type: DataTypes.INTEGER,
    field: 'employe_id',
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  heures_travaillees: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  heures_supplementaires: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  remuneration_supplementaire: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default HeuresSup;
