import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Crée une connexion temporaire pour créer la base de données
const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`✅ Base de données "${process.env.DB_NAME}" vérifiée/créée.`);
  } catch (error) {
    console.error("❌ Erreur lors de la création de la base de données:", error);
  }
};

// Exécute la création de la base de données avant l'initialisation de Sequelize
await createDatabase();

// Configuration de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Désactiver les logs SQL
  }
);

export default sequelize;
