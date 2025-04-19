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
  11: "Chapitre 11 — Le projet d’avoir des enfants",
  12: "Chapitre 12 — L'arrivée de leur(s) enfant(s)",
  13: "Chapitre 13 — Leur quotidien en famille",
  14: "Chapitre 14 — Leurs projets et rêves familiaux"
};

export const questionsParChapitre = {
  1: [
    "Où est né(e) ${prenomA} et dans quel environnement a-t-il/elle grandi ?",
    "Quels souvenirs marquants d'enfance ou d'adolescence ont façonné ${prenomA} ?",
    "Quelles valeurs ou influences importantes ont marqué la jeunesse de ${prenomA} ?",
    "Quels étaient les rêves ou aspirations de ${prenomA} durant son adolescence ?",
    "Comment était ${prenomA} avant sa rencontre avec ${prenomB} ?"
  ],
  2: [
    "Où est né(e) ${prenomB} et dans quel environnement a-t-il/elle grandi ?",
    "Quels souvenirs ou traits d'enfance ont façonné ${prenomB} ?",
    "Quelles valeurs ou passions animaient ${prenomB} dans sa jeunesse ?",
    "Comment la personnalité de ${prenomB} était-elle perçue avant la rencontre ?",
    "Quels rêves ou projets occupaient ${prenomB} avant leur histoire commune ?"
  ],
  3: [
    "Dans quel contexte ${prenomA} et ${prenomB} se sont-ils rencontrés ?",
    "Quel événement ou quelle situation a permis leur rencontre ?",
    "Quels éléments particuliers entouraient cette rencontre ?",
    "Comment leur rencontre s’est-elle inscrite dans le cours de leur vie respective ?"
  ],
  4: [
    "Où et comment leur toute première rencontre s'est-elle déroulée ?",
    "Quelle impression générale cette rencontre a-t-elle laissée ?",
    "Quels détails ou gestes ont marqué ce moment initial ?",
    "Comment la première connexion s'est-elle faite entre eux ?"
  ],
  5: [
    "Comment ${prenomA} et ${prenomB} ont-ils commencé à créer du lien après leur rencontre ?",
    "Quelles activités ou échanges ont favorisé leur rapprochement ?",
    "Quel rythme leur relation a-t-elle pris dans ses débuts ?",
    "Comment leurs premiers moments ensemble ont-ils posé les bases de leur histoire ?"
  ],
  6: [
    "Quels souvenirs forts marquent les débuts de leur histoire ensemble ?",
    "Un moment marquant des premières semaines partagées ?",
    "Quelle activité, sortie ou événement a renforcé leur complicité ?",
    "Quels gestes ou attentions ont forgé leurs premiers souvenirs communs ?"
  ],
  7: [
    "Comment leur lien s'est-il construit naturellement avec le temps ?",
    "Quels signes montraient que leur relation se consolidait ?",
    "Comment leurs habitudes et affinités se sont-elles harmonisées peu à peu ?",
    "Comment la confiance mutuelle s'est-elle installée entre eux ?"
  ],
  8: [
    "Quel a été leur premier projet ou leur première aventure commune ?",
    "Comment ont-ils vécu cette expérience partagée ?",
    "Quel souvenir important en est ressorti pour eux ?",
    "En quoi cette aventure a-t-elle renforcé leur lien ?"
  ],
  9: [
    "Quelle première difficulté ${prenomA} et ${prenomB} ont-ils rencontrée ensemble ?",
    "Comment ont-ils traversé cette épreuve ?",
    "Quelles ressources communes ont-ils mobilisées pour avancer ?",
    "Comment cette épreuve a-t-elle renforcé leur lien ?"
  ],
  10: [
    "Quelles habitudes ou petits rituels ont-ils créés dans leur quotidien ?",
    "Quels gestes ou traditions rythmaient leur vie commune ?",
    "Comment ces rituels se sont-ils installés naturellement entre eux ?",
    "En quoi ces habitudes renforçaient-elles leur complicité ?"
  ],
  11: [
    "Quand et comment ont-ils envisagé l'idée de devenir parents ?",
    "Comment ont-ils mûri leur projet d’agrandir leur famille ?",
    "Quels sentiments ou espoirs accompagnaient ce projet d’enfant(s) ?",
    "Comment ont-ils préparé cette nouvelle étape dans leur vie commune ?"
  ],
  12: [
    "Comment ont-ils vécu l'arrivée de leur premier enfant (ou de leurs enfants) ?",
    "Quels souvenirs forts gardent-ils de la naissance ou de l'accueil de leur(s) enfant(s) ?",
    "Comment leur vie a-t-elle changé après devenir parents ?",
    "Quels moments marquants ont illustré leurs débuts en tant que famille ?"
  ],
  13: [
    "Comment leur quotidien s'organisait-il en famille ?",
    "Quels petits moments rythmaient leur vie de famille ?",
    "Comment partageaient-ils les responsabilités et les plaisirs du quotidien familial ?",
    "Quels souvenirs de leur vie de famille mériteraient d'être retenus ?"
  ],
  14: [
    "Quels projets familiaux ${prenomA} et ${prenomB} nourrissaient-ils ensemble ?",
    "Quels rêves ou envies concernant leur famille partageaient-ils ?",
    "Comment ont-ils construit leurs projets d'avenir en tant que parents ?",
    "Comment ces projets familiaux ont-ils renforcé leur lien au fil du temps ?"
  ]
};

export const questions = Object.values(questionsParChapitre).flat();
export const sequenceParQuestion = Object.entries(questionsParChapitre)
  .flatMap(([chapitre, liste]) => Array(liste.length).fill(Number(chapitre)));
