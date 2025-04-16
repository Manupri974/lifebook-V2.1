import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }
  console.log("📢 Handler /api/chat appelé !");
  const apiKey = process.env.OPENAI_API_KEY;
  const { messages } = req.body;
  const urlParams = new URL(req.url, `http://${req.headers.host}`).searchParams;

  const type = urlParams.get("type") || "bio";
  const qui = urlParams.get("qui") || "moi";
  const age = urlParams.get("age") || "18";
  const perso = urlParams.get("perso") || "il";
  const format = urlParams.get("format") || "court";

  const fileName = `${type}-${qui}-${age}-${perso}-${format}.js`;
  const localPath = path.resolve(process.cwd(), "templates", fileName);
  const fileURL = pathToFileURL(localPath).href;

  console.log("🟣 Requête reçue avec params :", { type, qui, age, perso, format });
  console.log("📦 Tentative de chargement :", fileName);
  console.log("📁 Chemin absolu attendu :", localPath);

  let systemPrompt = {
    role: "system",
    content: "⚠️ Aucun template chargé. (template par défaut)",
  };

  try {
    if (!fs.existsSync(localPath)) {
      console.warn("❌ Fichier template introuvable :", localPath);
    } else {
      console.log("✅ Fichier détecté ✔️");

      const module = await import(fileURL);

      if (module.systemPrompt) {
        systemPrompt = module.systemPrompt;
        console.log("✅ Template chargé correctement :", fileName);
        console.log("🧠 Aperçu du prompt :", systemPrompt.content.slice(0, 100) + "...");
      } else {
        console.warn("⚠️ Le fichier existe mais n'exporte pas `systemPrompt` :", fileName);
      }
    }
  } catch (e) {
    console.error("❌ Erreur lors de l'import dynamique :", e.message);
  }

  if (!apiKey) {
    return res.status(500).json({ message: "Clé API absente." });
  }

  try {
    const contientPlan = messages.some(
      m => m.role === "assistant" && typeof m.content === "string" && m.content.includes("## Chapitre")
    );

    const finalMessages = contientPlan ? messages : [systemPrompt, ...messages];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        temperature: 1.1,
        messages: finalMessages,
      }),
    });

    const text = await response.text();
    if (!response.ok) {
      console.error("🛑 Erreur OpenAI brute :", text);
      return res.status(500).json({ message: "Erreur dans la réponse OpenAI", detail: text });
    }

    const data = JSON.parse(text);
    const reply = data.choices?.[0]?.message?.content ?? "";

    console.log("🧠 Réponse IA reçue (début) :", reply.slice(0, 100));
console.log("✅ Réponse finale envoyée");
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("❌ Crash backend :", error.message);
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}
