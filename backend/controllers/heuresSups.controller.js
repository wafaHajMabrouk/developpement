import { HeuresSups } from '../models/heuresSups.model.js';
import { Employes } from '../models/employes.model.js';

export const calculerHeuresSups = async (req, res) => {
  try {
    console.log("🔹 Données reçues dans le contrôleur :", req.body);

    const { employeId, date, heures_travaillees } = req.body;
    
    if (!employeId || !date || !heures_travaillees) {
      return res.status(400).json({ message: "Données manquantes" });
    }

    // Vérifier si l'employé existe
    const employe = await Employes.findByPk(employeId);
    if (!employe) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    // Calculer les heures supplémentaires (exemple)
    const heures_supplementaires = Math.max(0, heures_travaillees - 35);
    const remuneration_supplementaire = heures_supplementaires * 10; // Exemple de tarif

    console.log("✅ Calcul des heures supp :", heures_supplementaires, remuneration_supplementaire);

    // Enregistrer en base de données
    const newHeuresSups = await HeuresSups.create({
      employeId,
      date,
      heures_supplementaires,
      remuneration_supplementaire
    });

    res.status(200).json(newHeuresSups);
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

