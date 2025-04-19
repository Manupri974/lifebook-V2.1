import fetch from "node-fetch";
import { config } from "dotenv";
config();

const apiKey = process.env.OPENAI_API_KEY;

// 🧩 Fonction rapide pour le contexte
function construireProfilCondense(prenomA, prenomB) {
  return `Personnages principaux : ${prenomA} et ${prenomB}.`;
}

// 🧠 Fonction pour déterminer le point de vue par chapitre
function determinerPointDeVue(chapitre, vue) {
  if (vue === "jelove") {
    if (chapitre === 1) return "première personne du singulier";
    if (chapitre === 2) return "troisième personne du singulier";
    return "première personne du pluriel";
  } else {
    if (chapitre === 1 || chapitre === 2) return "troisième personne du singulier";
    return "troisième personne du pluriel";
  }
}

export default async function genererLivreLove(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Méthode non autorisée" });

  const { segments, vue, prenomA, prenomB } = req.body;

  if (!apiKey || !segments || !vue || !prenomA || !prenomB) {
    return res.status(400).json({ message: "Paramètres manquants ou invalides." });
  }

  console.log("🚀 Début génération Histoire d'Amour...");
  
  const profilCondense = construireProfilCondense(prenomA, prenomB);

  const promptSysteme = `Tu es une biographe professionnelle spécialisée dans les récits d'amour.
Ton style est littéraire, fluide, émouvant et naturel, sans jamais tomber dans le cliché ou l'exagération.`

  let resumeChapitres = "";
  const chapitres = [];

  for (const numero of Object.keys(segments).sort((a, b) => parseInt(a) - parseInt(b))) {
    const bloc = segments[numero].join("\n\n");
    const resumePourPrompt = resumeChapitres || "Début du récit. Aucun chapitre encore généré.";
    const pointDeVueChapitre = determinerPointDeVue(parseInt(numero), vue);

    const promptUtilisateur = `
Contexte global :
- ${prenomA} et ${prenomB} sont les protagonistes de ce récit amoureux.

Résumé narratif des chapitres précédents :
"""
${resumePourPrompt}
"""

Séquence ${numero} à transformer en chapitre :
"""
${bloc}
"""

Consignes d'écriture :
- Rédige ce chapitre **en français**, ${pointDeVueChapitre}.
- Commence par un **titre stylisé** pour le chapitre.
- N'invente aucune information supplémentaire.
- Conserve un ton **chaleureux, fluide, vivant**.
- Ne fais pas de listes mécaniques.
- Respecte l'esprit d'un **roman vrai**, sans caricature.
`;

    console.log(`📤 Génération du chapitre ${numero}...`);

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
        console.log(`✅ Chapitre ${numero} généré`);

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
                content: "Tu es un assistant qui résume un chapitre amoureux en 2-3 phrases pour aider à maintenir la cohérence de l'histoire.",
              },
              { role: "user", content: chapitreNettoye }
            ]
          })
        });

        const resumeData = await resumeResponse.json();
        const extrait = resumeData?.choices?.[0]?.message?.content;
        if (extrait) {
          resumeChapitres = [...resumeChapitres.split("\n"), extrait.trim()]
            .slice(-3)
            .join("\n");
          console.log("🧠 Résumé mis à jour pour les prochains chapitres");
        }
      } else {
        console.warn(`⚠️ Aucun contenu généré pour la séquence ${numero}`);
      }
    } catch (err) {
      console.error(`❌ Erreur GPT sur la séquence ${numero}`, err);
    }
  }

  // 🪡 Couture finale par blocs de 3 chapitres
  console.log("🪡 Démarrage de la couture finale...");

  const chapitresFinal = [];

  for (let i = 0; i < chapitres.length; i += 3) {
    const bloc = chapitres.slice(i, i + 3);
    if (bloc.length === 0) continue;

    const couturePrompt = `
Voici plusieurs chapitres consécutifs extraits d'un livre d'amour.

Ta mission :
- Améliore uniquement les **transitions entre chapitres**
- Ne change ni les titres, ni le contenu fondamental
- Garde la cohérence du style et de l'émotion

Texte à coudre :
"""
${bloc.join("\n\n")}
"""
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
            { role: "system", content: "Tu es un éditeur littéraire expert dans la fluidité entre chapitres." },
            { role: "user", content: couturePrompt }
          ]
        })
      });

      const coutureData = await coutureRes.json();
      const texteCousu = coutureData?.choices?.[0]?.message?.content;

      if (texteCousu) {
        chapitresFinal.push(texteCousu.trim());
        console.log(`🧵 Couture réussie sur chapitres ${i + 1} à ${i + bloc.length}`);
      } else {
        chapitresFinal.push(...bloc);
        console.warn(`⚠️ Couture échouée, on garde les chapitres bruts ${i + 1} à ${i + bloc.length}`);
      }
    } catch (err) {
      chapitresFinal.push(...bloc);
      console.error(`❌ Erreur couture finale chapitres ${i + 1} à ${i + bloc.length}`, err);
    }
  }

  const texteFinal = chapitresFinal.join("\n\n");

  if (!texteFinal || texteFinal.length < 100) {
    return res.status(500).json({ message: "Le texte généré est trop court ou vide." });
  }

  console.log("📘 Livre final généré avec succès !");
  res.status(200).json({ texte: texteFinal });
}
