import express from "express";

console.log("👋 Démarrage de server.js...");

import genererLivre from "./api/generer-livre.js";
import genererLivreLove from "./api/generer-livre-love.js";
import genererLivreHommage from "./api/generer-livre-hommage.js"; // 👈 AJOUT
import exporterPdf from "./api/exporter-pdf.js";

// ✅ Liste des domaines autorisés
const allowedOrigins = [
  "https://lifebook-v2-1.vercel.app"
];

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    console.log("➡️ Préflight OPTIONS reçu, réponse 200");
    return res.sendStatus(200);
  }

  next();
});

// ✅ Routes principales
app.post("/api/generer-livre", genererLivre);
app.post("/api/generer-livre-love", genererLivreLove);
app.post("/api/generer-livre-hommage", genererLivreHommage); // 👈 AJOUT
app.use("/api/exporter-pdf", exporterPdf);

// ✅ Port dynamique
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
