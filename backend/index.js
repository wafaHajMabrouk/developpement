import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import employeRoutes from "./routes/employeRoutes.js";
import heuresSupRoutes from "./routes/heuresSupRoutes.js";
import Employe from "./models/Employe.js"; // Importer tous les modèles

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/employes", employeRoutes);
app.use("/api/heures-sup", heuresSupRoutes);

// Synchroniser Sequelize avec la base de données
sequelize.sync({ force: false }).then(() => {
  console.log("✅ Base de données synchronisée avec les tables.");
}).catch(error => {
  console.error("❌ Erreur lors de la synchronisation des tables:", error);
});

// Démarrer le serveur
app.listen(process.env.PORT || 5000, () => console.log("🚀 Serveur démarré sur http://localhost:5000"));
