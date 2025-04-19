export const titreChapitres = {
  1: "Chapitre 1 — Ton histoire avant votre rencontre",
  2: "Chapitre 2 — L'histoire de ${prenomB} avant votre rencontre (vue par toi)",
  3: "Chapitre 3 — Comment vos chemins se sont croisés",
  4: "Chapitre 4 — Votre première rencontre",
  5: "Chapitre 5 — Les débuts de votre relation",
  6: "Chapitre 6 — Vos premiers souvenirs marquants",
  7: "Chapitre 7 — La construction naturelle de votre lien",
  8: "Chapitre 8 — Vos premiers projets ou aventures",
  9: "Chapitre 9 — Vos premières difficultés et la manière dont vous les avez surmontées",
  10: "Chapitre 10 — Vos habitudes et rituels communs",
  11: "Chapitre 11 — Le projet d’avoir des enfants",
  12: "Chapitre 12 — L'arrivée de votre ou vos enfant(s)",
  13: "Chapitre 13 — Votre quotidien en famille",
  14: "Chapitre 14 — Vos projets et rêves familiaux"
};

export const questionsParChapitre = {
  1: [
    "Où es-tu né(e) et dans quel environnement as-tu grandi ?",
    "Quels souvenirs marquants de ton enfance ou adolescence as-tu en tête ?",
    "Quelles valeurs ou influences t'ont marqué(e) en grandissant ?",
    "Quels étaient tes rêves ou projets de jeunesse ?",
    "Comment étais-tu juste avant de rencontrer ${prenomB} ?"
  ],
  2: [
    "Où est né(e) ${prenomB}, d'après ce que tu sais ?",
    "Quels souvenirs ou traits d'enfance de ${prenomB} t'ont marqué(e) ?",
    "Quelles valeurs ou passions guidaient ${prenomB} avant votre rencontre ?",
    "Comment décrirais-tu la personnalité de ${prenomB} avant votre rencontre ?",
    "Qu'est-ce qui t'a touché dans son histoire personnelle ?"
  ],
  3: [
    "Dans quel contexte vos chemins se sont-ils croisés pour la première fois ?",
    "Quel événement ou quelle situation a permis votre rencontre ?",
    "Quels éléments particuliers entouraient cette rencontre ?",
    "Comment cette rencontre a-t-elle influencé vos parcours respectifs ?"
  ],
  4: [
    "Où et comment s'est déroulée votre toute première rencontre ?",
    "Quelle a été ta première impression en rencontrant ${prenomB} ?",
    "Quels détails t'ont marqué(e) ce jour-là ?",
    "Comment la connexion entre vous s'est-elle faite ?"
  ],
  5: [
    "Comment avez-vous commencé à nouer des liens après cette rencontre ?",
    "Quelles activités ou échanges ont renforcé votre rapprochement ?",
    "Quel rythme a pris votre relation au début ?",
    "Comment vos premiers instants ensemble ont-ils posé les bases de votre histoire ?"
  ],
  6: [
    "Quels souvenirs forts gardez-vous de vos débuts ensemble ?",
    "Un moment marquant des premières semaines passées ensemble ?",
    "Quelle activité ou événement vous a rapprochés davantage ?",
    "Quels gestes ou attentions illustrent vos débuts ?"
  ],
  7: [
    "Comment votre lien s'est-il renforcé naturellement avec le temps ?",
    "Quels signes montraient que votre relation devenait solide ?",
    "Comment vos habitudes et affinités se sont-elles harmonisées ?",
    "Comment avez-vous bâti votre confiance mutuelle ?"
  ],
  8: [
    "Quel premier projet ou quelle première aventure avez-vous partagés ?",
    "Comment avez-vous vécu cette expérience commune ?",
    "Quel souvenir important en est ressorti pour vous deux ?",
    "En quoi cette expérience a-t-elle renforcé votre lien ?"
  ],
  9: [
    "Quelle a été la première difficulté rencontrée ensemble ?",
    "Comment avez-vous traversé cette épreuve ?",
    "Quelles ressources ou forces avez-vous mobilisées pour avancer ?",
    "Comment cet obstacle a-t-il solidifié votre lien ?"
  ],
  10: [
    "Quelles habitudes ou rituels avez-vous créés ensemble au quotidien ?",
    "Quels petits gestes rythmaient votre vie commune ?",
    "Comment ces rituels se sont-ils installés entre vous ?",
    "En quoi ces habitudes contribuaient-elles à votre complicité ?"
  ],
  11: [
    "Quand et comment avez-vous envisagé l'idée d'avoir des enfants ?",
    "Quel projet de famille aviez-vous au départ ?",
    "Comment avez-vous vécu cette période d’attente ou de préparation ?",
    "Quels sentiments accompagnaient votre projet de parentalité ?"
  ],
  12: [
    "Comment as-tu vécu l'arrivée de votre premier enfant (ou de vos enfants) ?",
    "Comment s'est passée la naissance ou l'accueil de votre enfant ?",
    "Quels souvenirs forts gardes-tu de cette période ?",
    "Comment votre couple s'est-il adapté à cette nouvelle vie de famille ?"
  ],
  13: [
    "Comment décrirais-tu votre quotidien en famille aujourd'hui ?",
    "Quels petits moments en famille te sont les plus chers ?",
    "Comment partagez-vous les responsabilités et les plaisirs du quotidien familial ?",
    "Quels souvenirs du quotidien familial aimerais-tu garder en mémoire ?"
  ],
  14: [
    "Quels projets familiaux avez-vous nourris ensemble au fil du temps ?",
    "Quels rêves ou envies concernant votre famille partagez-vous ?",
    "Comment avez-vous construit vos projets d'avenir familial ?",
    "Comment ces projets ont-ils renforcé votre complicité de parents ?"
  ]
};

export const questions = Object.values(questionsParChapitre).flat();
export const sequenceParQuestion = Object.entries(questionsParChapitre)
  .flatMap(([chapitre, liste]) => Array(liste.length).fill(Number(chapitre)));
