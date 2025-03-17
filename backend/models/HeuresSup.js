import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Employe from "./Employe.js";

const HeuresSup = sequelize.define("HeuresSup", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employe_id: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  nb_heures: { type: DataTypes.FLOAT, allowNull: false }
});

HeuresSup.belongsTo(Employe, { foreignKey: "employe_id" });

export default HeuresSup;
