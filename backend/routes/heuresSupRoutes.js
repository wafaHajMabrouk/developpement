import express from "express";
import HeuresSup from "../models/HeuresSup.js";
import Tarif from "../models/Tarif.js";
import { Op } from "sequelize";

const router = express.Router();

// Récupérer la liste des heures supplémentaires d'un employé
router.get("/", async (req, res) => {
  const heuresSup = await HeuresSup.findAll();
  res.json(heuresSup);
});

// Calculer les heures supplémentaires
router.post("/calculer", async (req, res) => {
  const { employeId, date, heures_travaillees } = req.body;

  try {
    const heures = await HeuresSup.findAll({
      where: {
        employe_id: employeId,
        date: { [Op.eq]: date },
      },
    });

    let total = 0;
    for (let h of heures) {
      const tarif = await Tarif.findOne({ where: { type_jour: "jour ordinaire" } });
      total += h.nb_heures * tarif.tarif;
    }

    let heures_supplementaires = Math.max(0, heures_travaillees - 35); // Supposons 35 heures normales
    let remuneration_supplementaire = heures_supplementaires * total;

    res.json({
      heures_supplementaires,
      remuneration_supplementaire,
    });
  } catch (error) {
    console.error("Erreur lors du calcul des heures sup:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
