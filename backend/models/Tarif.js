import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Tarif = sequelize.define("Tarif", {
  type_jour: { type: DataTypes.STRING, allowNull: false },
  tarif: { type: DataTypes.FLOAT, allowNull: false },
});

export default Tarif;
