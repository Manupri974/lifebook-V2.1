import fetch from "node-fetch";
import { config } from "dotenv";
config();

const apiKey = process.env.OPENAI_API_KEY;

export default async function genererLivreHommage(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { segments, questions, titreChapitres, sequenceParQuestion, dest, prenomC } = req.body;

  if (!apiKey || !segments || !questions || !titreChapitres || !sequenceParQuestion || !dest || !prenomC) {
    return res.status(400).json({ message: "Paramètres manquants ou invalides." });
  }

  console.log("🚀 Début génération HOMMAGE...");

  let resumeChapitres = "";
  const chapitres = [];

  for (const numero of Object.keys(segments).sort((a, b) => parseInt(a) - parseInt(b))) {
    const bloc = segments[numero].join("\n\n");
    const resumePourPrompt = resumeChapitres || "Début du récit. Aucun chapitre encore généré.";

    const promptSysteme = `Tu es une biographe professionnelle spécialisée dans les hommages et récits émotionnels. 
Ton style est fluide, chaleureux, sincère et touchant, sans exagération artificielle.`;

    const promptUtilisateur = `
Contexte de l'histoire :
- L'auteur parle de son lien avec son/sa ${dest} appelé(e) ${prenomC}.
- Le récit est raconté à la première personne ("je") et parfois "nous" lorsque cela est naturel.

Consignes d'écriture :
- Écris **à la première personne du singulier**.
- Utilise "nous" seulement si le contexte du souvenir l'exige naturellement.
- Garde un ton émotionnel, naturel, jamais mécanique.
- Respecte le déroulé narratif sans forcer d'invention.
- Écris en français littéraire, fluide et authentique.

Résumé narratif des chapitres précédents :
"""
${resumePourPrompt}
"""
(ne jamais reformuler ce résumé, il sert uniquement de contexte interne)

Séquence actuelle à transformer en chapitre :
"""
${bloc}
"""

Mission :
- Écris un chapitre fluide, vivant, sincère et cohérent.
- Commence par le titre suivant : "${titreChapitres[numero]}".
- Ne fais pas d'introduction artificielle, entre directement dans l'histoire.
- Respecte les éléments donnés, n'invente pas de nouveaux souvenirs.
- Termine proprement sans coupure brutale.
`;

    console.log(`📤 Envoi génération chapitre ${numero}...`);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          temperature: 1.1,
          messages: [
            { role: "system", content: promptSysteme },
            { role: "user", content: promptUtilisateur }
          ]
        })
      });

      const data = await response.json();
      const texte = data?.choices?.[0]?.message?.content;

      if (texte && texte.trim().length > 100) {
        const chapitreNettoye = texte.trim();
        chapitres.push(chapitreNettoye);
        console.log(`✅ Chapitre ${numero} généré avec succès.`);

        // Résumé glissant
        const resumeResponse = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            temperature: 0.5,
            messages: [
              {
                role: "system",
                content: "Tu es un assistant littéraire. Résume ce chapitre hommage en 2-3 phrases naturelles."
              },
              { role: "user", content: chapitreNettoye }
            ]
          })
        });

        const resumeData = await resumeResponse.json();
        const extrait = resumeData?.choices?.[0]?.message?.content;
        if (extrait) {
          resumeChapitres = [...resumeChapitres.split("\n"), extrait.trim()].slice(-3).join("\n");
          console.log("🧠 Résumé glissant mis à jour.");
        }
      } else {
        console.warn(`⚠️ Pas de contenu généré pour la séquence ${numero}`);
      }
    } catch (err) {
      console.error(`❌ Erreur GPT pour la séquence ${numero} :`, err);
    }
  }

  // 🪡 Couture finale
  console.log("🪡 Couture finale des chapitres...");

  const chapitresFinal = [];

  for (let i = 0; i < chapitres.length; i += 3) {
    const bloc = chapitres.slice(i, i + 3);
    if (bloc.length === 0) continue;

    const couturePrompt = `
Voici plusieurs chapitres consécutifs :
"""
${bloc.join("\n\n")}
"""

Ta mission :
- Améliore uniquement les transitions entre les chapitres.
- Respecte les titres existants.
- Ne retire rien du fond, harmonise juste la fluidité.
`;

    try {
      const coutureRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          temperature: 0.7,
          messages: [
            { role: "system", content: "Tu es un éditeur littéraire expert en transitions naturelles." },
            { role: "user", content: couturePrompt }
          ]
        })
      });

      const coutureData = await coutureRes.json();
      const texteCousu = coutureData?.choices?.[0]?.message?.content;

      if (texteCousu) {
        chapitresFinal.push(texteCousu.trim());
        console.log(`🧵 Couture réussie : chapitres ${i + 1} à ${i + bloc.length}`);
      } else {
        chapitresFinal.push(...bloc);
        console.warn(`⚠️ Couture échouée pour chapitres ${i + 1} à ${i + bloc.length}`);
      }
    } catch (err) {
      chapitresFinal.push(...bloc);
      console.error(`❌ Erreur couture chapitres ${i + 1} à ${i + bloc.length}`, err);
    }
  }

  const texteFinal = chapitresFinal.join("\n\n");

  if (!texteFinal || texteFinal.length < 100) {
    return res.status(500).json({ message: "Texte final insuffisant." });
  }

  console.log("📖 Livre HOMMAGE généré avec succès !");
  res.status(200).json({ texte: texteFinal });
}
