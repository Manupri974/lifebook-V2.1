import express from "express";

console.log("👋 Démarrage de server.js...");

import genererLivre from "./api/generer-livre.js";
import exporterPdf from "./api/exporter-pdf.js";

// ✅ Liste des domaines autorisés
const allowedOrigins = [
  "https://lifebook-v2-1.vercel.app"
];

const app = express();

// ✅ Middlewares pour parser le corps des requêtes
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Middleware CORS avec log de debug
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {

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
app.use("/api/exporter-pdf", exporterPdf);

// ✅ Port dynamique
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
