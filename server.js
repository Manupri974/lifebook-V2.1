import express from "express";
console.log("👋 Démarrage server.js...");

import genererLivre from "./api/generer-livre.js";
import exporterPdf from "./api/exporter-pdf.js";

// 🧼 Init app
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Autoriser plusieurs origines (CORS)
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

// ✅ Routes API
app.post("/api/generer-livre", genererLivre);
app.use("/api/exporter-pdf", exporterPdf);

// ✅ Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Serveur lancé correctement sur le port", PORT);
});
