import fetch from "node-fetch";
import { config } from "dotenv";
config();

const apiKey = process.env.OPENAI_API_KEY;

function construireProfilCondense(segments) {
  const s1 = segments["1"];
  if (!s1 || s1.length < 3) return "";
  const prenom = s1[1]?.trim() || "";
  const signification = s1[2]?.trim() || "";
  const naissance = s1[3]?.trim() || "";
  const age = s1[0]?.trim() || "";

  return `Profil de la personne interviewée :
- Âge : ${age}
- Prénom : ${prenom}
- Signification ou origine du prénom : ${signification}
- Lieu de naissance : ${naissance}`;
}

export default async function genererLivre(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Méthode non autorisée" });

  // ✅ Ajout des nouveaux paramètres
  const { segments, perso, titreChapitres = {}, questions = [] } = req.body;
  const pointDeVue = perso === "je" ? "à la première personne" : "à la troisième personne";

  if (!apiKey || !segments || typeof segments !== "object") {
    return res.status(400).json({ message: "Clé API ou segments manquant/invalide" });
  }

  console.log("🚀 Début de génération du livre...");

  const profilCondense = construireProfilCondense(segments);

  // ✅ Construction du plan et des questions
  const planComplet = Object.entries(titreChapitres)
    .map(([num, titre]) => `Chapitre ${num} — ${titre}`)
    .join("\n");

  const toutesLesQuestions = questions.map((q, i) => `Q${i + 1}. ${q}`).join("\n");

  const promptSysteme = `Tu es une biographe professionnelle au style narratif fluide et constant. 
Tu racontes des histoires de vie comme un roman vrai, avec chaleur, clarté, et émotion.`;

  let resumeChapitres = "";
  const chapitres = [];

  for (const numero of Object.keys(segments).sort((a, b) => parseInt(a) - parseInt(b))) {
    const bloc = segments[numero].join("\n\n");
    const resumePourPrompt = resumeChapitres || "Début du récit. Aucun chapitre encore généré.";

    const promptUtilisateur = `
Contexte général (à garder en tête mais ne pas reformuler) :
"""
${profilCondense}
"""

Plan structuré de l’ouvrage :
"""
${planComplet}
"""

Liste des questions posées lors de l’interview :
"""
${toutesLesQuestions}
"""

⚠️ Ces questions sont fournies uniquement comme référence. 
Tu ne dois **jamais** les reformuler, ni les inclure dans le texte.
Ne les cite pas, n’en fais pas un plan, n’écris pas à leur place.

Résumé narratif des chapitres précédents :
"""
${resumePourPrompt}
"""

Séquence ${numero} à transformer en chapitre :
"""
${bloc}
"""

Ta mission :
- Rédige un **chapitre fluide, vivant et littéraire** à partir de cette séquence.
- Commence par un **titre stylisé** pour le chapitre ${numero}, par exemple : "Chapitre ${numero} — Une enfance libre".
- Rédige en français, ${pointDeVue}.
- N’invente rien, et n’utilise pas d’énumération mécanique.
`;
console.log("🧾 Prompt envoyé à GPT pour la séquence", numero);
console.log(promptUtilisateur);
    
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
                content:
                  "Tu es un assistant qui résume un chapitre biographique en 2-3 phrases naturelles, pour aider le chapitre suivant à garder un fil logique.",
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
        }
      } else {
        console.warn(`⚠️ Aucun contenu généré pour la séquence ${numero}`);
      }
    } catch (err) {
      console.error(`❌ Erreur GPT sur la séquence ${numero}`, err);
    }
  }

  const chapitresFinal = [];

  for (let i = 0; i < chapitres.length; i += 3) {
    const bloc = chapitres.slice(i, i + 3);
    if (bloc.length === 0) continue;

    const couturePrompt = `
Voici un extrait de livre divisé en 2 ou 3 chapitres consécutifs.
Ta mission :
- Améliore uniquement les **transitions entre chapitres**
- Ne retire rien, ne reformule que les débuts/fins si besoin
- Garde les titres et paragraphes, ne change rien de fond

Texte :
"""
${bloc.join("\n\n")}
"""

Retourne le texte cousu, fluide et naturel, avec les titres conservés.
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
      } else {
        chapitresFinal.push(...bloc);
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
