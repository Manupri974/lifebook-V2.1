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
  11: "Chapitre 11 — Les moments forts de votre histoire",
  12: "Chapitre 12 — Votre complicité au fil du temps",
  13: "Chapitre 13 — Votre quotidien aujourd'hui",
  14: "Chapitre 14 — Vos rêves et projets imaginés ensemble"
};

export const questionsParChapitre = {
  1: [
    "Où es-tu né(e) et dans quel environnement as-tu grandi ?",
    "Quels souvenirs marquants de ton enfance ou adolescence as-tu en tête ?",
    "Quelles valeurs ou influences t'ont particulièrement marqué(e) en grandissant ?",
    "Quels étaient tes rêves ou aspirations à cette époque ?",
    "Comment te décrirais-tu juste avant de rencontrer ${prenomB} ?"
  ],
  2: [
    "Où est né(e) ${prenomB}, d'après ce que tu sais ?",
    "Quels souvenirs ou traits d'enfance de ${prenomB} t'ont marqué(e) ?",
    "Quelles valeurs ou passions animaient ${prenomB} avant votre rencontre ?",
    "Comment décrirais-tu la personnalité de ${prenomB} avant que vos chemins ne se croisent ?",
    "Qu'est-ce qui t'a touché en apprenant son histoire passée ?"
  ],
  3: [
    "Dans quel contexte vous êtes-vous rencontrés pour la première fois ?",
    "Quel événement ou quelle situation a permis votre rencontre ?",
    "Quels éléments particuliers entouraient ce moment-là ?",
    "Comment cette rencontre a-t-elle marqué vos parcours respectifs ?"
  ],
  4: [
    "Où et comment s'est passée votre toute première rencontre ?",
    "Quelle a été ta première impression lors de ce moment ?",
    "Quels détails ou gestes t'ont marqué(e) lors de cette première rencontre ?",
    "Comment votre première vraie connexion s'est-elle installée ?"
  ],
  5: [
    "Comment avez-vous commencé à créer des liens après votre rencontre ?",
    "Quelles premières activités ou échanges ont favorisé votre rapprochement ?",
    "Quel rythme a pris votre relation au début ?",
    "Comment vos premiers moments ensemble ont-ils posé les bases de votre histoire ?"
  ],
  6: [
    "Quels souvenirs forts gardez-vous de vos débuts ensemble ?",
    "Quel moment particulier reste inoubliable de vos premières semaines ?",
    "Quelle activité, sortie ou aventure vous a particulièrement rapprochés ?",
    "Quels petits gestes ou attentions ont forgé vos premiers souvenirs communs ?"
  ],
  7: [
    "Comment votre lien s'est-il renforcé naturellement avec le temps ?",
    "Quels signes montraient que vous construisiez quelque chose de fort ?",
    "Comment vos habitudes ou affinités se sont-elles harmonisées progressivement ?",
    "Comment avez-vous installé une confiance durable entre vous ?"
  ],
  8: [
    "Quel premier projet ou quelle première aventure avez-vous partagée ?",
    "Comment avez-vous vécu cette expérience ensemble ?",
    "Quel souvenir fort en est ressorti pour vous deux ?",
    "En quoi cette expérience a-t-elle renforcé votre complicité ?"
  ],
  9: [
    "Quelle première difficulté avez-vous rencontrée ensemble ?",
    "Comment avez-vous réagi face à cet obstacle ?",
    "Quelles ressources communes avez-vous mobilisées pour avancer ?",
    "Comment cette épreuve a-t-elle contribué à renforcer votre lien ?"
  ],
  10: [
    "Quelles habitudes ou petits rituels avez-vous créés dans votre quotidien ?",
    "Quels gestes ou traditions symbolisent votre vie commune ?",
    "Comment ces rituels se sont-ils installés naturellement entre vous ?",
    "En quoi ces habitudes renforcent-elles votre lien aujourd'hui ?"
  ],
  11: [
    "Quels moments forts ont marqué votre histoire commune ?",
    "Un événement, un voyage ou une fête que vous chérissez particulièrement ?",
    "Quels souvenirs illustrent le mieux votre aventure ensemble ?",
    "Comment ces expériences racontent-elles votre histoire ?"
  ],
  12: [
    "Comment votre complicité a-t-elle évolué au fil du temps ?",
    "Quels gestes, regards ou habitudes traduisent votre entente aujourd'hui ?",
    "Comment votre manière de communiquer s'est-elle enrichie avec les années ?",
    "Quels moments récents illustrent votre harmonie actuelle ?"
  ],
  13: [
    "Comment avez-vous construit votre quotidien ensemble ?",
    "Quels petits moments rythment votre vie aujourd'hui ?",
    "Comment partagez-vous les plaisirs simples du quotidien ?",
    "Quelles routines ou plaisirs partagés font partie de votre vie commune ?"
  ],
  14: [
    "Quels projets ou rêves avez-vous nourris ensemble au fil des années ?",
    "Comment exprimiez-vous vos envies d'avenir commun ?",
    "Quelles visions de vie partagiez-vous ensemble ?",
    "Comment vos projets communs ont-ils renforcé votre lien ?"
  ]
};

export const questions = Object.values(questionsParChapitre).flat();
export const sequenceParQuestion = Object.entries(questionsParChapitre)
  .flatMap(([chapitre, liste]) => Array(liste.length).fill(Number(chapitre)));
