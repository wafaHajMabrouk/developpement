import request from 'supertest';
import * as chai from 'chai';

import  app  from '../app.js'; // S'assurer que app.js exporte `app`

const { expect } = chai;

describe("Employee API", () => {
  before(async () => {
    console.log("🔹 Test en cours - Vérification du serveur...");
    const res = await request(app).get("/api"); // Vérifie si l'API fonctionne
    console.log("🔹 Réponse de l'API :", res.status);
  });

  it("should calculate overtime for an employee", async () => {
    const requestData = {
      employeId: 1,
      date: "2023-10-01",
      heures_travaillees: 40,
    };

    console.log("🔹 Envoi des données :", requestData);

    const res = await request(app)
      .post("/api/heuresSups/calculer")
      .send(requestData);

    console.log("🔹 Réponse reçue :", res.status, res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("heures_supplementaires");
    expect(res.body).to.have.property("remuneration_supplementaire");
  });
});
