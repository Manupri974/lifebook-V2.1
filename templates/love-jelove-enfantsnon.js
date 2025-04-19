export const titreChapitres = {
  1: "Chapitre 1 — Les origines et la jeunesse de ${prenomA}",
  2: "Chapitre 2 — Les origines et la jeunesse de ${prenomB}",
  3: "Chapitre 3 — Comment leurs chemins se sont croisés",
  4: "Chapitre 4 — Leur première rencontre",
  5: "Chapitre 5 — Les débuts de leur relation",
  6: "Chapitre 6 — Leurs premiers souvenirs marquants",
  7: "Chapitre 7 — La construction naturelle de leur lien",
  8: "Chapitre 8 — Leurs premiers projets ou aventures",
  9: "Chapitre 9 — Leurs premières difficultés et la manière dont ils les ont surmontées",
  10: "Chapitre 10 — Leurs habitudes et rituels communs",
  11: "Chapitre 11 — Les moments forts de leur histoire",
  12: "Chapitre 12 — Leur complicité au fil du temps",
  13: "Chapitre 13 — Leur quotidien construit ensemble",
  14: "Chapitre 14 — Leurs rêves et projets imaginés ensemble"
};

export const questionsParChapitre = {
  1: [
    "Où est né(e) ${prenomA} et dans quel environnement a-t-il/elle grandi ?",
    "Quels souvenirs marquants d'enfance ou d'adolescence ont façonné ${prenomA} ?",
    "Quelles valeurs ou influences importantes ont guidé ${prenomA} en grandissant ?",
    "Quels étaient les rêves ou aspirations de jeunesse de ${prenomA} ?",
    "Comment se définissait la personnalité de ${prenomA} avant la rencontre avec ${prenomB} ?"
  ],
  2: [
    "Où est né(e) ${prenomB} et dans quel environnement a-t-il/elle grandi ?",
    "Quels souvenirs marquants d'enfance ou d'adolescence ont façonné ${prenomB} ?",
    "Quelles valeurs ou influences importantes ont guidé ${prenomB} en grandissant ?",
    "Quels étaient les rêves ou aspirations de jeunesse de ${prenomB} ?",
    "Comment se définissait la personnalité de ${prenomB} avant la rencontre avec ${prenomA} ?"
  ],
  3: [
    "Dans quel contexte ${prenomA} et ${prenomB} se sont-ils rencontrés pour la première fois ?",
    "Quel événement ou quelle situation a provoqué leur première rencontre ?",
    "Quels éléments particuliers entouraient ce premier croisement de chemins ?",
    "Comment cette rencontre s’est-elle inscrite dans le déroulement de leurs vies respectives ?"
  ],
  4: [
    "Où et comment s'est déroulée la toute première rencontre entre ${prenomA} et ${prenomB} ?",
    "Quelle impression générale avait laissé cette première rencontre ?",
    "Quels détails ou circonstances avaient marqué ce premier moment ensemble ?",
    "Comment s'était installée la première vraie connexion entre eux ?"
  ],
  5: [
    "Comment ${prenomA} et ${prenomB} avaient-ils commencé à nouer des liens après leur rencontre ?",
    "Quelles premières activités ou échanges avaient contribué à leur rapprochement ?",
    "Quel rythme avait pris leur relation au départ ?",
    "Comment leurs premiers échanges avaient-ils posé les bases de leur histoire ?"
  ],
  6: [
    "Quels souvenirs forts caractérisaient les débuts de l’histoire de ${prenomA} et ${prenomB} ?",
    "Quel moment particulier restait gravé de leurs premiers mois ensemble ?",
    "Quelle sortie, activité ou événement avait renforcé leur lien naissant ?",
    "Quels gestes ou attentions avaient marqué cette première période ?"
  ],
  7: [
    "Comment ${prenomA} et ${prenomB} avaient-ils construit leur relation naturellement ?",
    "Quels signes montraient que leur lien devenait sérieux ?",
    "Comment leurs habitudes ou leurs affinités s’étaient-elles harmonisées au fil du temps ?",
    "Comment la confiance s'était-elle installée progressivement entre eux ?"
  ],
  8: [
    "Quel avait été le premier projet ou la première aventure partagée par ${prenomA} et ${prenomB} ?",
    "Comment avaient-ils vécu cette première expérience importante ensemble ?",
    "Quel souvenir marquant en était ressorti ?",
    "En quoi cette aventure avait-elle renforcé leur complicité ?"
  ],
  9: [
    "Quel avait été leur premier défi ou difficulté à surmonter ensemble ?",
    "Comment ${prenomA} et ${prenomB} avaient-ils fait face à cette épreuve ?",
    "Quelles ressources communes avaient-ils mobilisées pour avancer ?",
    "Comment cet obstacle avait-il renforcé leur histoire ?"
  ],
  10: [
    "Quelles habitudes ou petits rituels ${prenomA} et ${prenomB} avaient-ils créés dans leur quotidien ?",
    "Quel geste ou quelle tradition symbolisait leur vie ensemble ?",
    "Comment ces rituels s’étaient-ils installés naturellement entre eux ?",
    "En quoi ces habitudes contribuaient-elles à leur lien ?"
  ],
  11: [
    "Quels moments forts avaient marqué l’histoire commune de ${prenomA} et ${prenomB} ?",
    "Un événement, un voyage ou une fête qu'ils chérissaient particulièrement ?",
    "Comment ces souvenirs illustraient-ils leur aventure commune ?",
    "Quelles expériences racontaient le mieux leur histoire ?"
  ],
  12: [
    "Comment la complicité de ${prenomA} et ${prenomB} avait-elle évolué avec le temps ?",
    "Quels signes montraient leur entente naturelle ?",
    "Comment leur manière de communiquer ou de se comprendre s'était-elle enrichie ?",
    "Quels moments récents illustraient leur harmonie ?"
  ],
  13: [
    "Comment ${prenomA} et ${prenomB} avaient-ils construit leur quotidien ensemble ?",
    "Quels moments simples rythmaient leur vie commune ?",
    "Comment leur manière de partager les jours ordinaires montrait-elle leur lien spécial ?",
    "Quelles routines ou plaisirs simples formaient la base de leur quotidien ?"
  ],
  14: [
    "Quels projets ou rêves ${prenomA} et ${prenomB} avaient-ils nourris ensemble au fil du temps ?",
    "Comment exprimaient-ils leurs envies pour l'avenir commun ?",
    "Quelles visions de vie partageaient-ils ensemble ?",
    "Comment ces aspirations renforçaient-elles leur lien au fil des années ?"
  ]
};

export const questions = Object.values(questionsParChapitre).flat();
export const sequenceParQuestion = Object.entries(questionsParChapitre)
  .flatMap(([chapitre, liste]) => Array(liste.length).fill(Number(chapitre)));
