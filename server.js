import express from "express";
console.log("👋 Démarrage server.js...");

import genererLivre from "./api/generer-livre.js";
import exporterPdf from "./api/exporter-pdf.js";
// Si tu veux supprimer les routes inutiles, commente celles-ci :
/*
import chatHandler from "./api/chat.js";
import voiceHandler from "./api/voice.js";
*/

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Autoriser plusieurs origines CORS
const allowedOrigins = [
  "https://lifebook-landing.vercel.app",
  "https://lifebook-v2-1.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ✅ Routes principales
app.post("/api/generer-livre", genererLivre);
app.use("/api/exporter-pdf", exporterPdf);

// ❌ Routes facultatives que tu peux retirer si non utilisées
/*
app.post("/api/chat", chatHandler);
app.post("/api/voice", voiceHandler);
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Serveur lancé correctement sur le port", PORT);
});
