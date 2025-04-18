export const titreChapitres = {
  1: "Chapitre 1 — Origines et enfance",
  2: "Chapitre 2 — Premiers souvenirs marquants",
  3: "Chapitre 3 — Jeux, passions et imagination",
  4: "Chapitre 4 — Famille et premières influences",
  5: "Chapitre 5 — Fratrie et relations familiales",
  6: "Chapitre 6 — Scolarité et apprentissages précoces",
  7: "Chapitre 7 — Premiers centres d'intérêt et talents",
  8: "Chapitre 8 — Adolescence et construction de soi",
  9: "Chapitre 9 — Amitiés, réseaux sociaux et appartenances",
 10: "Chapitre 10 — Premiers amours et découvertes affectives",
 11: "Chapitre 11 — Affirmation personnelle et questionnements",
 12: "Chapitre 12 — Études, choix professionnels et premiers projets",
 13: "Chapitre 13 — Entrée dans la vie adulte : travail et indépendance",
 14: "Chapitre 14 — Vie d'adulte : voyages, engagements, famille",
 15: "Chapitre 15 — Bilan personnel et aspirations futures"
};

export const questionsParChapitre = {
  1: [
    "Quel est votre prénom, votre date et lieu de naissance ?",
    "Votre prénom ou votre nom de famille a-t-il une signification pour vous aujourd'hui ?",
    "Comment décririez-vous votre milieu d'origine (ville, campagne, autre) ?",
    "Une anecdote ou souvenir raconté sur votre naissance ou vos premiers jours ?"
  ],
  2: [
    "Quels souvenirs d'enfance vous viennent spontanément en tête ?",
    "Comment était l’environnement où vous avez grandi (maison, quartier, ambiance) ?",
    "Quelles étaient les traditions ou habitudes marquantes dans votre famille ?",
    "Un son, une odeur ou une image forte qui vous ramène immédiatement à cette époque ?"
  ],
  3: [
    "Quels étaient vos jeux, passions ou activités favorites dans votre jeune âge ?",
    "Aimiez-vous jouer seul(e) ou entouré(e) ?",
    "Aviez-vous un objet, un lieu ou une activité à laquelle vous étiez particulièrement attaché(e) ?",
    "Un souvenir de jeu ou d'imagination qui vous a marqué(e) ?"
  ],
  4: [
    "Quel était votre lien avec vos parents ou figures parentales durant votre enfance ?",
    "Un moment de tendresse ou de difficulté dont vous vous souvenez ?",
    "Y a-t-il une personne qui a particulièrement influencé vos valeurs ou votre vision du monde ?",
    "Comment cette influence vous impacte-t-elle encore aujourd'hui ?"
  ],
  5: [
    "Avez-vous grandi avec des frères et sœurs ?",
    "Comment décririez-vous vos relations avec eux à travers les âges ?",
    "Un souvenir fort de complicité, de rivalité ou d'entraide ?",
    "Avec le recul, comment analysez-vous vos ressemblances ou différences ?"
  ],
  6: [
    "Comment s'est déroulée votre scolarité pendant l'école primaire ?",
    "Étiez-vous un(e) élève studieux(se), rêveur(se), rebelle ?",
    "Un(e) enseignant(e) ou un événement marquant de cette époque ?",
    "Que retenez-vous de vos premières années d'apprentissage ?"
  ],
  7: [
    "Quelles passions ou talents avez-vous développés dès l’enfance ou l’adolescence ?",
    "Comment avez-vous découvert ou nourri ces centres d’intérêt ?",
    "Avez-vous été soutenu(e) ou encouragé(e) dans ces domaines ?",
    "Un souvenir marquant d’accomplissement ou de fierté lié à ces activités ?"
  ],
  8: [
    "Comment avez-vous vécu votre passage à l’adolescence ?",
    "Quels changements personnels (physiques, émotionnels) vous ont le plus marqué(e) ?",
    "Un souvenir fort lié à cette phase de transition ?",
    "Quelle émotion principale résumait votre adolescence ?"
  ],
  9: [
    "Quels types d’amitiés aviez-vous à l’adolescence et au début de l'âge adulte ?",
    "Un groupe, une amitié, un mentor qui a compté pour vous ?",
    "Un moment fort d’amitié ou une rupture marquante ?",
    "Comment votre rapport aux autres a-t-il évolué depuis ?"
  ],
 10: [
    "Quels souvenirs gardez-vous de vos premières expériences amoureuses ?",
    "Comment avez-vous vécu vos premières relations sentimentales ?",
    "Qu'avez-vous appris de vos débuts dans l'amour ?",
    "Une histoire ou une personne qui vous a particulièrement façonné(e) ?"
  ],
 11: [
    "Un moment où vous vous êtes affirmé(e) en tant qu’adulte ?",
    "Y a-t-il eu des remises en question importantes dans votre parcours ?",
    "Un événement ou une révélation qui a changé votre manière de voir le monde ?",
    "Comment avez-vous surmonté ou intégré ce changement ?"
  ],
 12: [
    "Quel a été votre parcours d'études ou d'entrée dans la vie professionnelle ?",
    "Quels choix (ou non-choix) ont guidé votre orientation ?",
    "Avez-vous connu des périodes de doute, de réorientation ou d'exploration ?",
    "Comment évaluez-vous aujourd’hui ces décisions de début de vie adulte ?"
  ],
 13: [
    "Comment s’est passée votre arrivée dans la vie active (premier emploi, installation) ?",
    "Un souvenir marquant de votre premier salaire, premier appartement, ou indépendance ?",
    "Comment avez-vous vécu votre autonomie financière et administrative ?",
    "À quel moment vous êtes-vous senti(e) pleinement adulte pour la première fois ?"
  ],
 14: [
    "Un voyage, une rencontre ou une étape personnelle importante dans votre vie d'adulte ?",
    "Comment cela vous a-t-il transformé(e) ?",
    "Quels engagements personnels (famille, couple, causes, projets) avez-vous pris ?",
    "Si vous êtes parent ou marié(e), que souhaitez-vous transmettre ou bâtir ?"
  ],
 15: [
    "Si vous deviez dresser un bilan de vos 25-35 ans, que diriez-vous ?",
    "Quelles sont vos plus grandes fiertés, réussites ou prises de conscience ?",
    "Quels rêves ou objectifs guident aujourd'hui vos projets futurs ?",
    "Quelle trace aimeriez-vous laisser à travers votre parcours de vie ?"
  ]
};

export const questions = Object.values(questionsParChapitre).flat();
export const sequenceParQuestion = Object.entries(questionsParChapitre)
  .flatMap(([chapitre, liste]) => Array(liste.length).fill(Number(chapitre)));
