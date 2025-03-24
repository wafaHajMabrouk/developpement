import Employe from "../models/Employe.js";  // Correction ici, l'export est "default"
import express from 'express';
const router = express.Router();

// Route pour récupérer les employés
router.get("/", async (req, res) => {
  try {
    const employes = await Employe.findAll();  // Utiliser "Employe" au lieu de "Employes"
    res.json(employes);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des employés" });
  }
});

// Route pour créer un employé
router.post("/", async (req, res) => {  // Modification de "/employes" à "/"
  try {
    const employe = await Employe.create(req.body);
    res.status(201).json(employe);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'employé" });
  }
});

export default router;
