import express from 'express';
import cors from 'cors';  // Importer le middleware CORS
import heuresSupsRoutes from './routes/heuresSupRoutes.js';
import employesRoutes from './routes/employeRoutes.js';

const app = express();

// Configurer CORS
app.use(cors({
  origin: 'http://localhost:3001', // Remplacez par l'URL de votre frontend React
}));

app.use(express.json());  // Pour analyser le corps des requêtes en JSON

// Définir les routes
app.use('/api/heuresSups', heuresSupsRoutes);  
app.use("/api/employes", employesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
