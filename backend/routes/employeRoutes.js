import express from "express";
import Employe from "../models/Employe.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const employes = await Employe.findAll();
  res.json(employes);
});

router.post("/", async (req, res) => {
  const employe = await Employe.create(req.body);
  res.json(employe);
});

export default router;
