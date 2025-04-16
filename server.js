import express from "express";
console.log("👋 Démarrage server.js...");
import genererLivre from "./api/generer-livre.js";
import exporterPdf from "./api/exporter-pdf.js";
import chatHandler from "./api/chat.js";
import voiceHandler from "./api/voice.js"; // ✅ Synthèse vocale

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://lifebook-landing.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.post("/api/generer-livre", genererLivre);
app.use("/api/exporter-pdf", exporterPdf);
app.post("/api/chat", chatHandler);
app.post("/api/voice", voiceHandler); // ✅ FIX

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Serveur lancé correctement");
});
