import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const API_BASE = "https://lifebook-docker.onrender.com";

// ✅ 1. Exemple de segments simulés (tu peux les adapter)
const segments = {
  "1": ["Je m'appelle Claire.", "J'ai 46 ans.", "Je suis née à Lyon.", "Mon prénom vient de ma grand-mère."],
  "2": ["J’ai grandi dans un quartier animé.", "Ma mère était douce, mon père très strict.", "J’étais très proche de ma sœur."],
  "3": ["J’étais timide au collège.", "J’ai eu un prof de français exceptionnel.", "Ma passion pour l’écriture est née là."],
  "4": ["J’ai fait des études de droit.", "Mon premier stage m’a profondément marquée.", "J’ai changé de voie ensuite."],
  "5": ["Je suis devenue prof.", "J’ai eu des doutes à la naissance de ma fille.", "Ma famille m’a beaucoup soutenue."],
};

// ✅ 2. Point de vue
const perso = "je"; // ou "il" pour 3e personne

async function main() {
  try {
    console.log("📤 Envoi à /api/generer-livre...");
    const res1 = await fetch(`${API_BASE}/api/generer-livre`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ segments, perso }),
    });

    if (!res1.ok) throw new Error("Erreur lors de la génération du texte");

    const { texte } = await res1.json();
    console.log("✅ Texte reçu. Extrait :", texte.slice(0, 200));

    console.log("📤 Envoi à /api/exporter-pdf...");
    const res2 = await fetch(`${API_BASE}/api/exporter-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texte }),
    });

    if (!res2.ok) throw new Error("Erreur lors de la génération du PDF");

    const buffer = await res2.buffer();
    const filePath = path.resolve("test-output.pdf");
    fs.writeFileSync(filePath, buffer);

    console.log("📘 PDF généré avec succès :", filePath);
  } catch (err) {
    console.error("❌ Échec du test :", err.message);
  }
}

main();
