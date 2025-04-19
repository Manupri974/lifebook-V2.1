import fetch from "node-fetch";
import { config } from "dotenv";
config();

const apiKey = process.env.OPENAI_API_KEY;

export default async function genererLivreLove(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { segments, questions, titreChapitres, sequenceParQuestion, vue, prenomA, prenomB } = req.body;

  if (!apiKey || !segments || !questions || !titreChapitres || !sequenceParQuestion || !vue || !prenomA || !prenomB) {
    return res.status(400).json({ message: "Paramètres manquants ou invalides." });
  }

  console.log("🚀 Début génération LOVE...");

  let resumeChapitres = "";
  const chapitres = [];

  for (const numero of Object.keys(segments).sort((a, b) => parseInt(a) - parseInt(b))) {
    const bloc = segments[numero].join("\n\n");
    const resumePourPrompt = resumeChapitres || "Début du récit. Aucun chapitre encore généré.";

    // Déterminer le point de vue en fonction du choix utilisateur et du chapitre
    let pointDeVue;
    if (vue === "jelove") {
      if (numero === "1") pointDeVue = "à la première personne du singulier";
      else if (numero === "2") pointDeVue = "à la troisième personne du singulier";
      else pointDeVue = "à la première personne du pluriel";
    } else if (vue === "exterieurlove") {
      if (numero === "1" || numero === "2") pointDeVue = "à la troisième personne du singulier";
      else pointDeVue = "à la troisième personne du pluriel";
    } else {
      pointDeVue = "à la troisième personne";
    }

    const promptSysteme = `Tu es une biographe spécialisée dans les histoires d'amour. Ton style est fluide, romanesque, naturel et très émotionnel.`;

    const promptUtilisateur = `
Contexte de l'histoire :
- Partenaire 1 : ${prenomA}
- Partenaire 2 : ${prenomB}

Consignes d'écriture :
- Tu écris ${pointDeVue}.
- Tu respectes le déroulé narratif classique d'une histoire d'amour.
- Tu écris en français littéraire, riche, naturel, sans énumérations mécaniques.
- Tu respectes ce qui a déjà été écrit sans redite.

Résumé narratif des chapitres précédents :
"""
${resumePourPrompt}
"""
(ne jamais reformuler ce résumé, il est là pour t'aider)

Séquence actuelle à transformer en chapitre :
"""
${bloc}
"""

Mission :
- Écris un chapitre fluide, vivant et littéraire.
- Commence le chapitre par ce titre : "${titreChapitres[numero]}"
- Ne fais pas d'introduction inutile ou de résumé artificiel.
- Approfondis uniquement à partir des éléments donnés sans en inventer de nouveaux.
- Termine proprement ton chapitre sans coupure brutale.
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

        // Résumé glissant pour la cohérence des chapitres suivants
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
                content: "Tu es un assistant littéraire. Résume ce chapitre en 2-3 phrases naturelles, pour maintenir la fluidité de l'histoire."
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

  // 🪡 Couture finale des blocs de chapitres
  console.log("🪡 Démarrage couture finale (3 par 3)");

  const chapitresFinal = [];

  for (let i = 0; i < chapitres.length; i += 3) {
    const bloc = chapitres.slice(i, i + 3);
    if (bloc.length === 0) continue;

    const couturePrompt = `
Texte extrait de plusieurs chapitres :
"""
${bloc.join("\n\n")}
"""

Ta mission :
- Améliore uniquement les transitions entre les chapitres
- Respecte les titres et les paragraphes existants
- Ne retire aucun contenu, harmonise juste la fluidité
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
            { role: "system", content: "Tu es un éditeur littéraire expert en transitions." },
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

  console.log("📖 Livre Love généré avec succès !");
  res.status(200).json({ texte: texteFinal });
}
