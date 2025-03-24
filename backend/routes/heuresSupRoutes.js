import express from 'express';
import HeuresSup from '../models/HeuresSup.js';
import Tarif from '../models/Tarif.js';
import { Op } from 'sequelize';

const heuresSupsRoutes = express.Router();

// POST route for calculating overtime
heuresSupsRoutes.post("/calculer", async (req, res) => {
  const { employeId, date, heures_travaillees } = req.body;

  // Basic input validation
  if (!employeId || !date || !heures_travaillees) {
    return res.status(400).json({
      success: false,
      message: "Données manquantes : employeId, date, ou heures_travaillees sont nécessaires."
    });
  }

  // Validate date format (YYYY-MM-DD)
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
  if (!isValidDate) {
    return res.status(400).json({
      success: false,
      message: "Format de date invalide. Veuillez utiliser le format YYYY-MM-DD."
    });
  }

  const dateNormalized = new Date(date);
  const dateStr = dateNormalized.toISOString().split('T')[0];  // Normalize date to YYYY-MM-DD format

  try {
    // Fetch total worked hours for the given employee and date using aggregation
    const heures = await HeuresSup.sum('nb_heures', {
      where: {
        employe_id: employeId,
        date: {
          [Op.eq]: dateStr,
        },
      },
    });

    // If no hours found for the given employee and date, return an error response
    if (heures === null) {
      return res.status(404).json({
        success: false,
        message: "Aucune heure trouvée pour cette date et cet employé."
      });
    }

    // Find the tarif for "jour ordinaire"
    const tarif = await Tarif.findOne({
      where: { type_jour: "jour ordinaire" },
    });

    // If no tarif is found, return an error
    if (!tarif) {
      return res.status(404).json({
        success: false,
        message: "Tarif non trouvé pour jour ordinaire."
      });
    }

    // Calculate overtime (assuming 35 regular hours per week)
    const heures_supplementaires = Math.max(0, heures_travaillees - 35);  // Assuming 35 regular hours
    const remuneration_supplementaire = heures_supplementaires * tarif.tarif;

    // Respond with calculated overtime hours and remuneration
    res.json({
      success: true,
      message: 'Calcul effectué avec succès.',
      heures_supplementaires,
      remuneration_supplementaire,
    });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur, veuillez réessayer plus tard.",
      error: error.message
    });
  }
});

export default heuresSupsRoutes;
