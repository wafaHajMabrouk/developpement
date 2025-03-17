import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Employe = sequelize.define("Employe", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poste: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salaire: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

export default Employe;
