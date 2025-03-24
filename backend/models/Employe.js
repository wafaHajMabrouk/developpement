import { DataTypes } from 'sequelize';
import sequelize  from '../config/database.js';

export const Employes = sequelize.define('Employes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poste: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});
export default Employes;
