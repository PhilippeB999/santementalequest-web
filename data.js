/* ============================================================
   SantéMentaleQuest — Approche en santé mentale
   Moteur cloné de PédiatrieQuest (lui-même cloné de SASIQuest).

   Programme : Santé, assistance et soins infirmiers (DEP 5325)
   Compétence 20 — « Approche privilégiée pour la personne présentant
   un problème de santé mentale » (code de cours 252-483).
   Manuel de référence : CÉMEQ.

   ⚠️⚠️ CONTENU D'AMORÇAGE — À VALIDER PAR UNE PROFESSIONNELLE ⚠️⚠️
   Rédigé à partir de connaissances générales et reconnues en soins
   infirmiers (champ d'exercice de l'infirmière auxiliaire au Québec,
   communication thérapeutique, relation d'aide, intervention de crise
   non violente, cadre légal des mesures de contrôle). Il constitue un
   POINT DE DÉPART à réviser, corriger et compléter par Jessica Ouellet
   (infirmière / enseignante) AVANT tout usage en salle de classe :
     • découpage réel du cours et vocabulaire du manuel CÉMEQ ;
     • protocoles et politiques du centre / de l'établissement ;
     • formulations retenues pour les mesures de contrôle et la
       transmission de l'information.
   Même convention que « EXEMPLES à valider/remplacer par les
   enseignants » dans sasi-web/data.js.

   ⚠️ TON : sujet sensible. Le contenu est volontairement sobre et
   respectueux — langage centré sur la personne, aucune description
   graphique de l'automutilation ou du suicide. Ces sujets sont abordés
   uniquement sous l'angle de la RECONNAISSANCE DES SIGNES et de la
   CONDUITE À TENIR.

   STRUCTURE : 8 compétences.
     1. approche_sante_mentale — compétence 20 (14 + 20 + 13 = 47 questions,
        id et contenu INCHANGÉS : la progression des élèves y est rattachée).
     2 à 8. sm_* — grands troubles (ajout nov. 2026, demande de Corinne) :
        3 paliers × 6 questions = 18 questions chacune.
        ⚠️⚠️ PREMIER JET — À VALIDER avant usage en classe.
   Chaque palier a son propre thème (tier.theme_fr / theme_en, affiché à
   l'intro du palier).

   Format des choix: chaque question a un tableau "choices" où chaque
   item a { fr, en, correct }. L'ordre est mélangé au moment de
   l'affichage (voir app.js) — la position de la bonne réponse change
   donc à chaque tentative.
   ============================================================ */

const PROGRAM = {
  fr: { title: "SantéMentaleQuest — Santé mentale (SASI 5325)", subtitle: "Contenu d'amorçage — à valider" },
  en: { title: "SantéMentaleQuest — Mental Health (SASI 5325)", subtitle: "Starter content — to be validated" }
};

function ch(fr, en, correct) { return { fr, en, correct: !!correct }; }

/* Question de type vrai/faux: affirmation à juger. */
function tf(fr, en, isTrue) { return { type: "tf", fr, en, isTrue: !!isTrue }; }

/* Question de type "association de termes": l'élève touche un terme puis
   sa définition correspondante. pairs: tableau de
   { term_fr, term_en, def_fr, def_en }. Toutes les paires doivent être
   associées correctement pour que la question soit considérée réussie. */
function pair(term_fr, term_en, def_fr, def_en) { return { term_fr, term_en, def_fr, def_en }; }
function match(fr, en, pairs) { return { type: "match", fr, en, pairs }; }

/* Question de type "situation complexe" (mise en situation): un court
   scénario réaliste suivi d'un choix multiple basé sur le jugement
   professionnel. Réutilise le même format "choices" qu'un QCM standard. */
function scenario(fr, en, choices) { return { type: "scenario", fr, en, choices }; }

/* Paliers de difficulté d'une quête. Ici, les 3 paliers couvrent chacun un
   pan distinct de chaque compétence : Débutant -> Intermédiaire -> Avancé. */
const TIER_META = [
  { level: 1, name_fr: "Débutant", name_en: "Beginner", icon: "🌱" },
  { level: 2, name_fr: "Intermédiaire", name_en: "Intermediate", icon: "⚙️" },
  { level: 3, name_fr: "Avancé", name_en: "Advanced", icon: "🏆" }
];

/* Une compétence = une quête sur la carte.
   ⚠️ ids « approche_sante_mentale » et « sm_* » : préfixe propre à cette app pour ne pas
   entrer en collision avec un module d'une autre app Quest dans le
   dictionnaire MODULE_INFO du tableau de bord enseignant. */
const COMPETENCIES = [

/* ---------- 20. Approche privilégiée en santé mentale ---------- */
{
  id: "approche_sante_mentale", order: 1,
  code: "252-483",
  title_fr: "Approche privilégiée en santé mentale",
  title_en: "Mental Health Nursing Approach",
  icon: "🧠",
  /* Résumé affiché sous la carte (fiche de compétence) : sur une carte à un
     seul nœud, il situe l'élève et évite un écran à moitié vide. */
  brief_fr: "Cette compétence porte sur l'approche à privilégier auprès d'une personne présentant un problème de santé mentale : communication thérapeutique et relation d'aide, reconnaissance des principaux troubles rencontrés, observation et transmission des données, désescalade et gestion de crise non violente, sécurité de la personne et de l'intervenant, lutte à la stigmatisation et limites du rôle de l'infirmière auxiliaire.",
  brief_en: "This competency covers the approach to favour with a person experiencing a mental health problem: therapeutic communication and the helping relationship, recognition of the main disorders encountered, observation and reporting, de-escalation and non-violent crisis management, safety of both the person and the caregiver, fighting stigma and the boundaries of the licensed practical nurse's role.",
  tiers: [

    /* ========== PALIER 1 — Fondements, communication, rôle ========== */
    {
      level: 1,
      theme_fr: "Fondements, communication thérapeutique et rôle professionnel",
      theme_en: "Foundations, therapeutic communication and professional role",
      questions: [
        {
          fr: "Selon l'Organisation mondiale de la Santé, la santé mentale se définit d'abord comme :",
          en: "According to the World Health Organization, mental health is first defined as:",
          choices: [
            ch("L'absence de tout diagnostic de trouble mental, confirmée par un médecin lors d'un examen", "The absence of any mental disorder diagnosis, confirmed by a physician during an examination"),
            ch("Un état de bien-être permettant à la personne de composer avec les tensions normales de la vie et de contribuer à sa communauté", "A state of well-being allowing a person to cope with the normal stresses of life and contribute to their community", true),
            ch("La capacité de fonctionner au travail et en société sans jamais ressentir de stress, de tristesse ni d'anxiété, quelles que soient les circonstances", "The ability to function at work and in society without ever feeling stress, sadness or anxiety, whatever the circumstances"),
            ch("Un trait de personnalité fixé à la naissance", "A personality trait fixed at birth")
          ],
          explFr: "La santé mentale n'est pas seulement l'absence de maladie : c'est un équilibre, qui varie dans le temps, entre le bien-être, la capacité d'adaptation et la participation sociale.",
          explEn: "Mental health is not merely the absence of illness: it is a balance — which varies over time — between well-being, coping ability and social participation."
        },
        {
          type: "tf",
          fr: "Un problème de santé mentale est nécessairement permanent : la personne ne peut pas retrouver un fonctionnement satisfaisant.",
          en: "A mental health problem is necessarily permanent: the person cannot regain satisfactory functioning.",
          isTrue: false,
          explFr: "Faux. Avec le traitement, le soutien et le temps, beaucoup de personnes retrouvent un fonctionnement satisfaisant. Le rétablissement est un objectif réaliste et il oriente l'approche soignante.",
          explEn: "False. With treatment, support and time, many people regain satisfactory functioning. Recovery is a realistic goal and it guides the caring approach."
        },
        {
          fr: "Quel comportement démontre le mieux l'écoute active ?",
          en: "Which behaviour best demonstrates active listening?",
          choices: [
            ch("Terminer les phrases de la personne pour lui montrer qu'on a bien compris où elle voulait en venir", "Finishing the person's sentences to show you've understood where they were going"),
            ch("Reformuler dans ses mots ce que la personne vient d'exprimer, puis vérifier avec elle", "Restating in your own words what the person just said, then checking with them", true),
            ch("Donner tout de suite un conseil pour régler le problème", "Immediately giving advice to fix the problem"),
            ch("Remplir le dossier pendant que la personne parle", "Charting while the person is speaking")
          ],
          explFr: "Reformuler puis valider montre à la personne qu'elle est entendue et permet de corriger une mauvaise compréhension avant d'aller plus loin.",
          explEn: "Restating then validating shows the person they are heard and allows a misunderstanding to be corrected before going further."
        },
        {
          fr: "Laquelle de ces questions est une question ouverte ?",
          en: "Which of these is an open-ended question?",
          choices: [
            ch("Avez-vous bien dormi ?", "Did you sleep well?"),
            ch("Comment s'est passée votre nuit ?", "How was your night?", true),
            ch("Est-ce que ça va mieux aujourd'hui ?", "Are you feeling better today?"),
            ch("Voulez-vous votre médication maintenant ?", "Do you want your medication now?")
          ],
          explFr: "Une question ouverte ne peut pas se répondre par oui ou non : elle invite la personne à décrire son vécu, ce qui donne beaucoup plus d'information clinique.",
          explEn: "An open-ended question cannot be answered yes or no: it invites the person to describe their experience, which yields far more clinical information."
        },
        {
          type: "tf",
          fr: "Dire « je sais exactement ce que vous vivez » est une bonne façon de créer un lien de confiance.",
          en: "Saying \"I know exactly what you're going through\" is a good way to build trust.",
          isTrue: false,
          explFr: "Faux. C'est une fausse réassurance qui ramène l'attention sur l'intervenant et peut faire taire la personne. On reconnaît plutôt ce qu'elle exprime et on l'invite à poursuivre.",
          explEn: "False. It is false reassurance that shifts attention to the caregiver and may silence the person. Instead, acknowledge what they express and invite them to continue."
        },
        {
          fr: "Quelle formulation respecte le mieux la personne et évite la stigmatisation ?",
          en: "Which wording best respects the person and avoids stigma?",
          choices: [
            ch("« Le jeune schizophrène qui est arrivé hier à la chambre 12 »", "“The young schizophrenic who arrived yesterday in room 12”"),
            ch("« Une personne qui vit avec la schizophrénie »", "\"A person living with schizophrenia\"", true),
            ch("« Un cas psychiatrique »", "\"A psych case\""),
            ch("« Un patient difficile »", "\"A difficult patient\"")
          ],
          explFr: "Le langage centré sur la personne place l'être humain avant le diagnostic. Réduire quelqu'un à sa maladie nourrit la stigmatisation et nuit au lien de confiance.",
          explEn: "Person-centred language puts the human being before the diagnosis. Reducing someone to their illness feeds stigma and harms the trusting relationship."
        },
        {
          ...match("Associe chaque technique de communication thérapeutique à sa définition.", "Match each therapeutic communication technique with its definition.", [
            pair("Reformulation", "Restating", "Redire dans ses propres mots le contenu du message", "Saying the content of the message back in your own words"),
            pair("Reflet", "Reflecting", "Nommer l'émotion perçue derrière les propos", "Naming the emotion perceived behind the words"),
            pair("Clarification", "Clarifying", "Demander une précision quand le message est vague", "Asking for detail when the message is vague"),
            pair("Silence thérapeutique", "Therapeutic silence", "Laisser un temps d'arrêt pour permettre à la personne de poursuivre", "Allowing a pause so the person can continue"),
            pair("Résumé", "Summarizing", "Reprendre les points essentiels à la fin de l'échange", "Going over the key points at the end of the exchange"),
            pair("Validation", "Validating", "Reconnaître que le vécu de la personne est réel pour elle", "Acknowledging that the person's experience is real to them")
          ]),
          explFr: "Ces techniques ne s'improvisent pas : elles se choisissent selon le moment. Le silence et le reflet ouvrent la parole ; le résumé et la clarification structurent l'échange.",
          explEn: "These techniques are not improvised: they are chosen according to the moment. Silence and reflection open up speech; summarizing and clarifying give structure."
        },
        {
          type: "tf",
          fr: "Un silence de quelques secondes pendant un entretien doit toujours être comblé rapidement par l'intervenant.",
          en: "A few seconds of silence during an interview must always be quickly filled by the caregiver.",
          isTrue: false,
          explFr: "Faux. Le silence laisse à la personne le temps de rassembler ses idées et ses émotions. Le combler trop vite coupe souvent ce qu'elle s'apprêtait à dire.",
          explEn: "False. Silence gives the person time to gather thoughts and feelings. Filling it too quickly often cuts off what they were about to say."
        },
        {
          ...scenario(
            "Un usager vous demande votre numéro de téléphone personnel pour pouvoir vous écrire le soir. Quelle est la conduite appropriée ?",
            "A client asks for your personal phone number so he can text you in the evening. What is the appropriate course of action?",
            [
              ch("Le lui donner en lui demandant de ne vous écrire qu'en cas d'urgence, puisque le lien de confiance passe avant tout", "Give it to him but ask him to text only in a real emergency, since the trusting relationship comes first"),
              ch("Refuser avec respect, expliquer le cadre professionnel et rappeler les ressources disponibles en dehors des heures", "Decline respectfully, explain the professional boundary and recall the resources available after hours", true),
              ch("Lui donner un faux numéro pour ne pas le blesser", "Give him a fake number so as not to hurt him"),
              ch("Ignorer la demande sans rien dire", "Ignore the request without a word")
            ]),
          explFr: "La distance thérapeutique protège les deux parties. On refuse sans rejeter la personne : on nomme le cadre, on reste chaleureux et on oriente vers les ressources appropriées.",
          explEn: "Therapeutic boundaries protect both parties. You decline without rejecting the person: name the boundary, stay warm, and point to the appropriate resources."
        },
        {
          ...scenario(
            "Un usager vous dit, la tête basse : « De toute façon, personne ici ne m'écoute. » Quelle réponse est la plus aidante ?",
            "A client says, head down: \"Nobody here listens to me anyway.\" Which response is most helpful?",
            [
              ch("« Voyons donc, tout le monde s'occupe de vous ici. »", "\"Come on, everyone takes care of you here.\""),
              ch("« Vous avez l'impression de ne pas être entendu. Parlez-m'en. »", "\"You feel you are not being heard. Tell me about it.\"", true),
              ch("« Il faut rester positif, ça ira mieux demain. »", "\"Stay positive, it'll be better tomorrow.\""),
              ch("« Je vais vous laisser vous reposer, je reviendrai quand vous serez de meilleure humeur. »", "“I'll let you rest; I'll come back when you're in a better mood.”")
            ]),
          explFr: "Le reflet reconnaît l'émotion sans la contredire et ouvre la porte à la suite. Nier le sentiment (« voyons donc ») ferme l'échange immédiatement.",
          explEn: "Reflecting acknowledges the feeling without contradicting it and opens the door to more. Denying the feeling closes the exchange at once."
        },
        {
          fr: "Comment consigner au dossier ce qu'un usager a dit et fait ?",
          en: "How should you chart what a client said and did?",
          choices: [
            ch("En résumant son interprétation professionnelle du comportement (ex. : « usager opposant et manipulateur »)", "By summarizing your professional interpretation of the behaviour (e.g. “oppositional, manipulative client”)"),
            ch("En rapportant les faits observés et les propos significatifs entre guillemets", "By reporting observed facts and significant statements in quotation marks", true),
            ch("En notant seulement ce qui sort de l'ordinaire, sans détail", "By noting only what is out of the ordinary, without detail"),
            ch("En rédigeant un résumé général à la fin de la semaine", "By writing a general summary at the end of the week")
          ],
          explFr: "On documente des faits observables et les propos textuels, pas des jugements. « Refuse de collaborer » est une interprétation ; « est resté couché et a dit : \"laissez-moi tranquille\" » est un fait.",
          explEn: "Document observable facts and verbatim statements, not judgments. \"Uncooperative\" is an interpretation; \"stayed in bed and said: 'leave me alone'\" is a fact."
        },
        {
          type: "tf",
          fr: "L'infirmière auxiliaire contribue à l'évaluation de l'état de santé en observant et en rapportant, mais l'évaluation de la condition mentale comme telle relève de l'infirmière.",
          en: "The licensed practical nurse contributes to health assessment by observing and reporting, but the assessment of mental condition itself is the registered nurse's responsibility.",
          isTrue: true,
          explFr: "Vrai. L'infirmière auxiliaire contribue à l'évaluation : ses observations sont essentielles et doivent être transmises. L'évaluation de la condition mentale et le plan thérapeutique infirmier relèvent toutefois de l'infirmière.",
          explEn: "True. The LPN contributes to assessment: their observations are essential and must be transmitted. However, assessing the mental condition and the nursing care plan belong to the registered nurse."
        },
        {
          fr: "Deux membres du personnel discutent du diagnostic d'un usager dans l'ascenseur. Quelle affirmation est juste ?",
          en: "Two staff members discuss a client's diagnosis in the elevator. Which statement is correct?",
          choices: [
            ch("C'est acceptable si aucun membre de la famille n'est présent", "It's acceptable if no family member is present"),
            ch("C'est un bris de confidentialité : l'information clinique se discute dans un lieu privé, entre les personnes concernées par les soins", "It's a breach of confidentiality: clinical information is discussed in a private setting, among those involved in the care", true),
            ch("C'est permis puisque les deux personnes font partie du personnel", "It's allowed since both are staff members"),
            ch("C'est acceptable tant qu'on ne prononce ni le nom de l'usager ni son numéro de chambre, puisque personne ne peut alors l'identifier clairement", "It's acceptable as long as neither the client's name nor his room number is said, since no one can then clearly identify him")
          ],
          explFr: "La confidentialité ne dépend ni du lieu ni des personnes présentes : l'information clinique ne circule qu'entre les intervenants concernés par les soins, dans un endroit approprié.",
          explEn: "Confidentiality does not depend on the place or on who is present: clinical information circulates only among caregivers involved in the care, in an appropriate setting."
        },
        {
          ...scenario(
            "Vous entrez pour la première fois dans la chambre d'un usager visiblement anxieux. Quelle approche est la plus appropriée ?",
            "You enter the room of a visibly anxious client for the first time. Which approach is most appropriate?",
            [
              ch("Entrer sans frapper pour ne pas le faire sursauter, commencer les soins tout de suite et lui expliquer qui vous êtes à la fin", "Enter without knocking so as not to startle him, start care right away and explain who you are at the end"),
              ch("Frapper, vous présenter par votre nom et votre fonction, expliquer ce que vous venez faire et demander son accord", "Knock, introduce yourself by name and role, explain what you are there to do and ask for consent", true),
              ch("Parler fort pour être certain d'être bien compris", "Speak loudly to make sure you are understood"),
              ch("Attendre en silence qu'il vous adresse la parole en premier", "Wait silently for him to speak to you first")
            ]),
          explFr: "Se nommer, annoncer son intention et demander l'accord réduit l'anxiété et respecte la personne. Le premier contact détermine souvent la qualité de toute la relation.",
          explEn: "Introducing yourself, stating your intent and asking consent reduces anxiety and respects the person. The first contact often sets the tone for the whole relationship."
        }
      ]
    },

    /* ========== PALIER 2 — Troubles courants, relation d'aide, surveillance ========== */
    {
      level: 2,
      theme_fr: "Troubles courants, relation d'aide et surveillance clinique",
      theme_en: "Common disorders, helping relationship and clinical monitoring",
      questions: [
        {
          fr: "Quels signes physiques accompagnent fréquemment une montée d'anxiété ?",
          en: "Which physical signs frequently accompany rising anxiety?",
          choices: [
            ch("Tachycardie, tremblements, sudation, souffle court", "Tachycardia, tremors, sweating, shortness of breath", true),
            ch("Bradycardie, peau sèche, somnolence", "Bradycardia, dry skin, drowsiness"),
            ch("Hypothermie et rougeur généralisée", "Hypothermia and generalized flushing"),
            ch("Aucun : l'anxiété est un phénomène purement psychologique", "None at all: anxiety is a purely psychological phenomenon")
          ],
          explFr: "L'anxiété a une composante physique bien réelle (activation du système nerveux sympathique). Reconnaître ces signes permet d'intervenir tôt, avant l'escalade.",
          explEn: "Anxiety has a very real physical component (sympathetic nervous system activation). Recognizing these signs allows early intervention, before escalation."
        },
        {
          ...scenario(
            "Une usagère se met à respirer très vite, dit qu'elle « va mourir » et s'agrippe à la table. Quelle intervention est prioritaire ?",
            "A client starts breathing very fast, says she is \"going to die\" and grips the table. Which intervention is the priority?",
            [
              ch("La laisser seule le temps que ça passe", "Leave her alone until it passes"),
              ch("Rester avec elle, parler calmement en phrases courtes, l'aider à ralentir sa respiration et réduire les stimuli autour", "Stay with her, speak calmly in short sentences, help her slow her breathing and reduce surrounding stimuli", true),
              ch("Lui demander de s'asseoir et d'expliquer en détail, dès maintenant, toutes les causes possibles de son anxiété pour mieux l'évaluer", "Ask her to sit down and explain in detail, right now, every possible cause of her anxiety so it can be better assessed"),
              ch("Hausser la voix pour capter son attention", "Raise your voice to get her attention")
            ]),
          explFr: "Pendant une crise d'anxiété aiguë, la capacité de raisonner est réduite : on privilégie la présence, un ton calme, des consignes simples et un environnement apaisé. L'exploration des causes vient après.",
          explEn: "During acute anxiety, the ability to reason is reduced: favour presence, a calm tone, simple instructions and a quiet environment. Exploring causes comes later."
        },
        {
          type: "tf",
          fr: "Pendant une crise d'anxiété aiguë, il vaut mieux laisser la personne seule pour qu'elle se calme d'elle-même.",
          en: "During an acute anxiety episode, it is better to leave the person alone so they calm down on their own.",
          isTrue: false,
          explFr: "Faux. La présence rassurante d'un intervenant calme fait partie de l'intervention. Laisser la personne seule augmente le sentiment d'abandon et peut aggraver la crise.",
          explEn: "False. The reassuring presence of a calm caregiver is part of the intervention. Leaving the person alone increases feelings of abandonment and may worsen the episode."
        },
        {
          fr: "Chez une personne présentant des signes dépressifs, quels éléments doivent être observés et rapportés ?",
          en: "In a person showing depressive signs, which elements must be observed and reported?",
          choices: [
            ch("Perte d'intérêt, changement d'appétit, trouble du sommeil, ralentissement, propos de dévalorisation", "Loss of interest, appetite change, sleep disturbance, slowing, self-deprecating statements", true),
            ch("Uniquement les pleurs visibles", "Only visible crying"),
            ch("Seulement le refus de la médication", "Only medication refusal"),
            ch("Seulement les changements de poids et d'appétit, car l'humeur et le sommeil relèvent uniquement de l'évaluation de l'infirmière", "Only changes in weight and appetite, since mood and sleep fall solely under the nurse's assessment")
          ],
          explFr: "La dépression ne se voit pas toujours par des pleurs. Le retrait, l'anhédonie, les changements de sommeil et d'appétit et les propos de dévalorisation sont des observations à transmettre.",
          explEn: "Depression is not always visible through crying. Withdrawal, anhedonia, sleep and appetite changes and self-deprecating statements are observations to report."
        },
        {
          ...match("Associe chaque terme clinique à sa définition.", "Match each clinical term with its definition.", [
            pair("Hallucination", "Hallucination", "Perception sans stimulus réel (par exemple entendre une voix)", "Perception without a real stimulus (for example hearing a voice)"),
            pair("Idée délirante", "Delusion", "Croyance maintenue fermement malgré les preuves du contraire", "A belief firmly held despite evidence to the contrary"),
            pair("Anhédonie", "Anhedonia", "Perte de plaisir pour des activités autrefois appréciées", "Loss of pleasure in activities once enjoyed"),
            pair("Anxiété", "Anxiety", "Appréhension diffuse, sans danger précis identifiable", "Diffuse apprehension, with no clearly identifiable danger"),
            pair("Apathie", "Apathy", "Absence de motivation et d'initiative", "Lack of motivation and initiative"),
            pair("Insomnie initiale", "Initial insomnia", "Difficulté à s'endormir au moment du coucher", "Difficulty falling asleep at bedtime")
          ]),
          explFr: "Employer le bon terme au bon moment rend la transmission d'information précise et utile à l'équipe. Un mot imprécis au dossier peut fausser la suite des interventions.",
          explEn: "Using the right term at the right time makes handover precise and useful to the team. A vague word in the chart can distort what follows."
        },
        {
          ...scenario(
            "Un usager vous dit entendre des voix qui le critiquent. Quelle réponse est la plus appropriée ?",
            "A client tells you he hears voices criticizing him. Which response is most appropriate?",
            [
              ch("« Il n'y a aucune voix, vous imaginez tout ça. »", "\"There are no voices, you're imagining it all.\""),
              ch("« Je n'entends pas ces voix, mais je vois que ça vous trouble. Je reste avec vous. »", "\"I don't hear those voices, but I can see it's distressing you. I'll stay with you.\"", true),
              ch("« Elles ont sûrement raison, il faut les écouter. »", "\"They're probably right, you should listen to them.\""),
              ch("« Ne m'en parlez plus, parler des voix ne ferait qu'empirer les choses ; essayez plutôt de dormir. »", "“Don't talk to me about it anymore; talking about the voices would only make things worse — try to sleep instead.”")
            ]),
          explFr: "On ne confirme pas le contenu de l'hallucination et on ne le conteste pas non plus : on reconnaît l'émotion, on offre une présence et on rapporte à l'infirmière — en particulier si les voix commandent des gestes dangereux.",
          explEn: "Do not confirm the content of the hallucination, and do not argue against it either: acknowledge the emotion, offer presence and report to the nurse — especially if the voices command dangerous acts."
        },
        {
          fr: "Lequel de ces éléments est un symptôme dit « négatif » d'un trouble psychotique ?",
          en: "Which of these is a so-called \"negative\" symptom of a psychotic disorder?",
          choices: [
            ch("Les hallucinations", "Hallucinations"),
            ch("Le retrait social et l'émoussement des émotions", "Social withdrawal and blunted emotions", true),
            ch("Les idées délirantes", "Delusions"),
            ch("L'agitation motrice et le discours très désorganisé", "Motor agitation and very disorganized speech")
          ],
          explFr: "Les symptômes positifs s'ajoutent au fonctionnement normal (hallucinations, idées délirantes) ; les symptômes négatifs correspondent à ce qui est en moins (retrait, apathie, émoussement affectif). Ces derniers sont souvent sous-estimés.",
          explEn: "Positive symptoms are additions to normal functioning (hallucinations, delusions); negative symptoms are what is missing (withdrawal, apathy, blunted affect). The latter are often underestimated."
        },
        {
          ...scenario(
            "Un usager sous antipsychotique présente depuis deux jours une rigidité, des tremblements et une incapacité à rester assis en place. Que faites-vous ?",
            "A client on antipsychotics has had rigidity, tremors and an inability to sit still for two days. What do you do?",
            [
              ch("Cesser la médication de votre propre initiative", "Stop the medication on your own initiative"),
              ch("Consigner vos observations et les rapporter sans délai à l'infirmière : il peut s'agir d'effets extrapyramidaux", "Document your observations and report them promptly to the nurse: these may be extrapyramidal effects", true),
              ch("Le rassurer en lui expliquant que c'est de la nervosité liée à l'hospitalisation, puis réévaluer dans une semaine", "Reassure him that it's nervousness related to being in hospital, then reassess in a week"),
              ch("L'encourager à marcher davantage et ne rien inscrire au dossier", "Encourage him to walk more and chart nothing")
            ]),
          explFr: "Rigidité, tremblements et akathisie (impossibilité de rester en place) sont des effets indésirables connus des antipsychotiques. L'infirmière auxiliaire surveille, documente et transmet ; elle ne modifie jamais une médication de sa propre initiative.",
          explEn: "Rigidity, tremors and akathisia (inability to stay still) are known adverse effects of antipsychotics. The LPN monitors, documents and reports; they never change a medication on their own initiative."
        },
        {
          ...scenario(
            "Un usager refuse sa médication du matin. Quelle conduite est appropriée ?",
            "A client refuses his morning medication. What is the appropriate course of action?",
            [
              ch("Écraser le comprimé dans son jus sans le lui dire", "Crush the pill into his juice without telling him"),
              ch("Explorer calmement la raison du refus, donner l'information utile, respecter le refus et le rapporter à l'infirmière et au dossier", "Calmly explore the reason for the refusal, give useful information, respect the refusal and report it to the nurse and in the chart", true),
              ch("Insister jusqu'à ce qu'il cède", "Insist until he gives in"),
              ch("Lui rappeler que la médication est obligatoire pendant l'hospitalisation et lui offrir de la reprendre plus tard, sans rien noter au dossier", "Remind him medication is mandatory during hospitalization and offer it again later, without noting anything in the record")
            ]),
          explFr: "Administrer un médicament à l'insu de la personne est une atteinte à son consentement. Le refus est un droit : on cherche à comprendre, on informe, on respecte, on transmet et on documente.",
          explEn: "Giving medication without the person's knowledge violates consent. Refusal is a right: seek to understand, inform, respect, report and document."
        },
        {
          fr: "Un usager traité au lithium présente des vomissements, des tremblements marqués et de la confusion. Quelle est la conduite à tenir ?",
          en: "A client treated with lithium has vomiting, marked tremors and confusion. What should be done?",
          choices: [
            ch("Rapporter sans délai à l'infirmière : ces signes peuvent évoquer une toxicité", "Report promptly to the nurse: these signs may suggest toxicity", true),
            ch("Administrer une dose supplémentaire", "Give an extra dose"),
            ch("Lui faire boire beaucoup d'eau et attendre 24 heures avant d'en parler à l'infirmière", "Have him drink plenty of water and wait 24 hours before telling the nurse"),
            ch("Offrir un café pour stimuler l'usager", "Offer coffee to stimulate the client")
          ],
          explFr: "Le lithium a une marge thérapeutique étroite. Vomissements, tremblements marqués, diarrhée et confusion sont des signes à transmettre immédiatement : la surveillance clinique fait partie du rôle de l'infirmière auxiliaire.",
          explEn: "Lithium has a narrow therapeutic range. Vomiting, marked tremors, diarrhea and confusion must be reported immediately: clinical monitoring is part of the LPN's role."
        },
        {
          type: "tf",
          fr: "L'effet thérapeutique complet d'un antidépresseur apparaît généralement après quelques semaines de traitement.",
          en: "The full therapeutic effect of an antidepressant generally appears after a few weeks of treatment.",
          isTrue: true,
          explFr: "Vrai. Il faut souvent de deux à quatre semaines, parfois plus. Ce délai doit être expliqué à la personne — beaucoup abandonnent le traitement en croyant qu'il ne fonctionne pas — et la surveillance reste étroite durant cette période.",
          explEn: "True. It often takes two to four weeks, sometimes longer. This delay must be explained to the person — many stop treatment believing it doesn't work — and monitoring stays close during that period."
        },
        {
          fr: "Dans une relation d'aide, quel est le rôle de l'intervenant ?",
          en: "In a helping relationship, what is the caregiver's role?",
          choices: [
            ch("Trouver la solution à la place de la personne", "Finding the solution in the person's place"),
            ch("Accompagner la personne pour qu'elle explore sa situation et mobilise ses propres ressources", "Supporting the person so they can explore their situation and mobilize their own resources", true),
            ch("Raconter ses propres expériences personnelles semblables pour montrer qu'il comprend vraiment la situation", "Sharing similar personal experiences of their own to show they truly understand"),
            ch("Éviter toute émotion afin de rester objectif", "Avoiding all emotion in order to stay objective")
          ],
          explFr: "La relation d'aide vise l'autonomie : la personne reste actrice de sa situation. Donner des solutions toutes faites ou parler de soi déplace le centre de l'échange.",
          explEn: "The helping relationship aims at autonomy: the person remains the actor in their own situation. Handing out ready-made solutions or talking about yourself shifts the focus of the exchange."
        },
        {
          fr: "Quelle est la principale différence entre le trouble d'anxiété généralisée et le trouble panique ?",
          en: "What is the main difference between generalized anxiety disorder and panic disorder?",
          choices: [
            ch("Le trouble d'anxiété généralisée se manifeste par une inquiétude excessive et persistante face à plusieurs sujets du quotidien, alors que le trouble panique se manifeste par des crises soudaines et intenses", "Generalized anxiety disorder involves excessive, persistent worry about several everyday topics, while panic disorder involves sudden, intense attacks", true),
            ch("Le trouble d'anxiété généralisée se manifeste par des crises soudaines et intenses qui culminent en quelques minutes, alors que le trouble panique se manifeste par une inquiétude constante et diffuse face à plusieurs sujets du quotidien", "Generalized anxiety disorder shows up as sudden, intense attacks peaking within minutes, whereas panic disorder shows up as constant, diffuse worry about many everyday matters"),
            ch("Ce sont deux noms différents pour exactement le même trouble", "These are just two different names for the exact same disorder"),
            ch("Le trouble panique ne touche que les enfants", "Panic disorder only affects children")
          ],
          explFr: "Le TAG se caractérise par une inquiétude diffuse et chronique (6 mois ou plus) portant sur plusieurs sphères de vie. Le trouble panique se manifeste plutôt par des attaques ponctuelles, intenses, avec des symptômes physiques marqués (palpitations, souffle court, peur de mourir). Bien reconnaître lequel est en cause oriente l'intervention.",
          explEn: "GAD is characterized by diffuse, chronic worry (6 months or more) about several areas of life. Panic disorder instead involves discrete, intense attacks with marked physical symptoms (palpitations, shortness of breath, fear of dying). Correctly identifying which one is at play guides the intervention."
        },
        {
          fr: "Qu'est-ce qui distingue un trouble bipolaire d'un trouble dépressif majeur ?",
          en: "What distinguishes bipolar disorder from major depressive disorder?",
          choices: [
            ch("Le trouble bipolaire comporte aussi des épisodes de manie ou d'hypomanie (énergie et impulsivité accrues), en plus des épisodes dépressifs", "Bipolar disorder also includes manic or hypomanic episodes (increased energy and impulsivity), in addition to depressive episodes", true),
            ch("Le trouble bipolaire comporte des épisodes dépressifs plus longs et plus sévères, alors que la dépression majeure comporte aussi des phases d'euphorie", "Bipolar disorder involves longer, more severe depressive episodes, whereas major depression also includes phases of euphoria"),
            ch("La dépression majeure implique toujours des hallucinations", "Major depression always involves hallucinations"),
            ch("Il n'y a aucune différence clinique entre les deux", "There is no clinical difference between the two")
          ],
          explFr: "La dépression majeure ne comprend que des épisodes dépressifs. Le trouble bipolaire alterne des épisodes dépressifs avec des épisodes maniaques ou hypomaniaques. Confondre les deux peut mener à une observation incomplète, car les signes de manie sont parfois pris pour de la simple bonne humeur.",
          explEn: "Major depression involves only depressive episodes. Bipolar disorder alternates depressive episodes with manic or hypomanic episodes. Confusing the two can lead to incomplete observation, since signs of mania are sometimes mistaken for simple good spirits."
        },
        {
          ...scenario(
            "Un usager parle très rapidement, saute d'une idée à l'autre, dit avoir dormi 2 heures cette semaine sans se sentir fatigué, et a dépensé toutes ses économies en une soirée. Que devez-vous rapporter ?",
            "A client speaks very quickly, jumps from one idea to another, says he has slept 2 hours this week without feeling tired, and spent all his savings in one evening. What should you report?",
            [
              ch("Rien : c'est simplement de la bonne humeur", "Nothing: it's simply good spirits"),
              ch("Ces signes évoquent un épisode maniaque (fuite des idées, diminution du besoin de sommeil, impulsivité) à rapporter sans délai", "These signs suggest a manic episode (racing thoughts, decreased need for sleep, impulsivity) to be reported promptly", true),
              ch("Lui dire simplement d'arrêter de dépenser", "Simply tell him to stop spending"),
              ch("Ces signes évoquent un regain d'énergie normal après une période difficile : l'encourager et en glisser un mot au prochain rapport", "These signs suggest a normal burst of energy after a hard time: encourage him and mention it at the next report")
            ]),
          explFr: "La fuite des idées, la diminution du besoin de sommeil et l'impulsivité (dépenses, décisions à risque) sont des signes classiques de manie. Ils doivent être rapportés rapidement : un épisode maniaque peut évoluer et comporte des risques réels pour la personne.",
          explEn: "Racing thoughts, decreased need for sleep and impulsivity (spending, risky decisions) are classic signs of mania. They must be reported promptly: a manic episode can escalate and carries real risks for the person."
        },
        {
          fr: "Quelle est la différence principale entre un trouble psychotique bref et la schizophrénie ?",
          en: "What is the main difference between brief psychotic disorder and schizophrenia?",
          choices: [
            ch("La durée : le trouble psychotique bref dure moins d'un mois, alors que la schizophrénie exige des signes présents depuis au moins 6 mois", "The duration: brief psychotic disorder lasts less than a month, while schizophrenia requires signs present for at least 6 months", true),
            ch("Les symptômes : le trouble psychotique bref ne comporte que des idées délirantes, alors que la schizophrénie comporte surtout des hallucinations", "The symptoms: brief psychotic disorder involves only delusions, whereas schizophrenia mainly involves hallucinations"),
            ch("La schizophrénie ne cause jamais d'idées délirantes", "Schizophrenia never causes delusions"),
            ch("Ce sont deux termes pour le même trouble", "These are two terms for the same disorder")
          ],
          explFr: "Les deux troubles peuvent présenter hallucinations et idées délirantes ; ce qui les distingue est surtout la durée et l'évolution des symptômes. Le trouble psychotique bref est ponctuel et de courte durée, souvent lié à un stress important, alors que la schizophrénie est un trouble chronique.",
          explEn: "Both disorders can present hallucinations and delusions; what mainly distinguishes them is the duration and course of symptoms. Brief psychotic disorder is short-lived, often linked to significant stress, while schizophrenia is a chronic disorder."
        },
        {
          fr: "Quel élément caractérise le trouble de la personnalité limite (borderline) ?",
          en: "What characterizes borderline personality disorder?",
          choices: [
            ch("Une froideur émotionnelle constante, une indifférence aux critiques et une absence presque totale de désir de relations avec les autres", "Constant emotional coldness, indifference to criticism and an almost complete lack of desire for relationships"),
            ch("Une instabilité marquée des relations, de l'image de soi et des émotions, avec parfois des gestes autodestructeurs", "Marked instability in relationships, self-image and emotions, sometimes with self-harming behaviour", true),
            ch("Une peur exclusive de se trouver dans des lieux publics", "An exclusive fear of being in public places"),
            ch("Une perte de contact avec la réalité en tout temps", "A constant loss of touch with reality")
          ],
          explFr: "Le trouble de la personnalité limite se caractérise par une grande instabilité émotionnelle, des relations intenses et changeantes, une image de soi fragile, et parfois de l'automutilation ou des idées suicidaires. La constance et la sécurité dans la relation d'aide sont particulièrement importantes avec cette clientèle.",
          explEn: "Borderline personality disorder is characterized by marked emotional instability, intense and shifting relationships, a fragile self-image, and sometimes self-harm or suicidal ideation. Consistency and safety in the helping relationship are especially important with this population."
        },
        {
          type: "tf",
          fr: "Le sevrage et l'intoxication à une substance produisent toujours exactement les mêmes signes cliniques.",
          en: "Withdrawal from and intoxication with a substance always produce exactly the same clinical signs.",
          isTrue: false,
          explFr: "Faux. Le sevrage et l'intoxication peuvent produire des signes opposés. Par exemple, l'intoxication à l'alcool cause une sédation, alors que le sevrage peut causer agitation, tremblements, et même des convulsions. Bien distinguer les deux oriente la surveillance et l'intervention.",
          explEn: "False. Withdrawal and intoxication can produce opposite signs. For example, alcohol intoxication causes sedation, while alcohol withdrawal can cause agitation, tremors, and even seizures. Correctly distinguishing the two guides monitoring and intervention."
        },
        {
          ...scenario(
            "Un usager connu pour une consommation régulière d'alcool a cessé de boire depuis 24 heures. Il présente tremblements, agitation, sudation et anxiété marquée. Que faites-vous ?",
            "A client known for regular alcohol use stopped drinking 24 hours ago. He shows tremors, agitation, sweating and marked anxiety. What do you do?",
            [
              ch("Le rassurer : ce sont des signes de manque normaux et sans danger, qui disparaissent d'eux-mêmes après quelques jours d'abstinence", "Reassure him: these are normal, harmless withdrawal signs that go away on their own after a few days of abstinence"),
              ch("Rapporter sans délai : ces signes évoquent un sevrage alcoolique, qui peut évoluer vers des convulsions ou un delirium tremens", "Report promptly: these signs suggest alcohol withdrawal, which can progress to seizures or delirium tremens", true),
              ch("Lui offrir un verre d'alcool pour calmer les symptômes", "Offer him a drink of alcohol to calm the symptoms"),
              ch("Attendre 48 heures avant d'intervenir", "Wait 48 hours before intervening")
            ]),
          explFr: "Le sevrage alcoolique peut évoluer rapidement et devenir dangereux (convulsions, delirium tremens). Les signes précoces (tremblements, agitation, sudation, anxiété) doivent être rapportés sans délai pour permettre une surveillance et une prise en charge appropriées.",
          explEn: "Alcohol withdrawal can progress quickly and become dangerous (seizures, delirium tremens). Early signs (tremors, agitation, sweating, anxiety) must be reported promptly to allow proper monitoring and management."
        },
        {
          fr: "Quelle est une différence clinique entre l'anorexie mentale et la boulimie ?",
          en: "What is a clinical difference between anorexia nervosa and bulimia?",
          choices: [
            ch("Dans l'anorexie, le poids est généralement très bas en raison d'une restriction alimentaire sévère, alors que dans la boulimie, le poids est souvent normal malgré des cycles de crises de boulimie et de compensation", "In anorexia, weight is generally very low due to severe food restriction, while in bulimia, weight is often normal despite cycles of binge eating and compensatory behaviour", true),
            ch("Ces troubles ne touchent que les hommes", "These disorders only affect men"),
            ch("Dans la boulimie, le poids est généralement très bas en raison d'une restriction sévère, alors que dans l'anorexie, le poids est souvent normal malgré des crises alimentaires suivies de comportements compensatoires (vomissements, laxatifs)", "In bulimia, weight is usually very low due to severe restriction, whereas in anorexia, weight is often normal despite binges followed by compensatory behaviours (vomiting, laxatives)"),
            ch("L'anorexie ne comporte aucun risque médical", "Anorexia carries no medical risk")
          ],
          explFr: "Le poids très bas de l'anorexie la rend souvent plus visible, alors que le poids normal de la boulimie peut la rendre plus difficile à détecter. Dans les deux cas, une surveillance attentive (signes physiques, comportements alimentaires, état émotionnel) et un signalement rapide sont essentiels vu les risques médicaux réels.",
          explEn: "The very low weight in anorexia often makes it more visible, while the normal weight in bulimia can make it harder to detect. In both cases, careful monitoring (physical signs, eating behaviours, emotional state) and prompt reporting are essential given the real medical risks."
        }
      ]
    },

    /* ========== PALIER 3 — Crise, sécurité, jugement clinique ========== */
    {
      level: 3,
      theme_fr: "Gestion de crise, sécurité et jugement clinique",
      theme_en: "Crisis management, safety and clinical judgment",
      questions: [
        {
          ...scenario(
            "Un usager élève la voix, frappe la table et s'avance vers vous dans le corridor. Quelle est la première intervention appropriée ?",
            "A client raises his voice, hits the table and walks toward you in the hallway. What is the first appropriate intervention?",
            [
              ch("Hausser le ton et se placer devant lui pour lui montrer clairement que vous gardez le contrôle de la situation", "Raise your voice and stand in front of him to clearly show you remain in control of the situation"),
              ch("Garder une voix calme, maintenir une distance sécuritaire, éloigner les autres usagers et demander de l'aide", "Keep a calm voice, maintain a safe distance, move other clients away and call for help", true),
              ch("Le prendre par le bras pour l'apaiser", "Take him by the arm to calm him"),
              ch("Le confiner immédiatement dans sa chambre", "Immediately confine him to his room")
            ]),
          explFr: "En désescalade, le ton de l'intervenant donne le ton à la scène. Voix calme, distance, retrait du public et renfort : le contact physique et l'affrontement verbal font monter la tension.",
          explEn: "In de-escalation, the caregiver's tone sets the tone of the scene. Calm voice, distance, removing the audience and calling backup: physical contact and verbal confrontation raise tension."
        },
        {
          fr: "Quelle mesure protège le mieux l'intervenant auprès d'une personne agitée ?",
          en: "Which measure best protects the caregiver with an agitated person?",
          choices: [
            ch("Se placer entre la personne et la porte pour l'empêcher de quitter la pièce avant qu'elle soit complètement calmée", "Stand between the person and the door to stop them leaving the room before they've fully calmed down"),
            ch("Garder une voie de sortie dégagée, rester à distance et ne jamais s'isoler sans que l'équipe le sache", "Keeping an exit route clear, staying at a distance and never isolating yourself without the team knowing", true),
            ch("Travailler seul pour ne pas l'exciter davantage", "Working alone so as not to excite them further"),
            ch("Se tenir très près, face à face, pour montrer son assurance", "Standing very close, face to face, to show confidence")
          ],
          explFr: "Sécurité de base : une sortie accessible, une distance respectée et un collègue informé. Bloquer la porte enlève à la personne sa possibilité de fuir, ce qui augmente le risque d'affrontement.",
          explEn: "Basic safety: an accessible exit, a respected distance and a colleague who knows where you are. Blocking the door removes the person's escape option, which increases the risk of confrontation."
        },
        {
          ...scenario(
            "Un usager vous confie : « Je ne vois plus d'issue, ça ne sert plus à rien. » Quelle est la conduite à tenir ?",
            "A client confides: \"I don't see a way out anymore, there's no point.\" What should you do?",
            [
              ch("Changer de sujet pour ne pas aggraver les choses", "Change the subject so as not to make things worse"),
              ch("Demander directement et calmement s'il pense à s'enlever la vie, rester avec lui et rapporter immédiatement à l'infirmière", "Ask directly and calmly whether he is thinking of taking his own life, stay with him and report immediately to the nurse", true),
              ch("Lui promettre de garder cela entre vous deux", "Promise him to keep it between the two of you"),
              ch("Éviter de prononcer le mot « suicide » pour ne pas lui donner l'idée, puis en glisser un mot à l'infirmière à la fin du quart", "Avoid saying the word “suicide” so as not to give him the idea, then mention it to the nurse at the end of the shift")
            ]),
          explFr: "Devant des propos évoquant un désespoir profond, on pose la question ouvertement, sans détour. On ne laisse pas la personne seule, on transmet sans délai à l'infirmière et on documente les propos entendus.",
          explEn: "Faced with statements suggesting deep hopelessness, ask the question openly and directly. Do not leave the person alone, report to the nurse without delay and document what was said."
        },
        {
          type: "tf",
          fr: "Aborder directement la question du suicide avec une personne augmente le risque qu'elle passe à l'acte.",
          en: "Directly raising the question of suicide with a person increases the risk that they will act on it.",
          isTrue: false,
          explFr: "Faux. C'est une idée reçue tenace. En parler ouvertement, avec respect, soulage souvent la personne et ouvre la porte à l'aide. Le silence, lui, isole.",
          explEn: "False. This is a persistent myth. Talking about it openly and respectfully often relieves the person and opens the door to help. Silence, on the other hand, isolates."
        },
        {
          fr: "Un usager vous demande de promettre que vous ne direz rien de ce qu'il vient de vous confier au sujet de ses idées noires. Que faites-vous ?",
          en: "A client asks you to promise you won't tell anyone what he just shared about his dark thoughts. What do you do?",
          choices: [
            ch("Promettre : la confiance est essentielle", "Promise: trust is essential"),
            ch("Expliquer avec respect que sa sécurité prime et que l'information sera transmise à l'équipe soignante", "Respectfully explain that his safety comes first and that the information will be shared with the care team", true),
            ch("Promettre de ne rien dire, puis transmettre quand même l'information à l'équipe sans l'en informer, pour préserver le lien", "Promise to say nothing, then pass the information to the team anyway without telling him, to preserve the relationship"),
            ch("Ne rien répondre et quitter la chambre", "Say nothing and leave the room")
          ],
          explFr: "On ne promet jamais le secret sur un risque pour la vie. On explique honnêtement pourquoi l'information doit circuler dans l'équipe : dire la vérité préserve mieux la confiance qu'une promesse trahie.",
          explEn: "Never promise secrecy about a risk to life. Explain honestly why the information must be shared within the team: telling the truth preserves trust better than a broken promise."
        },
        {
          ...match("Associe chaque notion liée à la crise et aux mesures de contrôle à sa définition.", "Match each crisis and control-measure concept with its definition.", [
            pair("Contention", "Restraint", "Mesure qui restreint la liberté de mouvement d'une personne", "A measure that restricts a person's freedom of movement"),
            pair("Isolement", "Seclusion", "Confinement dans un lieu d'où la personne ne peut sortir librement", "Confinement in a place the person cannot freely leave"),
            pair("Mesure de remplacement", "Alternative measure", "Intervention essayée AVANT toute mesure de contrôle", "An intervention tried BEFORE any control measure"),
            pair("Dernier recours", "Last resort", "Principe voulant qu'on n'y vienne qu'après l'échec des autres moyens", "The principle that it is used only after other means have failed"),
            pair("Surveillance étroite", "Close monitoring", "Observation rapprochée et documentée d'une personne à risque", "Close, documented observation of a person at risk"),
            pair("Retour post-événement", "Post-event debriefing", "Échange avec la personne et l'équipe après un épisode difficile", "A discussion with the person and the team after a difficult episode")
          ]),
          explFr: "Ces notions forment la logique de l'intervention : on épuise les mesures de remplacement avant d'envisager une mesure de contrôle, qui demeure exceptionnelle, minimale, encadrée et toujours suivie d'un retour.",
          explEn: "These concepts form the logic of intervention: exhaust alternative measures before considering a control measure, which remains exceptional, minimal, regulated and always followed by a debriefing."
        },
        {
          type: "tf",
          fr: "La contention et l'isolement sont des mesures exceptionnelles, de dernier recours, encadrées par la loi et par les politiques de l'établissement.",
          en: "Restraint and seclusion are exceptional, last-resort measures, governed by law and by the facility's policies.",
          isTrue: true,
          explFr: "Vrai. Elles ne peuvent être utilisées que pour empêcher une personne de s'infliger ou d'infliger à autrui des lésions, de façon minimale et temporaire, avec une surveillance et une documentation rigoureuses.",
          explEn: "True. They may be used only to prevent a person from harming themselves or others, in a minimal and temporary way, with rigorous monitoring and documentation."
        },
        {
          ...scenario(
            "L'agitation d'un usager s'est apaisée après une intervention d'équipe. Quelle suite est la plus appropriée ?",
            "A client's agitation has subsided after a team intervention. What follow-up is most appropriate?",
            [
              ch("Ne plus en reparler pour ne pas raviver la situation", "Never mention it again so as not to reignite the situation"),
              ch("Faire un retour avec la personne une fois calme, documenter les faits, les interventions et sa réaction, puis poursuivre la surveillance", "Debrief with the person once calm, document the facts, the interventions and their reaction, then continue monitoring", true),
              ch("Lui rappeler sa faute pour qu'il ne recommence pas", "Remind him of his wrongdoing so he doesn't do it again"),
              ch("Éviter d'en reparler avec la personne pour ne pas raviver la crise, et laisser l'équipe du prochain quart le découvrir en lisant le dossier", "Avoid discussing it with the person so as not to reignite the crisis, and let the next shift find out by reading the record")
            ]),
          explFr: "Le retour post-événement permet de comprendre les déclencheurs et de prévenir la récidive. La documentation et la transmission verbale à l'équipe suivante complètent l'intervention.",
          explEn: "The post-event debriefing helps identify triggers and prevent recurrence. Documentation and a verbal handover to the next team complete the intervention."
        },
        {
          fr: "Parmi ces actions, laquelle ne relève PAS de l'infirmière auxiliaire en santé mentale ?",
          en: "Which of these actions does NOT fall within the LPN's mental health scope?",
          choices: [
            ch("Observer et consigner le comportement et les propos de l'usager", "Observing and documenting the client's behaviour and statements"),
            ch("Poser un diagnostic et déterminer le plan de traitement", "Making a diagnosis and determining the treatment plan", true),
            ch("Administrer la médication prescrite et en surveiller les effets", "Administering prescribed medication and monitoring its effects"),
            ch("Contribuer à la surveillance clinique et transmettre ses observations", "Contributing to clinical monitoring and transmitting observations")
          ],
          explFr: "Le diagnostic et le plan de traitement appartiennent au médecin ; l'évaluation de la condition mentale et le plan thérapeutique infirmier, à l'infirmière. L'infirmière auxiliaire observe, administre, surveille, transmet et documente — un rôle essentiel, mais délimité.",
          explEn: "Diagnosis and the treatment plan belong to the physician; assessing the mental condition and the nursing care plan, to the registered nurse. The LPN observes, administers, monitors, reports and documents — an essential but defined role."
        },
        {
          ...scenario(
            "Devant l'usager, un collègue dit : « Lui, c'est un manipulateur, ne perds pas ton temps. » Que faites-vous ?",
            "In front of the client, a colleague says: \"That one's a manipulator, don't waste your time.\" What do you do?",
            [
              ch("Approuver pour éviter un conflit avec le collègue", "Agree, to avoid conflict with the colleague"),
              ch("Ne pas alimenter le commentaire, poursuivre votre approche respectueuse auprès de l'usager, puis revenir sur la situation en privé avec le collègue ou la personne responsable", "Do not feed the comment, continue your respectful approach with the client, then address the situation privately with the colleague or the person in charge", true),
              ch("Répliquer vivement au collègue devant l'usager", "Argue back sharply in front of the client"),
              ch("Contredire vivement le collègue devant l'usager pour que celui-ci constate que vous prenez sa défense, puis inscrire le commentaire du collègue tel quel au dossier", "Sharply contradict the colleague in front of the client so he sees you're on his side, then record the colleague's comment word for word in the chart")
            ]),
          explFr: "Les propos stigmatisants devant la personne ont un effet direct sur elle et sur le climat de soins. On protège d'abord l'usager, puis on aborde la question avec le collègue à l'écart, ou on la signale si elle se répète.",
          explEn: "Stigmatizing remarks in front of the person directly affect them and the care climate. Protect the client first, then address the issue with the colleague away from them, or report it if it recurs."
        },
        {
          fr: "Que doit contenir la note au dossier après un épisode d'agitation ?",
          en: "What must the chart entry contain after an agitation episode?",
          choices: [
            ch("L'opinion de l'intervenant sur la personnalité de l'usager", "The caregiver's opinion of the client's personality"),
            ch("L'heure, les faits observés, les propos significatifs, les interventions faites et la réaction de l'usager", "The time, the observed facts, significant statements, the interventions carried out and the client's reaction", true),
            ch("Uniquement la mention « usager agité »", "Only the words \"client agitated\""),
            ch("Les commentaires des autres usagers présents, avec leur nom complet, et votre opinion sur ce qui a provoqué la crise", "The comments of other clients present, with their full names, and your opinion on what caused the crisis")
          ],
          explFr: "Une note utile est factuelle, datée, précise et centrée sur l'usager concerné. Elle sert à la continuité des soins et peut avoir une valeur légale.",
          explEn: "A useful note is factual, timed, precise and focused on the client concerned. It supports continuity of care and may have legal value."
        },
        {
          ...scenario(
            "Une usagère en détresse refuse de parler et se retire dans sa chambre. Quelle attitude est la plus aidante ?",
            "A distressed client refuses to talk and withdraws to her room. Which attitude is most helpful?",
            [
              ch("Insister pour qu'elle s'exprime immédiatement", "Insist that she talk right away"),
              ch("Respecter son besoin d'espace, lui offrir votre disponibilité, assurer une présence discrète et maintenir la surveillance convenue", "Respect her need for space, offer your availability, keep a discreet presence and maintain the agreed monitoring", true),
              ch("La laisser seule sans surveillance jusqu'au lendemain", "Leave her alone without monitoring until the next day"),
              ch("Fermer sa porte pour lui laisser de l'intimité, suspendre la surveillance jusqu'au lendemain et inscrire au dossier qu'elle refuse les soins", "Close her door to give her privacy, suspend monitoring until the next day and record that she refuses care")
            ]),
          explFr: "Respecter le silence n'est pas abandonner : on nomme sa disponibilité (« je repasse dans 20 minutes »), on maintient la surveillance prévue et on transmet l'observation à l'équipe.",
          explEn: "Respecting silence is not abandonment: state your availability (\"I'll come back in 20 minutes\"), maintain the planned monitoring and pass the observation on to the team."
        },
        {
          fr: "Après un événement difficile (agression verbale, crise, décès), quelle conduite est la plus saine pour l'intervenant ?",
          en: "After a difficult event (verbal aggression, crisis, death), what is the healthiest course of action for the caregiver?",
          choices: [
            ch("Tout garder pour soi afin de rester professionnel", "Keep everything to yourself in order to stay professional"),
            ch("Utiliser les moyens prévus : retour d'équipe, soutien du supérieur, programme d'aide aux employés", "Use the available supports: team debriefing, supervisor support, employee assistance program", true),
            ch("Demander un transfert d'unité immédiatement afin de ne plus jamais avoir à revivre une situation semblable", "Request an immediate unit transfer so you never have to go through a similar situation again"),
            ch("Éviter tout contact avec l'usager par la suite", "Avoid all contact with the client afterwards")
          ],
          explFr: "Prendre soin de soi fait partie du travail en santé mentale. Nommer ce qu'on a vécu et utiliser les ressources prévues prévient l'épuisement et protège la qualité de la relation avec les usagers.",
          explEn: "Taking care of yourself is part of mental health work. Naming what you experienced and using the available resources prevents burnout and protects the quality of the relationship with clients."
        }
      ]
    }
  ]
},

/* ==================================================================
   COMPÉTENCES 2 à 8 — Grands troubles en santé mentale (ajout nov. 2026)
   Demande de Corinne (enseignante SASI) : « schizophrénie, psychose,
   trouble de personnalité… ».
   ⚠️⚠️ PREMIER JET — À VALIDER par une enseignante / infirmière avant
   usage en classe (vocabulaire CÉMEQ, protocoles de l'établissement).
   ⚠️ ids préfixés « sm_ » : « sante_mentale » appartient déjà à SASI
   dans le MODULE_INFO du tableau de bord enseignant.
   ================================================================== */

/* ---------- 2. Schizophrénie ---------- */
{
  id: "sm_schizophrenie", order: 2,
  title_fr: "Schizophrénie",
  title_en: "Schizophrenia",
  icon: "🧩",
  tiers: [
    {
      level: 1,
      theme_fr: "Comprendre la schizophrénie : symptômes positifs et négatifs",
      theme_en: "Understanding schizophrenia: positive and negative symptoms",
      questions: [
        {
          fr: "Parmi ces manifestations, laquelle est un symptôme POSITIF de la schizophrénie ?",
          en: "Which of these is a POSITIVE symptom of schizophrenia?",
          choices: [
            ch("Un discours désorganisé, difficile à suivre", "Disorganized speech that is hard to follow", true),
            ch("L'émoussement affectif", "Blunted affect"),
            ch("Le manque de motivation à entreprendre des activités (avolition)", "Lack of motivation to start activities (avolition)"),
            ch("La pauvreté du discours (alogie)", "Poverty of speech (alogia)")
          ],
          explFr: "Les symptômes positifs s'AJOUTENT au fonctionnement habituel : hallucinations, idées délirantes, discours et comportement désorganisés. Les trois autres choix sont des symptômes négatifs.",
          explEn: "Positive symptoms are ADDED to usual functioning: hallucinations, delusions, disorganized speech and behaviour. The other three choices are negative symptoms."
        },
        {
          ...tf("La schizophrénie signifie que la personne a une « double personnalité ».",
                "Schizophrenia means the person has a “split personality”.", false),
          explFr: "Faux. C'est un mythe tenace. La schizophrénie touche la perception de la réalité, la pensée et la motivation ; le « dédoublement » relève d'un tout autre trouble (trouble dissociatif de l'identité).",
          explEn: "False. This is a persistent myth. Schizophrenia affects perception of reality, thinking and motivation; “split personality” refers to a completely different disorder (dissociative identity disorder)."
        },
        {
          fr: "À quel moment de la vie la schizophrénie apparaît-elle le plus souvent ?",
          en: "At what stage of life does schizophrenia most often appear?",
          choices: [
            ch("Dans la petite enfance", "In early childhood"),
            ch("À la fin de l'adolescence ou au début de l'âge adulte", "In late adolescence or early adulthood", true),
            ch("Surtout après 65 ans, en lien avec le vieillissement du cerveau", "Mostly after age 65, linked to brain aging"),
            ch("Surtout après 40 ans, à la suite d'un stress professionnel important", "Mostly after age 40, following major work stress")
          ],
          explFr: "Le premier épisode survient le plus souvent entre la fin de l'adolescence et le milieu de la vingtaine, un peu plus tôt chez les hommes que chez les femmes.",
          explEn: "The first episode most often occurs between late adolescence and the mid-twenties, slightly earlier in men than in women."
        },
        {
          ...match("Associe chaque symptôme ou notion de la schizophrénie à sa description.", "Match each schizophrenia symptom or concept with its description.", [
            pair("Avolition", "Avolition", "Manque de motivation à entreprendre et à poursuivre des activités", "Lack of motivation to start and sustain activities"),
            pair("Alogie", "Alogia", "Pauvreté du discours, réponses brèves et peu élaborées", "Poverty of speech, brief and sparse answers"),
            pair("Émoussement affectif", "Blunted affect", "Expression réduite des émotions (visage, voix, gestes)", "Reduced expression of emotion (face, voice, gestures)"),
            pair("Pensée désorganisée", "Disorganized thinking", "Propos décousus, passage d'une idée à l'autre sans lien logique", "Disjointed speech, jumping between ideas with no logical link"),
            pair("Anosognosie", "Anosognosia", "Difficulté à reconnaître sa propre maladie", "Difficulty recognizing one's own illness")
          ]),
          explFr: "Les symptômes négatifs (avolition, alogie, émoussement) sont souvent moins visibles que les hallucinations, mais ils nuisent beaucoup au fonctionnement quotidien.",
          explEn: "Negative symptoms (avolition, alogia, blunting) are often less visible than hallucinations, but they greatly affect daily functioning."
        },
        {
          ...tf("Les personnes vivant avec la schizophrénie sont plus souvent victimes de violence qu'auteures de violence.",
                "People living with schizophrenia are more often victims of violence than perpetrators.", true),
          explFr: "Vrai. L'image de la personne « dangereuse » est un préjugé qui alimente la stigmatisation. Ces personnes sont surtout vulnérables à l'exploitation et à la victimisation.",
          explEn: "True. The image of the “dangerous” person is a prejudice that feeds stigma. These people are mainly vulnerable to exploitation and victimization."
        },
        {
          fr: "Quel énoncé décrit le mieux l'origine de la schizophrénie selon les connaissances actuelles ?",
          en: "Which statement best describes the origin of schizophrenia according to current knowledge?",
          choices: [
            ch("Elle est causée par une éducation parentale déficiente", "It is caused by poor parenting"),
            ch("Elle résulte d'un manque de volonté", "It results from a lack of willpower"),
            ch("Elle résulte d'une vulnérabilité biologique combinée à des facteurs de stress", "It results from biological vulnerability combined with stress factors", true),
            ch("Elle est toujours causée par une consommation importante de drogues à l'adolescence", "It is always caused by heavy drug use in adolescence")
          ],
          explFr: "C'est le modèle vulnérabilité-stress : une prédisposition (génétique, développement du cerveau) rencontre des facteurs déclencheurs. Ni les parents ni la personne n'en sont « coupables ».",
          explEn: "This is the stress-vulnerability model: a predisposition (genetics, brain development) meets triggering factors. Neither the parents nor the person are “to blame”."
        }
      ]
    },
    {
      level: 2,
      theme_fr: "Évolution, signes de rechute et approche au quotidien",
      theme_en: "Course of illness, signs of relapse and day-to-day approach",
      questions: [
        {
          fr: "Avant un premier épisode, une phase dite « prodromique » peut s'installer. Qu'observe-t-on typiquement ?",
          en: "Before a first episode, a so-called “prodromal” phase may set in. What is typically observed?",
          choices: [
            ch("Une amélioration soudaine de l'humeur, de l'énergie et des résultats scolaires ou professionnels", "A sudden improvement in mood, energy and school or work performance"),
            ch("Un retrait progressif, une baisse du fonctionnement et une méfiance inhabituelle", "Gradual withdrawal, declining functioning and unusual suspicion", true),
            ch("Une forte fièvre durant quelques jours", "A high fever lasting a few days"),
            ch("Une perte de mémoire des événements anciens", "Loss of memory of past events")
          ],
          explFr: "La phase prodromique s'installe souvent sur des mois. La reconnaître permet d'orienter plus tôt vers de l'aide, ce qui améliore le pronostic.",
          explEn: "The prodromal phase often develops over months. Recognizing it allows earlier referral for help, which improves the outlook."
        },
        {
          fr: "Lequel de ces changements peut annoncer une rechute chez une personne stabilisée ?",
          en: "Which of these changes may signal a relapse in a stabilized person?",
          choices: [
            ch("Elle participe davantage aux activités de l'unité et aux sorties de groupe", "She takes part more in unit activities and group outings"),
            ch("Elle demande de l'aide pour gérer son budget et ses rendez-vous de la semaine", "She asks for help managing her budget and her appointments for the week"),
            ch("Des troubles du sommeil, un isolement accru et l'arrêt de sa médication", "Sleep problems, increased isolation and stopping her medication", true),
            ch("Elle prend elle-même son rendez-vous de suivi", "She books her own follow-up appointment")
          ],
          explFr: "Insomnie, retrait, méfiance croissante et arrêt de la médication sont des signes précurseurs classiques. On les observe et on les rapporte rapidement à l'infirmière.",
          explEn: "Insomnia, withdrawal, growing suspicion and stopping medication are classic warning signs. Observe them and report them promptly to the nurse."
        },
        {
          ...scenario(
            "Un usager vivant avec la schizophrénie reste au lit tout l'avant-midi et refuse les activités. Un collègue le juge « paresseux ». Quelle approche est la plus appropriée ?",
            "A client living with schizophrenia stays in bed all morning and refuses activities. A colleague calls him “lazy”. Which approach is most appropriate?",
            [
              ch("Le laisser au lit : il n'y a rien à faire", "Leave him in bed: nothing can be done"),
              ch("Lui retirer un privilège pour le motiver", "Remove a privilege to motivate him"),
              ch("Y voir un possible symptôme négatif, proposer une petite activité structurée et souligner l'effort", "See a possible negative symptom, offer a small structured activity and acknowledge the effort", true),
              ch("Insister fermement jusqu'à ce qu'il participe à toutes les activités prévues à l'horaire de la journée", "Insist firmly until he takes part in every activity on the day's schedule")
            ]),
          explFr: "Le manque d'élan fait partie de la maladie (avolition), ce n'est pas de la paresse. De petits objectifs concrets et une routine prévisible favorisent la reprise d'activités.",
          explEn: "Lack of drive is part of the illness (avolition), not laziness. Small concrete goals and a predictable routine help the person resume activities."
        },
        {
          ...tf("La consommation de cannabis peut augmenter le risque de psychose et de rechute chez une personne vulnérable.",
                "Cannabis use can increase the risk of psychosis and relapse in a vulnerable person.", true),
          explFr: "Vrai. Le cannabis, surtout à forte teneur en THC et consommé tôt et souvent, est associé à un risque accru de psychose et de rechute.",
          explEn: "True. Cannabis — especially high-THC, used early and often — is associated with an increased risk of psychosis and relapse."
        },
        {
          ...scenario(
            "Une usagère dont la pensée est désorganisée doit faire sa toilette. Comment lui donner les consignes ?",
            "A client with disorganized thinking needs to wash up. How should you give her instructions?",
            [
              ch("Lui expliquer toute la routine d'un seul coup, en détail, pour qu'elle ait une vue d'ensemble", "Explain the whole routine at once, in detail, so she has an overview"),
              ch("Une consigne simple à la fois, en phrases courtes, en lui laissant le temps de répondre", "One simple instruction at a time, in short sentences, allowing time to respond", true),
              ch("Faire la toilette à sa place sans rien dire", "Do the washing for her without saying anything"),
              ch("Lui remettre une liste écrite détaillée et la laisser seule", "Hand her a detailed written list and leave her alone")
            ]),
          explFr: "Une consigne à la fois réduit la confusion et préserve l'autonomie de la personne. On l'accompagne au besoin plutôt que de faire à sa place.",
          explEn: "One instruction at a time reduces confusion and preserves the person's autonomy. Support as needed rather than doing it for her."
        },
        {
          fr: "Pourquoi l'espérance de vie des personnes vivant avec la schizophrénie est-elle réduite en moyenne ?",
          en: "Why is the life expectancy of people living with schizophrenia reduced on average?",
          choices: [
            ch("Parce que la maladie détruit directement le cœur", "Because the illness directly destroys the heart"),
            ch("Ce n'est pas le cas : une fois traitée, leur espérance de vie est identique à celle de la population", "It isn't: once treated, their life expectancy is the same as the general population's"),
            ch("Surtout à cause de maladies physiques moins bien dépistées (cœur, diabète, tabac) et du suicide", "Mainly because of less well-screened physical illnesses (heart, diabetes, smoking) and suicide", true),
            ch("Parce que ces personnes refusent toujours les soins", "Because these people always refuse care")
          ],
          explFr: "La santé physique est souvent négligée chez ces personnes. Observer et rapporter les plaintes physiques fait partie d'une approche globale.",
          explEn: "Physical health is often neglected in these people. Observing and reporting physical complaints is part of a holistic approach."
        }
      ]
    },
    {
      level: 3,
      theme_fr: "Stigmatisation, rétablissement et jugement clinique",
      theme_en: "Stigma, recovery and clinical judgment",
      questions: [
        {
          ...scenario(
            "Un usager vous dit qu'il aimerait retourner aux études, mais sa sœur affirme qu'« avec sa maladie, c'est impossible ». Quelle attitude reflète l'approche axée sur le rétablissement ?",
            "A client tells you he would like to go back to school, but his sister says “with his illness, it's impossible”. Which attitude reflects a recovery-oriented approach?",
            [
              ch("Donner raison à la sœur : mieux vaut attendre une rémission complète pour éviter un échec", "Side with the sister: better to wait for full remission to avoid failure"),
              ch("Soutenir son projet, l'aider à cibler des étapes réalistes et l'orienter vers l'équipe et les ressources", "Support his plan, help him set realistic steps and refer him to the team and resources", true),
              ch("Lui dire que ce n'est pas votre rôle d'en parler", "Tell him it's not your role to discuss it"),
              ch("Lui promettre qu'il réussira sans difficulté", "Promise him he will succeed with no difficulty")
            ]),
          explFr: "Le rétablissement mise sur l'espoir et les projets de la personne. On soutient sans fausse promesse, avec des étapes réalistes et l'appui de l'équipe.",
          explEn: "Recovery builds on hope and the person's own goals. Support without false promises, with realistic steps and the team's help."
        },
        {
          ...tf("Le rétablissement en santé mentale signifie nécessairement la disparition complète de tous les symptômes.",
                "Recovery in mental health necessarily means the complete disappearance of all symptoms.", false),
          explFr: "Faux. Le rétablissement, c'est mener une vie satisfaisante et significative, même si certains symptômes persistent. Il est propre à chaque personne.",
          explEn: "False. Recovery means living a satisfying and meaningful life, even if some symptoms persist. It is unique to each person."
        },
        {
          ...scenario(
            "Un usager vous dit : « Je ne suis pas malade, je n'ai pas besoin de pilules. » Quelle approche est la plus aidante ?",
            "A client tells you: “I'm not sick, I don't need pills.” Which approach is most helpful?",
            [
              ch("Lui démontrer calmement qu'il est malade en lui relisant son diagnostic et ses hospitalisations passées", "Calmly show him he is ill by reading back his diagnosis and past hospitalizations"),
              ch("Ne pas débattre du diagnostic, explorer ce qui compte pour lui et rapporter fidèlement ses propos à l'infirmière", "Don't debate the diagnosis, explore what matters to him and report his words accurately to the nurse", true),
              ch("Lui dire qu'il sera attaché s'il refuse ses médicaments", "Tell him he will be restrained if he refuses his medication"),
              ch("Ne rien dire et ne rien noter", "Say nothing and note nothing")
            ]),
          explFr: "Ce manque de conscience de la maladie (anosognosie) fait souvent partie du trouble. Argumenter braque la personne ; s'appuyer sur ses propres objectifs maintient le lien.",
          explEn: "This lack of illness awareness (anosognosia) is often part of the disorder. Arguing puts the person on the defensive; building on their own goals keeps the connection."
        },
        {
          fr: "Quel effet la stigmatisation a-t-elle le plus souvent sur la personne vivant avec la schizophrénie ?",
          en: "What effect does stigma most often have on a person living with schizophrenia?",
          choices: [
            ch("Elle la motive à guérir plus vite", "It motivates the person to get better faster"),
            ch("Elle n'a plus d'effet une fois la personne hospitalisée, car l'équipe la protège du jugement", "It has no more effect once the person is hospitalized, because the team shields them from judgment"),
            ch("Elle retarde la demande d'aide et nuit à l'adhésion au traitement, par honte", "It delays seeking help and undermines treatment adherence, out of shame", true),
            ch("Elle touche seulement la famille, car la personne a rarement conscience des préjugés", "It only affects the family, since the person is rarely aware of prejudice")
          ],
          explFr: "La personne peut finir par intérioriser les préjugés (autostigmatisation). Un accueil respectueux et sans jugement est déjà une intervention.",
          explEn: "The person may end up internalizing the prejudice (self-stigma). A respectful, non-judgmental welcome is already an intervention."
        },
        {
          ...scenario(
            "Un usager vivant avec la schizophrénie, habituellement calme, devient méfiant, ne dort plus et dit que le personnel complote contre lui. Il a manqué son injection la semaine dernière. Que faites-vous ?",
            "A client living with schizophrenia, usually calm, becomes suspicious, stops sleeping and says the staff are plotting against him. He missed his injection last week. What do you do?",
            [
              ch("Attendre la prochaine injection prévue, puisque la méfiance et l'insomnie se replaceront d'elles-mêmes", "Wait for the next scheduled injection, since the suspicion and insomnia will settle on their own"),
              ch("Lui dire que personne ne complote et changer de sujet", "Tell him nobody is plotting and change the subject"),
              ch("Rapporter rapidement ces signes de rechute et l'injection manquée à l'infirmière, en restant calme et rassurant", "Promptly report these signs of relapse and the missed injection to the nurse, staying calm and reassuring", true),
              ch("Le confronter devant les autres usagers pour le ramener à la réalité", "Confront him in front of other clients to bring him back to reality")
            ]),
          explFr: "Changement de comportement + traitement manqué = information à transmettre sans délai. Une intervention rapide peut éviter une rechute plus grave.",
          explEn: "A change in behaviour plus a missed treatment = information to pass on without delay. Early intervention can prevent a more serious relapse."
        },
        {
          fr: "Chez une personne vivant avec la schizophrénie, quelle observation liée à la sécurité doit être rapportée en priorité ?",
          en: "In a person living with schizophrenia, which safety-related observation must be reported first?",
          choices: [
            ch("Son manque d'intérêt pour la télévision et les jeux de société", "Their lack of interest in TV and board games"),
            ch("Des propos de désespoir ou des idées de mort", "Statements of hopelessness or thoughts of death", true),
            ch("Sa préférence marquée pour certains repas ou collations", "Their strong preference for certain meals or snacks"),
            ch("Le fait qu'elle se couche tôt", "The fact that they go to bed early")
          ],
          explFr: "Le risque suicidaire est plus élevé chez les personnes vivant avec la schizophrénie, notamment après un épisode ou lors d'une prise de conscience douloureuse de la maladie.",
          explEn: "Suicide risk is higher in people living with schizophrenia, especially after an episode or during a painful realization of the illness."
        }
      ]
    }
  ]
},

/* ---------- 3. Épisode psychotique ---------- */
{
  id: "sm_psychose", order: 3,
  title_fr: "Épisode psychotique",
  title_en: "Psychotic Episode",
  icon: "🌀",
  tiers: [
    {
      level: 1,
      theme_fr: "Reconnaître les hallucinations et les idées délirantes",
      theme_en: "Recognizing hallucinations and delusions",
      questions: [
        {
          ...match("Associe chaque manifestation psychotique à sa description.", "Match each psychotic manifestation with its description.", [
            pair("Hallucination auditive", "Auditory hallucination", "Entendre des voix ou des sons sans aucune source réelle", "Hearing voices or sounds with no real source"),
            pair("Hallucination tactile", "Tactile hallucination", "Ressentir des sensations sur la peau sans stimulus réel", "Feeling sensations on the skin with no real stimulus"),
            pair("Illusion", "Illusion", "Mal interpréter un stimulus réel (ex. : prendre un manteau suspendu pour une personne)", "Misinterpreting a real stimulus (e.g. mistaking a hanging coat for a person)"),
            pair("Délire de persécution", "Persecutory delusion", "Conviction d'être surveillé, menacé ou visé par un complot", "Conviction of being watched, threatened or targeted by a plot"),
            pair("Délire de grandeur", "Grandiose delusion", "Conviction d'avoir des pouvoirs, une identité ou une mission exceptionnels", "Conviction of having exceptional powers, identity or mission"),
            pair("Idée de référence", "Idea of reference", "Croire que des événements anodins (télé, conversations) s'adressent à soi", "Believing that ordinary events (TV, conversations) are aimed at oneself")
          ]),
          explFr: "Bien nommer ce qu'on observe permet une transmission précise à l'équipe. L'illusion part d'un stimulus réel ; l'hallucination, non.",
          explEn: "Naming what you observe accurately allows precise reporting to the team. An illusion starts from a real stimulus; a hallucination does not."
        },
        {
          fr: "Quel type d'hallucination est le plus fréquent dans les troubles psychotiques comme la schizophrénie ?",
          en: "Which type of hallucination is most common in psychotic disorders such as schizophrenia?",
          choices: [
            ch("Visuelle", "Visual"),
            ch("Auditive", "Auditory", true),
            ch("Olfactive", "Olfactory"),
            ch("Gustative", "Gustatory")
          ],
          explFr: "Les voix sont les hallucinations les plus fréquentes dans les troubles psychotiques. Des hallucinations surtout visuelles doivent faire penser à une cause médicale ou à des substances.",
          explEn: "Voices are the most common hallucinations in psychotic disorders. Mainly visual hallucinations should raise suspicion of a medical cause or substances."
        },
        {
          ...tf("Une idée délirante peut facilement être corrigée si on présente à la personne des preuves logiques.",
                "A delusion can easily be corrected by presenting the person with logical evidence.", false),
          explFr: "Faux. Une idée délirante est une conviction inébranlable, malgré les preuves contraires. Argumenter est inefficace et peut briser le lien de confiance.",
          explEn: "False. A delusion is an unshakable conviction, despite evidence to the contrary. Arguing is ineffective and can break the trusting relationship."
        },
        {
          fr: "Une personne regarde souvent vers un coin vide de la pièce, chuchote et semble répondre à quelqu'un. Ces comportements suggèrent :",
          en: "A person often looks toward an empty corner of the room, whispers and seems to answer someone. These behaviours suggest:",
          choices: [
            ch("Qu'elle fait un exercice de méditation ou de relaxation guidée", "That she is doing a meditation or guided relaxation exercise"),
            ch("Qu'elle a une perte d'audition", "That she has hearing loss"),
            ch("Qu'elle pourrait vivre des hallucinations auditives", "That she may be experiencing auditory hallucinations", true),
            ch("Qu'elle cherche à attirer l'attention du personnel de l'unité", "That she is trying to get the unit staff's attention")
          ],
          explFr: "Ces signes indirects sont à observer et à rapporter : heure, durée, comportement et propos. La personne ne parle pas toujours spontanément de ses voix.",
          explEn: "These indirect signs should be observed and reported: time, duration, behaviour and words. The person does not always mention their voices spontaneously."
        },
        {
          fr: "Lequel de ces énoncés sur les causes possibles d'un épisode psychotique est juste ?",
          en: "Which statement about the possible causes of a psychotic episode is correct?",
          choices: [
            ch("Il est toujours le signe d'une schizophrénie, même s'il survient après une consommation de drogue", "It is always a sign of schizophrenia, even when it follows recent drug use"),
            ch("Il est toujours causé par la drogue", "It is always caused by drugs"),
            ch("Il peut être lié à un trouble mental, à des substances ou à une cause médicale", "It can be linked to a mental disorder, substances or a medical cause", true),
            ch("Il ne survient jamais chez une personne âgée", "It never occurs in an older person")
          ],
          explFr: "La psychose est un état, pas un diagnostic en soi. Trouble bipolaire, dépression sévère, substances, sevrage ou maladie physique peuvent en être la cause.",
          explEn: "Psychosis is a state, not a diagnosis in itself. Bipolar disorder, severe depression, substances, withdrawal or physical illness can cause it."
        },
        {
          ...tf("Une psychose peut survenir pour la première fois chez un jeune adulte, et une intervention précoce améliore le pronostic.",
                "Psychosis can occur for the first time in a young adult, and early intervention improves the outlook.", true),
          explFr: "Vrai. Au Québec, des programmes spécialisés pour les premiers épisodes psychotiques existent. Plus l'aide arrive tôt, meilleures sont les chances de rétablissement.",
          explEn: "True. In Quebec, specialized first-episode psychosis programs exist. The earlier help arrives, the better the chances of recovery."
        }
      ]
    },
    {
      level: 2,
      theme_fr: "Approche : ne pas confronter, ne pas entrer dans le délire",
      theme_en: "Approach: don't confront, don't play along with the delusion",
      questions: [
        {
          ...scenario(
            "Un usager affirme calmement qu'il est le propriétaire de l'hôpital et qu'il va congédier tout le monde. Quelle réponse est la plus appropriée ?",
            "A client calmly states that he owns the hospital and is going to fire everyone. Which response is most appropriate?",
            [
              ch("« Bien sûr, monsieur le propriétaire ! »", "“Of course, Mr. Owner!”"),
              ch("« C'est faux : vous êtes un patient ici, pas le propriétaire, et personne ne sera congédié. »", "“That's false: you're a patient here, not the owner, and nobody is getting fired.”"),
              ch("« Je vois que c'est très important pour vous. Moi, je suis ici pour vous aider avec votre dîner. »", "“I can see this really matters to you. I'm here to help you with your lunch.”", true),
              ch("Rire pour détendre l'atmosphère", "Laugh to lighten the mood")
            ]),
          explFr: "On ne confirme pas le délire et on ne le confronte pas : on reconnaît ce que la personne vit et on la ramène doucement à la réalité concrète du moment.",
          explEn: "Neither confirm nor confront the delusion: acknowledge what the person is experiencing and gently bring them back to the concrete reality of the moment."
        },
        {
          ...tf("Pour gagner la confiance d'une personne qui délire, il est recommandé de faire semblant de croire à ses idées.",
                "To gain the trust of a delusional person, it is recommended to pretend to believe their ideas.", false),
          explFr: "Faux. Entrer dans le délire le renforce et nuit à la confiance quand la personne s'en rend compte. On reste honnête, sans argumenter.",
          explEn: "False. Playing along reinforces the delusion and undermines trust when the person realizes it. Stay honest, without arguing."
        },
        {
          ...scenario(
            "Une usagère refuse de manger, convaincue que sa nourriture est empoisonnée. Quelle intervention est appropriée ?",
            "A client refuses to eat, convinced her food is poisoned. Which intervention is appropriate?",
            [
              ch("Goûter son repas devant elle pour lui prouver qu'il est sans danger, puis insister pour qu'elle mange", "Taste her meal in front of her to prove it's safe, then insist she eat"),
              ch("Ne pas argumenter, lui offrir des aliments scellés qu'elle ouvre elle-même, noter ses apports", "Don't argue, offer sealed foods she opens herself, record her intake", true),
              ch("La laisser sans manger jusqu'à ce qu'elle change d'idée", "Let her go without eating until she changes her mind"),
              ch("Lui dire que son idée est ridicule", "Tell her that her idea is ridiculous")
            ]),
          explFr: "On respecte sa peur sans la confirmer et on protège son alimentation. La surveillance des apports et de l'hydratation est rapportée à l'infirmière.",
          explEn: "Respect her fear without confirming it and protect her nutrition. Monitoring of intake and hydration is reported to the nurse."
        },
        {
          fr: "Quel comportement de l'intervenant peut aggraver la méfiance d'une personne en psychose ?",
          en: "Which caregiver behaviour can increase the suspicion of a person in psychosis?",
          choices: [
            ch("Se présenter et expliquer ce qu'on vient faire avant de s'approcher", "Introducing yourself and explaining what you're there to do before approaching"),
            ch("Garder une distance respectueuse", "Keeping a respectful distance"),
            ch("Chuchoter ou rire avec un collègue à proximité de la personne", "Whispering or laughing with a colleague near the person", true),
            ch("Parler d'une voix calme et claire, en phrases simples et courtes", "Speaking in a calm, clear voice, in short, simple sentences")
          ],
          explFr: "Une personne méfiante peut croire qu'on parle d'elle ou qu'on se moque d'elle. La transparence et la prévisibilité diminuent la peur.",
          explEn: "A suspicious person may think they are being talked about or mocked. Transparency and predictability reduce fear."
        },
        {
          fr: "Quand une personne semble absorbée par ses hallucinations, quelle activité est généralement la plus aidante ?",
          en: "When a person seems absorbed by hallucinations, which activity is generally most helpful?",
          choices: [
            ch("La laisser se reposer seule dans une pièce sombre et silencieuse, sans aucune stimulation", "Let her rest alone in a dark, silent room, without any stimulation"),
            ch("Un débat sur l'existence réelle des voix", "A debate on whether the voices are real"),
            ch("Une activité simple et concrète, ancrée dans le moment présent (ex. : marcher, plier du linge)", "A simple, concrete activity anchored in the present moment (e.g. walking, folding laundry)", true),
            ch("Un film à suspense pour la distraire", "A suspense movie to distract her")
          ],
          explFr: "Les activités concrètes et la présence d'une personne rassurante aident à se reconnecter à la réalité. L'isolement et la surstimulation peuvent amplifier les symptômes.",
          explEn: "Concrete activities and a reassuring presence help reconnect with reality. Isolation and overstimulation can amplify symptoms."
        },
        {
          ...scenario(
            "Un usager vous accuse soudainement de travailler pour la police et de l'espionner. Que faites-vous ?",
            "A client suddenly accuses you of working for the police and spying on him. What do you do?",
            [
              ch("Lui montrer votre carte d'employé et vous défendre longuement pour prouver votre bonne foi", "Show him your staff ID and defend yourself at length to prove your good faith"),
              ch("Rester calme, ne pas argumenter, garder une distance sécuritaire et aviser rapidement l'infirmière", "Stay calm, don't argue, keep a safe distance and promptly notify the nurse", true),
              ch("Lui dire qu'il a raison pour le calmer", "Tell him he's right to calm him down"),
              ch("Le menacer de le signaler s'il continue", "Threaten to report him if he continues")
            ]),
          explFr: "Être perçu comme une menace peut exposer l'intervenant. On reste calme et bref, on protège la distance et on transmet l'information pour adapter le plan.",
          explEn: "Being seen as a threat can put the caregiver at risk. Stay calm and brief, keep your distance and pass on the information so the plan can be adjusted."
        }
      ]
    },
    {
      level: 3,
      theme_fr: "Sécurité, signalement et situations à risque",
      theme_en: "Safety, reporting and high-risk situations",
      questions: [
        {
          ...scenario(
            "Un usager vous confie que les voix lui ordonnent de « punir » son voisin de chambre. Quelle est la conduite à tenir ?",
            "A client tells you the voices are ordering him to “punish” his roommate. What should you do?",
            [
              ch("Lui dire de ne pas écouter les voix, noter ses propos et en parler au prochain rapport de quart", "Tell him not to listen to the voices, note what he said and mention it at the next shift report"),
              ch("Traiter la situation comme à risque : assurer la sécurité des personnes et aviser immédiatement l'infirmière", "Treat it as high-risk: ensure everyone's safety and notify the nurse immediately", true),
              ch("Lui proposer une activité pour le distraire et poursuivre votre tournée", "Offer him an activity to distract him and continue your rounds"),
              ch("Avertir le voisin de chambre de se méfier", "Warn the roommate to be careful")
            ]),
          explFr: "Des voix qui donnent des ordres de nuire (hallucinations impératives) représentent un risque réel pour la personne ou autrui. L'information se transmet sans attendre.",
          explEn: "Voices ordering harm (command hallucinations) pose a real risk to the person or others. The information must be passed on without waiting."
        },
        {
          fr: "Comment appelle-t-on les hallucinations qui donnent des ordres à la personne ?",
          en: "What are hallucinations that give orders to the person called?",
          choices: [
            ch("Des hallucinations hypnagogiques", "Hypnagogic hallucinations"),
            ch("Des hallucinations impératives", "Command hallucinations", true),
            ch("Des illusions", "Illusions"),
            ch("Des idées de référence", "Ideas of reference")
          ],
          explFr: "Les hallucinations impératives commandent des actions, parfois dangereuses. Leur présence et leur contenu sont toujours rapportés à l'infirmière.",
          explEn: "Command hallucinations order actions, sometimes dangerous ones. Their presence and content are always reported to the nurse."
        },
        {
          fr: "Une personne âgée hospitalisée pour une infection devient brusquement confuse et désorientée, voit des insectes sur les murs, et son état varie d'heure en heure. Que suggère ce tableau ?",
          en: "An older person hospitalized for an infection suddenly becomes confused and disoriented, sees insects on the walls, and their condition fluctuates hour by hour. What does this suggest?",
          choices: [
            ch("Une schizophrénie qui débute tardivement, à surveiller pendant quelques semaines", "Late-onset schizophrenia, to be monitored for a few weeks"),
            ch("Un délirium (confusion aiguë), une urgence médicale à rapporter sans délai", "Delirium (acute confusion), a medical emergency to report without delay", true),
            ch("Un trouble de la personnalité", "A personality disorder"),
            ch("Un comportement normal lié à l'âge et au dépaysement causé par l'hospitalisation", "Normal behaviour linked to age and the disorientation of being in hospital")
          ],
          explFr: "Début soudain, fluctuation, désorientation et hallucinations visuelles évoquent un délirium, causé par un problème physique. Il ne faut pas le confondre avec un trouble psychotique.",
          explEn: "Sudden onset, fluctuation, disorientation and visual hallucinations suggest delirium, caused by a physical problem. It must not be confused with a psychotic disorder."
        },
        {
          ...tf("Lorsqu'une personne en psychose révèle le contenu de ses voix, l'intervenant doit le noter et le transmettre, surtout s'il touche à la sécurité.",
                "When a person in psychosis reveals what their voices say, the caregiver must document and report it, especially if it concerns safety.", true),
          explFr: "Vrai. Le contenu des voix (menaces, ordres, idées de mort) guide l'évaluation de l'infirmière et les mesures de sécurité. On le rapporte avec les mots de la personne.",
          explEn: "True. What the voices say (threats, orders, thoughts of death) guides the nurse's assessment and safety measures. Report it in the person's own words."
        },
        {
          ...scenario(
            "Une usagère en psychose se dirige vers la sortie de l'unité pour « échapper à ses ennemis ». Que faites-vous ?",
            "A client in psychosis heads for the unit exit to “escape her enemies”. What do you do?",
            [
              ch("La retenir physiquement par le bras, seul(e), pour l'empêcher de franchir la porte de sortie de l'unité", "Hold her back by the arm on your own to stop her going through the unit exit"),
              ch("La laisser partir : c'est son choix", "Let her go: it's her choice"),
              ch("Rester calme, l'inviter à parler dans un endroit tranquille et aviser immédiatement l'infirmière selon les procédures", "Stay calm, invite her to talk in a quiet place and notify the nurse immediately according to procedures", true),
              ch("Lui dire que ses ennemis n'existent pas", "Tell her that her enemies don't exist")
            ]),
          explFr: "La peur est réelle pour elle. On tente d'apaiser sans confronter et on alerte l'équipe, qui décide de la conduite selon son statut et les procédures. On n'intervient jamais physiquement seul.",
          explEn: "The fear is real to her. Try to calm her without confronting and alert the team, who decide what to do based on her status and procedures. Never intervene physically alone."
        },
        {
          fr: "Pourquoi faut-il annoncer ses gestes avant de toucher une personne en épisode psychotique (ex. : prise de signes vitaux) ?",
          en: "Why should you announce your actions before touching a person in a psychotic episode (e.g. taking vital signs)?",
          choices: [
            ch("Parce que c'est une simple question de politesse", "Because it is simply a matter of politeness"),
            ch("Parce qu'un contact inattendu peut être perçu comme une menace et provoquer une réaction défensive", "Because unexpected contact may be perceived as a threat and provoke a defensive reaction", true),
            ch("Parce que la loi interdit tout contact physique sans consentement écrit dans une unité de psychiatrie", "Because the law forbids any physical contact without written consent on a psychiatric unit"),
            ch("Ce n'est pas nécessaire si la personne est calme", "It isn't necessary if the person is calm")
          ],
          explFr: "Expliquer avant d'agir rend la situation prévisible et respecte la personne. Cela réduit le risque qu'un soin banal soit interprété comme une agression.",
          explEn: "Explaining before acting makes the situation predictable and respects the person. It reduces the risk that routine care is interpreted as an attack."
        }
      ]
    }
  ]
},

/* ---------- 4. Troubles de la personnalité ---------- */
{
  id: "sm_personnalite", order: 4,
  title_fr: "Troubles de la personnalité",
  title_en: "Personality Disorders",
  icon: "🎭",
  tiers: [
    {
      level: 1,
      theme_fr: "Notions de base et trouble de la personnalité limite",
      theme_en: "Basic concepts and borderline personality disorder",
      questions: [
        {
          fr: "Qu'est-ce qu'un trouble de la personnalité ?",
          en: "What is a personality disorder?",
          choices: [
            ch("Un épisode passager de comportements inhabituels, provoqué par un stress important, un deuil ou une rupture", "A passing episode of unusual behaviour triggered by major stress, grief or a breakup"),
            ch("Une forme de psychose", "A form of psychosis"),
            ch("Un mode durable et rigide de penser, de ressentir et d'agir, qui cause souffrance ou difficultés de fonctionnement", "A lasting, rigid pattern of thinking, feeling and acting that causes distress or functional difficulties", true),
            ch("Un simple trait de caractère que tout le monde a", "A simple character trait everyone has")
          ],
          explFr: "Le trouble est envahissant (il touche plusieurs sphères de la vie) et stable dans le temps. Il se distingue d'une réaction passagère à un événement.",
          explEn: "The disorder is pervasive (it affects several areas of life) and stable over time. It differs from a passing reaction to an event."
        },
        {
          ...match("Associe chaque trouble de la personnalité à sa caractéristique principale.", "Match each personality disorder with its main feature.", [
            pair("Paranoïaque", "Paranoid", "Méfiance et soupçons envahissants envers les autres", "Pervasive distrust and suspicion of others"),
            pair("Schizoïde", "Schizoid", "Détachement des relations sociales, émotions peu exprimées", "Detachment from relationships, little emotional expression"),
            pair("Antisociale", "Antisocial", "Mépris et transgression des droits d'autrui, sans remords", "Disregard for and violation of others' rights, without remorse"),
            pair("Narcissique", "Narcissistic", "Sentiment de grandeur, besoin d'admiration, manque d'empathie", "Grandiosity, need for admiration, lack of empathy"),
            pair("Évitante", "Avoidant", "Inhibition sociale et grande sensibilité au rejet", "Social inhibition and strong sensitivity to rejection"),
            pair("Dépendante", "Dependent", "Besoin excessif d'être pris en charge, peur de la séparation", "Excessive need to be taken care of, fear of separation")
          ]),
          explFr: "Connaître les grands traits aide à adapter l'approche : transparence avec la personne méfiante, fermeté avec la personne antisociale, encouragement de l'autonomie avec la personne dépendante.",
          explEn: "Knowing the main features helps adapt the approach: transparency with a distrustful person, firmness with an antisocial person, encouraging autonomy with a dependent person."
        },
        {
          ...tf("Les troubles de la personnalité se manifestent habituellement dès l'adolescence ou le début de l'âge adulte et persistent dans le temps.",
                "Personality disorders usually appear by adolescence or early adulthood and persist over time.", true),
          explFr: "Vrai. Ce sont des modes de fonctionnement installés tôt. Ils peuvent toutefois s'atténuer avec l'âge et avec une thérapie adaptée.",
          explEn: "True. These are patterns established early. They can, however, lessen with age and with appropriate therapy."
        },
        {
          fr: "Dans le trouble de la personnalité limite, quelle peur est souvent au cœur des réactions intenses de la personne ?",
          en: "In borderline personality disorder, what fear often lies at the heart of the person's intense reactions?",
          choices: [
            ch("La peur des microbes", "Fear of germs"),
            ch("La peur d'être abandonnée, réelle ou imaginée", "Fear of abandonment, real or imagined", true),
            ch("La peur des espaces clos comme les ascenseurs", "Fear of enclosed spaces such as elevators"),
            ch("La peur de perdre le contrôle en public et d'être humiliée", "Fear of losing control in public and being humiliated")
          ],
          explFr: "Un départ, un changement d'intervenant ou un retard peut être vécu comme un abandon et déclencher colère, détresse ou gestes impulsifs. Annoncer les changements à l'avance aide.",
          explEn: "A departure, a change of caregiver or a delay can be experienced as abandonment and trigger anger, distress or impulsive acts. Announcing changes in advance helps."
        },
        {
          fr: "Qu'appelle-t-on le « clivage » chez une personne vivant avec un trouble de la personnalité limite ?",
          en: "What is “splitting” in a person living with borderline personality disorder?",
          choices: [
            ch("Voir les gens comme tout bons ou tout mauvais, passant vite de l'idéalisation à la dévalorisation", "Seeing people as all good or all bad, shifting quickly from idealization to devaluation", true),
            ch("Alterner entre deux identités distinctes, chacune avec son propre nom, sa voix et ses propres souvenirs", "Alternating between two distinct identities, each with its own name, voice and memories"),
            ch("Entendre deux voix différentes", "Hearing two different voices"),
            ch("Séparer ses repas en plusieurs petites portions", "Splitting meals into several small portions")
          ],
          explFr: "Le clivage peut aussi diviser l'équipe (« les bons » et « les méchants » intervenants). La cohérence de l'équipe en est le meilleur antidote.",
          explEn: "Splitting can also divide the team (“good” and “bad” caregivers). Team consistency is the best antidote."
        },
        {
          fr: "Lequel de ces comportements illustre l'impulsivité associée au trouble de la personnalité limite ?",
          en: "Which of these behaviours illustrates the impulsivity associated with borderline personality disorder?",
          choices: [
            ch("Une planification minutieuse de chaque journée, par crainte de commettre des erreurs", "Careful planning of every day, out of fear of making mistakes"),
            ch("Une grande prudence face aux risques", "Great caution regarding risks"),
            ch("Des dépenses excessives, une consommation abusive ou une conduite dangereuse", "Excessive spending, substance misuse or reckless driving", true),
            ch("Un retrait social complet et durable, avec très peu d'intérêt pour les relations", "Complete, lasting social withdrawal, with very little interest in relationships")
          ],
          explFr: "L'impulsivité touche des domaines qui peuvent nuire à la personne. Avec l'instabilité émotionnelle, elle augmente le risque de gestes autodommageables.",
          explEn: "Impulsivity affects areas that can harm the person. Combined with emotional instability, it increases the risk of self-harm."
        }
      ]
    },
    {
      level: 2,
      theme_fr: "Approche : constance, cadre et limites claires",
      theme_en: "Approach: consistency, structure and clear limits",
      questions: [
        {
          ...scenario(
            "Une usagère vous dit : « Vous êtes la seule qui me comprend ici, les autres sont nulles. » Quelle réponse est la plus appropriée ?",
            "A client tells you: “You're the only one who understands me here, the others are useless.” Which response is most appropriate?",
            [
              ch("Accepter le compliment et lui promettre de vous occuper d'elle en priorité lors de vos prochains quarts", "Accept the compliment and promise to care for her first on your next shifts"),
              ch("Accueillir ses propos sans y adhérer, rappeler que toute l'équipe travaille avec elle et garder le même cadre que vos collègues", "Acknowledge her words without agreeing, remind her the whole team works with her and keep the same framework as your colleagues", true),
              ch("Critiquer avec elle les autres intervenants pour garder le lien", "Criticize the other caregivers with her to keep the connection"),
              ch("Lui répondre sèchement que ce n'est pas vrai", "Answer curtly that it isn't true")
            ]),
          explFr: "L'idéalisation fait partie du clivage. Devenir « la préférée » expose à une dévalorisation plus tard et divise l'équipe ; on reste chaleureux, mais cohérent.",
          explEn: "Idealization is part of splitting. Becoming “the favourite” sets you up for later devaluation and divides the team; stay warm, but consistent."
        },
        {
          ...tf("Avec une personne vivant avec un trouble de la personnalité limite, il est préférable que chaque intervenant adapte les règles à sa façon pour garder un bon lien.",
                "With a person living with borderline personality disorder, it is better for each caregiver to adapt the rules in their own way to keep a good relationship.", false),
          explFr: "Faux. Des règles qui varient d'un intervenant à l'autre alimentent le clivage et l'insécurité. La constance de toute l'équipe est essentielle.",
          explEn: "False. Rules that vary from one caregiver to another feed splitting and insecurity. Consistency across the whole team is essential."
        },
        {
          ...scenario(
            "Un usager exige de fumer en dehors des heures prévues et menace de « tout casser » si vous refusez. Quelle conduite est appropriée ?",
            "A client demands to smoke outside the scheduled times and threatens to “smash everything” if you refuse. What is the appropriate course of action?",
            [
              ch("Céder cette fois-ci pour éviter la crise, en lui précisant clairement que ce sera la dernière fois", "Give in this time to avoid a crisis, making it clear it will be the last time"),
              ch("Rappeler calmement la règle, offrir un choix possible dans le cadre et aviser l'équipe de la menace", "Calmly restate the rule, offer a possible choice within the framework and inform the team of the threat", true),
              ch("Le menacer à votre tour d'une conséquence", "Threaten him with a consequence in return"),
              ch("Ignorer complètement sa demande", "Ignore his request completely")
            ]),
          explFr: "Céder sous la menace renforce le comportement. On maintient la limite avec calme, on offre un choix réel et on transmet la menace pour que l'équipe reste cohérente et en sécurité.",
          explEn: "Giving in under threat reinforces the behaviour. Hold the limit calmly, offer a real choice and report the threat so the team stays consistent and safe."
        },
        {
          fr: "Pourquoi des limites claires et prévisibles aident-elles une personne vivant avec un trouble de la personnalité limite ?",
          en: "Why do clear, predictable limits help a person living with borderline personality disorder?",
          choices: [
            ch("Parce qu'elles servent à lui imposer une conséquence chaque fois qu'elle dérange l'unité", "Because they are used to impose a consequence every time she disrupts the unit"),
            ch("Parce qu'elles offrent un cadre sécurisant qui diminue l'anxiété et les conflits", "Because they provide a reassuring framework that reduces anxiety and conflict", true),
            ch("Parce qu'elles remplacent le besoin d'écoute", "Because they replace the need for listening"),
            ch("Parce qu'elles permettent d'éviter de longues discussions avec elle pendant les soins", "Because they make it possible to avoid long discussions with her during care")
          ],
          explFr: "Le cadre n'est pas une punition : c'est un repère stable. Il s'applique avec respect, en expliquant les raisons, et toujours avec une écoute empathique.",
          explEn: "Structure is not punishment: it is a stable reference point. It is applied respectfully, explaining the reasons, and always with empathic listening."
        },
        {
          fr: "Quelle approche thérapeutique, offerte par des équipes spécialisées, a démontré son efficacité pour le trouble de la personnalité limite ?",
          en: "Which therapeutic approach, offered by specialized teams, has proven effective for borderline personality disorder?",
          choices: [
            ch("La luminothérapie quotidienne, qui réduit l'impulsivité et la peur de l'abandon chez l'adulte", "Daily light therapy, which reduces impulsivity and fear of abandonment in adults"),
            ch("La thérapie comportementale dialectique (TCD), axée sur la régulation des émotions", "Dialectical behaviour therapy (DBT), focused on emotion regulation", true),
            ch("La sismothérapie, qui stabilise rapidement les émotions et l'impulsivité", "Electroconvulsive therapy, which quickly stabilizes emotions and impulsivity"),
            ch("Le repos complet au lit", "Complete bed rest")
          ],
          explFr: "La TCD aide la personne à tolérer la détresse, réguler ses émotions et améliorer ses relations. L'intervenant peut encourager l'utilisation des habiletés apprises.",
          explEn: "DBT helps the person tolerate distress, regulate emotions and improve relationships. Caregivers can encourage the use of the skills learned."
        },
        {
          ...scenario(
            "Hier, une usagère vous idéalisait. Aujourd'hui, après un refus de votre part, elle vous crie que vous êtes « la pire ». Comment réagir ?",
            "Yesterday a client idealized you. Today, after you said no to something, she shouts that you are “the worst”. How should you react?",
            [
              ch("Lui rappeler calmement tout ce que vous avez fait pour elle depuis le début de son hospitalisation", "Calmly remind her of everything you've done for her since her admission"),
              ch("Demander à ne plus vous occuper d'elle", "Ask to no longer care for her"),
              ch("Rester calme et cohérent(e), ne pas le prendre personnellement et en parler avec l'équipe", "Stay calm and consistent, don't take it personally and talk it over with the team", true),
              ch("Revenir sur votre refus et vous excuser, pour retrouver sa confiance avant la fin de votre quart", "Reverse your refusal and apologize, to regain her trust before the end of your shift")
            ]),
          explFr: "Le passage de l'idéalisation à la dévalorisation est typique du clivage. Votre stabilité est thérapeutique ; en parler à l'équipe aide à garder du recul.",
          explEn: "Shifting from idealization to devaluation is typical of splitting. Your stability is therapeutic; talking with the team helps you keep perspective."
        }
      ]
    },
    {
      level: 3,
      theme_fr: "Automutilation, sécurité et travail d'équipe",
      theme_en: "Self-harm, safety and teamwork",
      questions: [
        {
          ...scenario(
            "Vous remarquez de nouvelles blessures superficielles sur l'avant-bras d'une usagère. Quelle conduite est la plus appropriée ?",
            "You notice new superficial injuries on a client's forearm. What is the most appropriate course of action?",
            [
              ch("Faire les soins, puis lui expliquer fermement la gravité de son geste pour éviter une récidive", "Provide care, then firmly explain how serious her act was to prevent it happening again"),
              ch("Faire semblant de ne rien voir pour ne pas l'humilier, et en reparler seulement si elle aborde le sujet", "Pretend not to see anything so as not to humiliate her, and only discuss it if she brings it up"),
              ch("Offrir les soins calmement et sans jugement, vérifier sa sécurité et aviser l'infirmière", "Provide care calmly and without judgment, check on her safety and notify the nurse", true),
              ch("Lui retirer ses privilèges de sortie", "Take away her outing privileges")
            ]),
          explFr: "Une attitude neutre et bienveillante favorise la confiance. Toute blessure auto-infligée est rapportée : l'infirmière évalue le risque et ajuste le plan.",
          explEn: "A neutral, caring attitude builds trust. Every self-inflicted injury is reported: the nurse assesses the risk and adjusts the plan."
        },
        {
          ...tf("Les gestes d'automutilation sont seulement une façon d'attirer l'attention et n'ont pas besoin d'être pris au sérieux.",
                "Self-harm is only a way to get attention and does not need to be taken seriously.", false),
          explFr: "Faux. L'automutilation traduit une souffrance réelle et peut s'accompagner d'un risque suicidaire. Elle est toujours prise au sérieux et rapportée.",
          explEn: "False. Self-harm reflects real suffering and may be accompanied by suicide risk. It is always taken seriously and reported."
        },
        {
          fr: "Chez une personne vivant avec un trouble de la personnalité limite, l'automutilation sert souvent à :",
          en: "In a person living with borderline personality disorder, self-harm often serves to:",
          choices: [
            ch("Soulager temporairement une souffrance émotionnelle intense", "Temporarily relieve intense emotional pain", true),
            ch("Obtenir un congé plus rapidement ou un changement d'intervenant", "Getting discharged sooner or getting a different caregiver"),
            ch("Imiter les autres usagers", "Imitate other clients"),
            ch("Se divertir", "Entertain oneself")
          ],
          explFr: "Comprendre la fonction du geste aide à l'aborder sans jugement. Le plan de soins vise à remplacer ce moyen par des stratégies plus sécuritaires.",
          explEn: "Understanding the function of the behaviour helps address it without judgment. The care plan aims to replace it with safer strategies."
        },
        {
          fr: "Quel est l'avantage d'un plan d'intervention connu et appliqué par toute l'équipe ?",
          en: "What is the benefit of an intervention plan known and applied by the whole team?",
          choices: [
            ch("Il permet à chacun de faire à sa façon", "It lets everyone do things their own way"),
            ch("Il assure des réponses cohérentes d'un quart à l'autre et limite le clivage", "It ensures consistent responses from shift to shift and limits splitting", true),
            ch("Il remplace les discussions avec la personne, puisque tout est déjà prévu à l'avance", "It replaces discussions with the person, since everything is already planned in advance"),
            ch("Il sert surtout à documenter les écarts de conduite de la personne en vue de son congé", "It mainly serves to document the person's misconduct ahead of discharge")
          ],
          explFr: "La cohérence de jour, de soir et de nuit rend le cadre prévisible. Chaque intervenant le connaît, l'applique et rapporte ce qui fonctionne ou non.",
          explEn: "Consistency across day, evening and night shifts makes the framework predictable. Every caregiver knows it, applies it and reports what works or not."
        },
        {
          ...scenario(
            "Un usager vivant avec un trouble de la personnalité antisociale vous flatte, puis vous demande avec insistance un « petit service » en dehors des règles. Quelle conduite est appropriée ?",
            "A client living with antisocial personality disorder flatters you, then insistently asks for a “small favour” outside the rules. What is the appropriate course of action?",
            [
              ch("Accepter cette fois, puisqu'il est poli", "Agree this time, since he is polite"),
              ch("Refuser poliment et fermement, rappeler le cadre et informer l'équipe", "Decline politely and firmly, restate the rules and inform the team", true),
              ch("Accepter à condition qu'il n'en parle à personne et que ce soit la seule fois", "Agree on condition he tells no one and it's the only time"),
              ch("Le dénoncer devant les autres usagers", "Call him out in front of other clients")
            ]),
          explFr: "Avec ce trouble, des limites fermes, constantes et sans négociation sont essentielles. Informer l'équipe évite que la demande soit répétée auprès d'un autre intervenant.",
          explEn: "With this disorder, firm, consistent, non-negotiable limits are essential. Informing the team prevents the request from being repeated to another caregiver."
        },
        {
          fr: "Quelle est la différence entre le trouble de la personnalité obsessionnelle-compulsive et le trouble obsessionnel-compulsif (TOC) ?",
          en: "What is the difference between obsessive-compulsive personality disorder and obsessive-compulsive disorder (OCD)?",
          choices: [
            ch("Il n'y a aucune différence : ce sont deux noms pour le même trouble", "There is no difference: they are two names for the same disorder"),
            ch("Le trouble de la personnalité est une rigidité axée sur l'ordre et le perfectionnisme ; le TOC comporte des obsessions et des compulsions", "The personality disorder is rigidity focused on order and perfectionism; OCD involves obsessions and compulsions", true),
            ch("Le TOC touche seulement les enfants", "OCD only affects children"),
            ch("Le trouble de la personnalité comporte des obsessions et des compulsions précises ; le TOC est un perfectionnisme rigide présent depuis l'enfance", "The personality disorder involves specific obsessions and compulsions; OCD is a rigid perfectionism present since childhood")
          ],
          explFr: "La personne au trouble de la personnalité obsessionnelle-compulsive voit souvent sa rigidité comme normale ; celle qui a un TOC vit généralement ses obsessions comme envahissantes et indésirables.",
          explEn: "A person with obsessive-compulsive personality disorder often sees their rigidity as normal; a person with OCD usually experiences their obsessions as intrusive and unwanted."
        }
      ]
    }
  ]
},

/* ---------- 5. Troubles de l'humeur ---------- */
{
  id: "sm_humeur", order: 5,
  title_fr: "Troubles de l'humeur",
  title_en: "Mood Disorders",
  icon: "🌗",
  tiers: [
    {
      level: 1,
      theme_fr: "Dépression et trouble bipolaire : les bases",
      theme_en: "Depression and bipolar disorder: the basics",
      questions: [
        {
          fr: "Pour parler d'un épisode dépressif caractérisé, les symptômes doivent généralement être présents depuis au moins :",
          en: "To speak of a major depressive episode, symptoms must generally have been present for at least:",
          choices: [
            ch("Deux jours", "Two days"),
            ch("Deux semaines", "Two weeks", true),
            ch("Six mois consécutifs", "Six consecutive months"),
            ch("Un an", "One year")
          ],
          explFr: "Une tristesse passagère est normale. Le diagnostic exige des symptômes présents presque tous les jours pendant au moins deux semaines, avec un impact sur le fonctionnement.",
          explEn: "Passing sadness is normal. The diagnosis requires symptoms present nearly every day for at least two weeks, with an impact on functioning."
        },
        {
          ...tf("La dépression est une faiblesse de caractère : avec de la volonté, la personne pourrait s'en sortir seule.",
                "Depression is a weakness of character: with willpower, the person could get out of it alone.", false),
          explFr: "Faux. La dépression est une maladie qui touche l'humeur, la pensée et le corps. Elle se traite, et la culpabiliser aggrave sa souffrance.",
          explEn: "False. Depression is an illness affecting mood, thinking and the body. It is treatable, and blaming the person worsens their suffering."
        },
        {
          fr: "Quelle différence y a-t-il entre la manie et l'hypomanie ?",
          en: "What is the difference between mania and hypomania?",
          choices: [
            ch("L'hypomanie est plus intense, dure plus longtemps et s'accompagne souvent de symptômes psychotiques", "Hypomania is more intense, lasts longer and often comes with psychotic symptoms"),
            ch("L'hypomanie est moins intense et plus courte, sans atteinte sévère du fonctionnement", "Hypomania is less intense and shorter, without severe functional impairment", true),
            ch("La manie touche seulement les adolescents", "Mania only affects teenagers"),
            ch("Il n'y a aucune différence", "There is no difference")
          ],
          explFr: "La manie perturbe fortement la vie de la personne et peut s'accompagner de symptômes psychotiques. L'hypomanie est une forme atténuée.",
          explEn: "Mania severely disrupts the person's life and may come with psychotic symptoms. Hypomania is a milder form."
        },
        {
          ...match("Associe chaque manifestation des troubles de l'humeur à sa description.", "Match each mood disorder manifestation with its description.", [
            pair("Euphorie", "Euphoria", "Humeur exagérément joyeuse, sans rapport avec la situation", "Excessively elevated mood, out of proportion to the situation"),
            pair("Logorrhée", "Pressured speech", "Flot de paroles rapide et difficile à interrompre", "Rapid flow of speech that is hard to interrupt"),
            pair("Idées de grandeur", "Grandiosity", "Surestimation de ses capacités ou de son importance", "Overestimation of one's abilities or importance"),
            pair("Irritabilité", "Irritability", "Tendance à s'emporter facilement", "Tendency to lose one's temper easily"),
            pair("Ralentissement psychomoteur", "Psychomotor slowing", "Lenteur des gestes, de la parole et de la pensée", "Slowness of movement, speech and thought"),
            pair("Culpabilité excessive", "Excessive guilt", "Se reprocher des fautes de façon exagérée ou injustifiée", "Blaming oneself excessively or without reason")
          ]),
          explFr: "Les quatre premières manifestations se voient surtout en manie ; le ralentissement et la culpabilité excessive, surtout en dépression.",
          explEn: "The first four are mostly seen in mania; slowing and excessive guilt are mostly seen in depression."
        },
        {
          fr: "Qu'est-ce qui caractérise le trouble bipolaire de type I ?",
          en: "What characterizes bipolar I disorder?",
          choices: [
            ch("La présence d'au moins un épisode maniaque", "The presence of at least one manic episode", true),
            ch("Uniquement des épisodes dépressifs qui reviennent chaque année", "Only depressive episodes that recur every year"),
            ch("Des épisodes d'hypomanie seulement, sans jamais de dépression", "Only hypomanic episodes, never depression"),
            ch("Des hallucinations permanentes", "Permanent hallucinations")
          ],
          explFr: "Le type I comporte au moins un épisode maniaque. Le type II alterne épisodes dépressifs et hypomanie, sans manie franche.",
          explEn: "Type I involves at least one manic episode. Type II alternates depressive episodes and hypomania, without full mania."
        },
        {
          ...tf("Chez la personne âgée, une dépression peut se manifester par des troubles de mémoire et de concentration qu'on peut confondre avec un trouble neurocognitif.",
                "In older adults, depression can show up as memory and concentration problems that may be mistaken for a neurocognitive disorder.", true),
          explFr: "Vrai. La dépression de la personne âgée est souvent sous-diagnostiquée. Tout changement de comportement ou de mémoire est observé et rapporté.",
          explEn: "True. Depression in older adults is often underdiagnosed. Any change in behaviour or memory is observed and reported."
        }
      ]
    },
    {
      level: 2,
      theme_fr: "Approche auprès de la personne déprimée ou en manie",
      theme_en: "Approach with a depressed or manic person",
      questions: [
        {
          ...scenario(
            "Un usager déprimé vous dit qu'il n'a pas la force de se laver. Quelle approche est la plus appropriée ?",
            "A depressed client tells you he doesn't have the strength to wash. Which approach is most appropriate?",
            [
              ch("Faire toute la toilette à sa place", "Do all of the washing for him"),
              ch("Reporter la toilette à plus tard, jusqu'à ce qu'il se sente assez d'énergie pour la faire seul", "Postpone washing until he feels energetic enough to do it alone"),
              ch("Fractionner la tâche en petites étapes, l'accompagner et souligner chaque effort", "Break the task into small steps, support him and acknowledge each effort", true),
              ch("Lui rappeler qu'il doit faire un effort comme tout le monde, sinon il ne guérira pas", "Remind him he must make an effort like everyone else, or he won't get better")
            ]),
          explFr: "Des étapes simples et réalisables redonnent un sentiment de réussite. Faire à sa place peut renforcer l'impuissance ; le brusquer augmente la culpabilité.",
          explEn: "Simple, achievable steps restore a sense of success. Doing it for him can reinforce helplessness; pushing him increases guilt."
        },
        {
          ...tf("Dire « secoue-toi, il y a pire que toi » aide la personne déprimée à se motiver.",
                "Saying “snap out of it, others have it worse” helps a depressed person get motivated.", false),
          explFr: "Faux. Ce genre de phrase minimise la souffrance et augmente la culpabilité. On reconnaît plutôt la difficulté et on offre une présence et un soutien concret.",
          explEn: "False. This kind of remark minimizes suffering and increases guilt. Instead, acknowledge the difficulty and offer presence and concrete support."
        },
        {
          ...scenario(
            "Une usagère en phase maniaque n'arrive pas à rester assise pour manger et a perdu du poids. Quelle intervention est appropriée ?",
            "A client in a manic phase can't stay seated to eat and has lost weight. Which intervention is appropriate?",
            [
              ch("L'obliger à rester assise jusqu'à la fin du repas", "Make her stay seated until the end of the meal"),
              ch("Offrir des collations nutritives à manger en marchant, des liquides souvent, et surveiller son poids et son hydratation", "Offer nutritious snacks she can eat while walking, frequent fluids, and monitor her weight and hydration", true),
              ch("Attendre qu'elle ait faim pour la nourrir", "Wait until she is hungry to feed her"),
              ch("Supprimer les collations entre les repas pour qu'elle ait davantage faim au moment de s'asseoir à table", "Remove snacks between meals so she is hungrier when it's time to sit at the table")
            ]),
          explFr: "En manie, l'hyperactivité augmente les besoins et la personne oublie de manger et de boire. On s'adapte à son rythme et on rapporte poids, apports et hydratation.",
          explEn: "In mania, hyperactivity increases needs and the person forgets to eat and drink. Adapt to her pace and report weight, intake and hydration."
        },
        {
          fr: "Quel environnement convient le mieux à une personne en phase maniaque ?",
          en: "Which environment is best for a person in a manic phase?",
          choices: [
            ch("Une salle commune animée, où il peut socialiser avec les autres et canaliser son énergie", "A lively common room where he can socialize with others and channel his energy"),
            ch("Des jeux compétitifs en groupe", "Competitive group games"),
            ch("Un milieu calme et peu stimulant, avec des activités simples et non compétitives", "A calm, low-stimulation setting with simple, non-competitive activities", true),
            ch("Plusieurs activités physiques en même temps pour l'aider à dépenser son trop-plein d'énergie", "Several physical activities at once to help burn off excess energy")
          ],
          explFr: "La surstimulation alimente l'agitation. Un milieu calme et des activités simples (marche, tâche manuelle) aident la personne à canaliser son énergie.",
          explEn: "Overstimulation fuels agitation. A calm setting and simple activities (walking, a manual task) help the person channel their energy."
        },
        {
          ...scenario(
            "Un usager en manie veut organiser une grande fête pour toute l'unité ce soir et s'impatiente quand vous refusez. Que faites-vous ?",
            "A client in mania wants to throw a big party for the whole unit tonight and gets impatient when you say no. What do you do?",
            [
              ch("Accepter pour éviter qu'il se fâche", "Agree so he doesn't get angry"),
              ch("Lui expliquer en détail tous les problèmes de son projet pour qu'il comprenne pourquoi c'est impossible", "Explain in detail everything wrong with his plan so he understands why it's impossible"),
              ch("Rester calme et ferme, ne pas argumenter, rediriger son énergie et rapporter son état", "Stay calm and firm, don't argue, redirect his energy and report his condition", true),
              ch("L'ignorer jusqu'à ce qu'il abandonne", "Ignore him until he gives up")
            ]),
          explFr: "Une fermeté bienveillante, des phrases brèves et une redirection sont plus efficaces que le débat, qui risque de faire monter l'irritabilité.",
          explEn: "Kind firmness, brief sentences and redirection work better than debate, which risks increasing irritability."
        },
        {
          fr: "Pourquoi le sommeil est-il un élément important à observer et à rapporter dans les troubles de l'humeur ?",
          en: "Why is sleep important to observe and report in mood disorders?",
          choices: [
            ch("Parce qu'il n'a aucun lien avec l'humeur", "Because it has no link with mood"),
            ch("Un besoin de sommeil réduit peut annoncer une manie ; l'insomnie accompagne souvent la dépression", "A reduced need for sleep can signal mania; insomnia often accompanies depression", true),
            ch("Seulement pour savoir à quelle heure distribuer les repas", "Only to know when to serve meals"),
            ch("Parce qu'une personne qui dort huit heures par nuit est forcément en train de sortir de son épisode dépressif", "Because a person sleeping eight hours a night is necessarily coming out of their depressive episode")
          ],
          explFr: "Le sommeil est un indicateur précoce et objectif. Noter les heures de sommeil réelles aide l'équipe à détecter une rechute.",
          explEn: "Sleep is an early, objective indicator. Recording actual hours of sleep helps the team detect a relapse."
        }
      ]
    },
    {
      level: 3,
      theme_fr: "Surveillance, sécurité et jugement clinique",
      theme_en: "Monitoring, safety and clinical judgment",
      questions: [
        {
          ...tf("Au début de l'amélioration d'une dépression, la vigilance face au risque suicidaire doit être maintenue, car l'énergie peut revenir avant l'humeur.",
                "Early in the improvement of depression, vigilance about suicide risk must be maintained, because energy may return before mood.", true),
          explFr: "Vrai. La personne peut retrouver l'énergie d'agir alors qu'elle se sent encore désespérée. Toute parole ou tout signe inquiétant est rapporté.",
          explEn: "True. The person may regain the energy to act while still feeling hopeless. Any worrying words or signs are reported."
        },
        {
          fr: "Qu'est-ce qu'une dépression à caractère saisonnier ?",
          en: "What is depression with a seasonal pattern?",
          choices: [
            ch("Une dépression qui revient chaque année à la même saison, le plus souvent l'automne et l'hiver", "Depression that returns each year in the same season, most often fall and winter", true),
            ch("Une dépression causée chaque printemps par une allergie saisonnière au pollen", "Depression caused every spring by a seasonal pollen allergy"),
            ch("Une tristesse normale lors des vacances d'été", "Normal sadness during summer holidays"),
            ch("Une dépression qui ne touche que les enfants", "Depression that only affects children")
          ],
          explFr: "Elle est liée à la baisse de lumière naturelle. La luminothérapie fait partie des traitements possibles, sur recommandation médicale.",
          explEn: "It is linked to reduced natural light. Light therapy is one possible treatment, on medical recommendation."
        },
        {
          fr: "Chez une personne en manie, quels risques doivent être particulièrement surveillés ?",
          en: "In a person with mania, which risks must be closely monitored?",
          choices: [
            ch("L'excès de sommeil, le ralentissement des gestes et la perte d'intérêt pour les activités", "Oversleeping, slowed movements and loss of interest in activities"),
            ch("L'épuisement, la déshydratation et les comportements à risque (dépenses, conflits)", "Exhaustion, dehydration and risky behaviour (spending, conflicts)", true),
            ch("La perte d'intérêt pour tout", "Loss of interest in everything"),
            ch("Une grande prudence financière et une tendance marquée à éviter toute forme de prise de risque", "Great financial caution and a marked tendency to avoid any kind of risk")
          ],
          explFr: "L'impulsivité et l'hyperactivité exposent la personne à des conséquences graves et à l'épuisement. On protège sa dignité et sa sécurité, et on rapporte.",
          explEn: "Impulsivity and hyperactivity expose the person to serious consequences and exhaustion. Protect their dignity and safety, and report."
        },
        {
          ...scenario(
            "Une usagère vivant avec un trouble bipolaire, stable depuis des mois, vous dit qu'elle se sent « tellement bien » qu'elle va cesser son traitement. Que faites-vous ?",
            "A client living with bipolar disorder, stable for months, tells you she feels “so good” that she's going to stop her treatment. What do you do?",
            [
              ch("La féliciter et lui conseiller de diminuer graduellement ses doses elle-même pour éviter les effets de sevrage", "Congratulate her and advise her to taper her doses herself to avoid withdrawal effects"),
              ch("Accueillir son sentiment, l'informer que le traitement prévient les rechutes, l'inviter à en parler à l'équipe et rapporter ses propos", "Acknowledge her feelings, explain that treatment prevents relapse, invite her to discuss it with the team and report her words", true),
              ch("Lui dire qu'elle n'a pas le droit d'arrêter", "Tell her she isn't allowed to stop"),
              ch("Ne rien dire, c'est sa décision", "Say nothing, it's her decision")
            ]),
          explFr: "Se sentir bien est souvent l'effet du traitement. On respecte son autonomie en lui donnant l'information juste et on transmet à l'équipe, qui pourra en discuter avec elle.",
          explEn: "Feeling well is often the effect of treatment. Respect her autonomy by giving accurate information and pass it on to the team, who can discuss it with her."
        },
        {
          fr: "Une dépression sévère peut s'accompagner d'idées délirantes. Lesquelles sont typiques ?",
          en: "Severe depression can be accompanied by delusions. Which are typical?",
          choices: [
            ch("Des idées de culpabilité, de ruine ou de maladie grave", "Ideas of guilt, ruin or serious illness", true),
            ch("Des idées de grandeur, de pouvoirs exceptionnels ou de mission divine", "Ideas of grandeur, exceptional powers or a divine mission"),
            ch("Des idées de bonheur extrême", "Ideas of extreme happiness"),
            ch("Aucune : la dépression ne comporte jamais de symptômes psychotiques", "None: depression never involves psychotic symptoms")
          ],
          explFr: "Ces idées reflètent l'humeur dépressive (ex. : se croire ruiné ou responsable de malheurs). Elles signalent une dépression grave, à rapporter rapidement.",
          explEn: "These ideas reflect the depressed mood (e.g. believing one is ruined or responsible for misfortune). They signal severe depression, to be reported promptly."
        },
        {
          fr: "Quel traitement peut être utilisé pour une dépression sévère qui ne répond pas aux médicaments ?",
          en: "Which treatment may be used for severe depression that doesn't respond to medication?",
          choices: [
            ch("La sismothérapie (électroconvulsivothérapie), sous anesthésie générale", "Electroconvulsive therapy (ECT), under general anesthesia", true),
            ch("Les antibiotiques", "Antibiotics"),
            ch("Les anticoagulants, qui améliorent la circulation sanguine dans le cerveau", "Anticoagulants, which improve blood flow to the brain"),
            ch("La physiothérapie respiratoire intensive pendant plusieurs semaines", "Intensive respiratory physiotherapy over several consecutive weeks")
          ],
          explFr: "La sismothérapie moderne est un traitement encadré et efficace dans certaines dépressions graves. L'infirmière auxiliaire peut participer à la préparation et à la surveillance selon le protocole.",
          explEn: "Modern ECT is a regulated, effective treatment for some severe depressions. The LPN may take part in preparation and monitoring according to protocol."
        }
      ]
    }
  ]
},

/* ---------- 6. Troubles anxieux ---------- */
{
  id: "sm_anxiete", order: 6,
  title_fr: "Troubles anxieux",
  title_en: "Anxiety Disorders",
  icon: "🌊",
  tiers: [
    {
      level: 1,
      theme_fr: "Reconnaître les troubles anxieux, le TOC et le stress post-traumatique",
      theme_en: "Recognizing anxiety disorders, OCD and post-traumatic stress",
      questions: [
        {
          ...match("Associe chaque trouble à sa description.", "Match each disorder with its description.", [
            pair("Trouble panique", "Panic disorder", "Attaques de panique répétées et inattendues, avec la crainte d'en avoir d'autres", "Repeated, unexpected panic attacks, with fear of having more"),
            pair("Agoraphobie", "Agoraphobia", "Peur des lieux d'où il serait difficile de s'échapper ou d'obtenir de l'aide", "Fear of places where escape or help would be difficult"),
            pair("Phobie spécifique", "Specific phobia", "Peur intense et ciblée d'un objet ou d'une situation (ex. : aiguilles, hauteurs)", "Intense fear of a specific object or situation (e.g. needles, heights)"),
            pair("Anxiété sociale", "Social anxiety", "Peur marquée d'être jugé ou humilié en présence des autres", "Marked fear of being judged or humiliated in front of others"),
            pair("TOC", "OCD", "Obsessions et compulsions qui prennent du temps et causent de la détresse", "Time-consuming obsessions and compulsions that cause distress"),
            pair("TSPT", "PTSD", "Symptômes persistants après un événement traumatique : reviviscences, évitement, hypervigilance", "Persistent symptoms after a traumatic event: re-experiencing, avoidance, hypervigilance")
          ]),
          explFr: "Ces troubles ont en commun une peur ou une anxiété excessive, mais leurs déclencheurs et leurs manifestations diffèrent, ce qui oriente l'approche.",
          explEn: "These disorders share excessive fear or anxiety, but their triggers and manifestations differ, which guides the approach."
        },
        {
          fr: "Dans le TOC, qu'est-ce qu'une obsession ?",
          en: "In OCD, what is an obsession?",
          choices: [
            ch("Un geste répété, comme se laver les mains, fait pour diminuer l'anxiété", "A repeated action, such as handwashing, done to reduce anxiety"),
            ch("Une pensée, une image ou une impulsion intrusive et répétée qui cause de l'anxiété", "An intrusive, recurring thought, image or urge that causes anxiety", true),
            ch("Un intérêt passionné pour un loisir", "A passionate interest in a hobby"),
            ch("Une hallucination auditive", "An auditory hallucination")
          ],
          explFr: "L'obsession est une pensée qui s'impose (ex. : peur d'être contaminé) ; la compulsion est le geste répété pour calmer l'anxiété (ex. : se laver les mains).",
          explEn: "An obsession is a thought that intrudes (e.g. fear of contamination); a compulsion is the repeated act to calm the anxiety (e.g. handwashing)."
        },
        {
          ...tf("Une attaque de panique atteint habituellement son intensité maximale en quelques minutes.",
                "A panic attack usually reaches its peak intensity within a few minutes.", true),
          explFr: "Vrai. L'attaque monte rapidement puis diminue d'elle-même. Le savoir permet de rassurer la personne : « Ça va passer, je reste avec vous. »",
          explEn: "True. The attack builds quickly and then subsides on its own. Knowing this helps reassure the person: “It will pass, I'm staying with you.”"
        },
        {
          fr: "Lequel de ces symptômes fait partie du trouble de stress post-traumatique ?",
          en: "Which of these symptoms is part of post-traumatic stress disorder?",
          choices: [
            ch("Des idées de grandeur", "Ideas of grandeur"),
            ch("Une baisse du besoin de sommeil accompagnée d'euphorie et d'énergie débordante", "Reduced need for sleep with euphoria and boundless energy"),
            ch("Des reviviscences de l'événement (souvenirs envahissants, cauchemars)", "Re-experiencing the event (intrusive memories, nightmares)", true),
            ch("Des hallucinations auditives constantes qui commentent chacun de ses gestes", "Constant auditory hallucinations commenting on every action")
          ],
          explFr: "Le TSPT associe reviviscences, évitement des rappels de l'événement, changements négatifs de l'humeur et hypervigilance (sursauts, irritabilité, sommeil perturbé).",
          explEn: "PTSD combines re-experiencing, avoidance of reminders, negative changes in mood and hypervigilance (startle, irritability, disturbed sleep)."
        },
        {
          ...tf("Les personnes qui ont un TOC reconnaissent souvent que leurs obsessions sont excessives, mais ont beaucoup de difficulté à résister aux compulsions.",
                "People with OCD often recognize that their obsessions are excessive, but find it very hard to resist their compulsions.", true),
          explFr: "Vrai. C'est ce qui rend le TOC si éprouvant : la personne sait que c'est exagéré, mais l'anxiété l'emporte. Se moquer ou s'impatienter accentue la détresse.",
          explEn: "True. This is what makes OCD so distressing: the person knows it is excessive, but anxiety wins. Mocking or impatience increases distress."
        },
        {
          fr: "Pourquoi une personne anxieuse évite-t-elle souvent les situations qui lui font peur ?",
          en: "Why does an anxious person often avoid the situations they fear?",
          choices: [
            ch("Parce que l'évitement soulage l'anxiété sur le moment, mais l'entretient à long terme", "Because avoidance relieves anxiety in the moment but maintains it in the long term", true),
            ch("Parce qu'elle manque de politesse", "Because they lack manners"),
            ch("Parce que l'évitement guérit l'anxiété", "Because avoidance cures anxiety"),
            ch("Parce que l'évitement, répété assez souvent, finit par faire disparaître complètement la peur", "Because avoidance, repeated often enough, eventually makes the fear disappear completely")
          ],
          explFr: "C'est le cercle vicieux de l'anxiété. Les thérapies efficaces exposent graduellement la personne à ce qu'elle craint, dans un cadre sécurisant.",
          explEn: "This is the vicious circle of anxiety. Effective therapies gradually expose the person to what they fear, in a safe setting."
        }
      ]
    },
    {
      level: 2,
      theme_fr: "Approche apaisante au quotidien",
      theme_en: "A calming approach day to day",
      questions: [
        {
          fr: "Une technique d'ancrage dans le moment présent consiste à :",
          en: "A grounding technique for the present moment consists of:",
          choices: [
            ch("Demander à la personne de raconter en détail ce qui lui fait peur, pour l'aider à s'en libérer", "Asking the person to describe in detail what frightens them, to help them let go of it"),
            ch("Inviter la personne à nommer ce qu'elle voit, entend et touche autour d'elle", "Inviting the person to name what they see, hear and touch around them", true),
            ch("Lui demander de fermer les yeux et de rester seule dans sa chambre jusqu'à ce que ça passe", "Asking them to close their eyes and stay alone in their room until it passes"),
            ch("Lui proposer un café pour l'aider à se concentrer", "Offering coffee to help them focus")
          ],
          explFr: "L'ancrage sensoriel détourne l'attention des pensées anxieuses vers le concret. C'est simple, sécuritaire et utilisable par l'intervenant comme par la personne.",
          explEn: "Sensory grounding shifts attention from anxious thoughts to concrete reality. It is simple, safe and usable by both caregiver and person."
        },
        {
          ...scenario(
            "Un usager ayant un TOC répète un long rituel de lavage des mains avant chaque repas, et son repas refroidit. Quelle approche est appropriée ?",
            "A client with OCD repeats a long handwashing ritual before every meal, and his food gets cold. Which approach is appropriate?",
            [
              ch("L'interrompre doucement mais fermement dès le premier lavage, pour qu'il apprenne à se passer du rituel", "Interrupt him gently but firmly at the first wash, so he learns to do without the ritual"),
              ch("Lui faire remarquer devant les autres que c'est exagéré", "Point out in front of others that it's excessive"),
              ch("Ne pas interrompre brusquement ni ridiculiser le rituel ; prévoir du temps et suivre les limites graduelles du plan", "Don't abruptly interrupt or ridicule the ritual; allow time and follow the gradual limits in the plan", true),
              ch("Fermer l'accès au lavabo", "Block access to the sink")
            ]),
          explFr: "Empêcher brusquement la compulsion fait monter l'anxiété en flèche. La diminution des rituels se fait graduellement, selon un plan établi avec l'équipe.",
          explEn: "Abruptly preventing the compulsion makes anxiety soar. Reducing rituals is done gradually, according to a plan set with the team."
        },
        {
          ...tf("Pour aider une personne anxieuse, il suffit de lui dire de « ne pas s'en faire » et de changer de sujet.",
                "To help an anxious person, it is enough to tell them “don't worry” and change the subject.", false),
          explFr: "Faux. Cette réponse banalise l'émotion. On reconnaît plutôt l'anxiété, on explore ce qui l'inquiète et on offre des moyens concrets de l'apaiser.",
          explEn: "False. This response dismisses the emotion. Instead, acknowledge the anxiety, explore what worries the person and offer concrete ways to ease it."
        },
        {
          ...scenario(
            "Avant un prélèvement sanguin, un usager dit avoir une peur intense des aiguilles et commence à pâlir. Que faites-vous ?",
            "Before a blood test, a client says he is intensely afraid of needles and starts to turn pale. What do you do?",
            [
              ch("Faire le prélèvement rapidement pendant qu'il est distrait", "Do the blood draw quickly while he is distracted"),
              ch("Reconnaître sa peur, expliquer chaque étape, l'installer couché ou bien assis et surveiller un malaise", "Acknowledge his fear, explain each step, have him lie down or sit well supported and watch for fainting", true),
              ch("Lui demander de regarder l'aiguille pendant tout le prélèvement pour affronter sa peur d'un seul coup", "Ask him to watch the needle throughout the draw to face his fear all at once"),
              ch("Le faire tenir debout pour que ce soit plus rapide", "Have him stand so it goes faster")
            ]),
          explFr: "La phobie des aiguilles peut provoquer un malaise vagal (pâleur, chute de pression, perte de connaissance). La position sécuritaire et l'explication réduisent ce risque.",
          explEn: "Needle phobia can cause a vasovagal reaction (pallor, drop in blood pressure, fainting). A safe position and explanations reduce this risk."
        },
        {
          fr: "Quelle substance est-il préférable de limiter chez une personne qui vit de l'anxiété ?",
          en: "Which substance is best limited for a person experiencing anxiety?",
          choices: [
            ch("L'eau", "Water"),
            ch("La caféine (café, boissons énergisantes)", "Caffeine (coffee, energy drinks)", true),
            ch("Les fibres alimentaires (céréales, légumes)", "Dietary fibre (grains, vegetables)"),
            ch("Le lait", "Milk")
          ],
          explFr: "La caféine stimule le système nerveux et peut accentuer palpitations, tremblements et insomnie, des symptômes qui ressemblent à ceux de l'anxiété.",
          explEn: "Caffeine stimulates the nervous system and can increase palpitations, tremors and insomnia — symptoms that mimic anxiety."
        },
        {
          ...scenario(
            "Une usagère anxieuse vous pose sans cesse les mêmes questions sur son examen de demain. Quelle approche est la plus aidante ?",
            "An anxious client keeps asking you the same questions about her test tomorrow. Which approach is most helpful?",
            [
              ch("Lui dire poliment que vous avez déjà répondu à cette question plusieurs fois et quitter la chambre", "Politely tell her you've already answered that question several times and leave the room"),
              ch("Donner une information claire et constante, puis l'aider à préciser ce qui l'inquiète", "Give clear, consistent information, then help her pinpoint what worries her", true),
              ch("Lui donner chaque fois une réponse un peu différente pour détourner son attention de l'examen", "Give a slightly different answer each time to take her mind off the test"),
              ch("Éviter de lui parler de l'examen", "Avoid talking to her about the test")
            ]),
          explFr: "L'anxiété nuit à la mémoire et à la concentration. Une information simple et toujours la même rassure ; cerner la vraie crainte permet d'y répondre ou de la transmettre.",
          explEn: "Anxiety impairs memory and concentration. Simple, consistent information reassures; identifying the real fear allows you to address it or pass it on."
        }
      ]
    },
    {
      level: 3,
      theme_fr: "Trauma, sécurité et jugement clinique",
      theme_en: "Trauma, safety and clinical judgment",
      questions: [
        {
          fr: "Que signifie une approche « sensible au trauma » ?",
          en: "What does a “trauma-informed” approach mean?",
          choices: [
            ch("Demander à chaque personne de raconter ses traumatismes en détail dès l'admission, pour bien adapter les soins", "Asking every person to describe their traumas in detail on admission, to tailor care"),
            ch("Tenir compte de traumatismes possibles : prévenir avant tout geste, offrir des choix et éviter les rappels de l'événement", "Allowing for possible trauma: warn before any action, offer choices and avoid reminders of the event", true),
            ch("Réserver les soins aux personnes qui ont un diagnostic de TSPT", "Restricting care to people diagnosed with PTSD"),
            ch("Éviter tout contact avec la personne", "Avoiding all contact with the person")
          ],
          explFr: "Sécurité, prévisibilité, choix et respect du rythme : ces principes protègent toutes les personnes, qu'on connaisse ou non leur histoire.",
          explEn: "Safety, predictability, choice and respect for the person's pace: these principles protect everyone, whether or not their history is known."
        },
        {
          ...scenario(
            "Un usager ayant vécu un événement traumatique sursaute violemment et devient agité lorsqu'une porte claque. Que faites-vous ?",
            "A client who experienced a traumatic event startles violently and becomes agitated when a door slams. What do you do?",
            [
              ch("Lui dire que ce n'est qu'une porte et de se calmer", "Tell him it's just a door and to calm down"),
              ch("Vous approcher calmement, vous nommer, lui rappeler où il est et qu'il est en sécurité", "Approach calmly, say your name, remind him where he is and that he is safe", true),
              ch("Lui toucher rapidement l'épaule par derrière pour le rassurer et lui montrer que vous êtes là", "Quickly touch his shoulder from behind to reassure him and show you're there"),
              ch("Le laisser seul quelques minutes dans un endroit calme et sombre pour qu'il reprenne ses esprits", "Leave him alone for a few minutes in a calm, dark place to collect himself")
            ]),
          explFr: "Un bruit peut déclencher une reviviscence. On s'approche sans le surprendre, on oriente vers l'ici et maintenant, puis on rapporte l'événement à l'infirmière.",
          explEn: "A noise can trigger a flashback. Approach without startling him, orient him to the here and now, then report the event to the nurse."
        },
        {
          ...tf("On parle de trouble de stress post-traumatique lorsque les symptômes persistent plus d'un mois après l'événement.",
                "Post-traumatic stress disorder is considered when symptoms persist for more than a month after the event.", true),
          explFr: "Vrai. Dans le premier mois, on parle plutôt de trouble de stress aigu. Des réactions de stress dans les jours qui suivent un événement grave sont fréquentes.",
          explEn: "True. Within the first month, it is called acute stress disorder. Stress reactions in the days after a serious event are common."
        },
        {
          fr: "Quel signe chez une personne anxieuse doit être rapporté sans délai, car il pourrait cacher un problème physique ?",
          en: "Which sign in an anxious person must be reported without delay because it could hide a physical problem?",
          choices: [
            ch("Une douleur thoracique, un essoufflement important ou un malaise", "Chest pain, significant shortness of breath or feeling faint", true),
            ch("Le fait de poser beaucoup de questions", "Asking a lot of questions"),
            ch("Une inquiétude au sujet de sa famille", "Worry about family"),
            ch("Une difficulté à s'endormir une soirée, après une journée chargée en émotions", "Trouble falling asleep one evening after a very emotional day")
          ],
          explFr: "On ne conclut jamais à de « l'anxiété » sans évaluation : une douleur thoracique ou un essoufflement peut être cardiaque ou respiratoire. L'infirmière doit évaluer.",
          explEn: "Never conclude it's “just anxiety” without assessment: chest pain or shortness of breath may be cardiac or respiratory. The nurse must assess."
        },
        {
          fr: "Lequel de ces comportements peut indiquer qu'une personne tente de gérer son anxiété par un moyen nuisible ?",
          en: "Which of these behaviours may indicate a person is trying to manage anxiety in a harmful way?",
          choices: [
            ch("Faire de la marche chaque jour", "Walking every day"),
            ch("Une consommation accrue d'alcool ou de médicaments non prescrits", "Increased use of alcohol or non-prescribed medication", true),
            ch("Pratiquer la respiration lente", "Practising slow breathing"),
            ch("Parler régulièrement de ses inquiétudes à un proche de confiance ou à un intervenant", "Regularly talking about worries with a trusted loved one or caregiver")
          ],
          explFr: "L'automédication soulage à court terme mais crée d'autres problèmes (dépendance, interactions). On l'observe sans jugement et on la rapporte.",
          explEn: "Self-medication brings short-term relief but creates other problems (dependence, interactions). Observe it without judgment and report it."
        },
        {
          ...scenario(
            "Une usagère vivant avec un TSPT refuse que la porte de sa chambre soit fermée pendant ses soins d'hygiène. Que faites-vous ?",
            "A client living with PTSD refuses to have her door closed during personal care. What do you do?",
            [
              ch("Fermer la porte quand même, c'est la règle pour l'intimité", "Close the door anyway; it's the rule for privacy"),
              ch("Annuler les soins d'hygiène", "Cancel personal care"),
              ch("Respecter sa demande en préservant autrement son intimité (rideau, paravent) et noter ce besoin pour toute l'équipe", "Respect her request while protecting her privacy another way (curtain, screen) and note this need for the whole team", true),
              ch("Lui demander de raconter pourquoi elle a peur des portes fermées afin de l'aider à surmonter cette peur", "Ask her to explain why she's afraid of closed doors to help her overcome the fear")
            ]),
          explFr: "Se sentir enfermée peut raviver le trauma. Offrir du contrôle à la personne fait partie de l'approche sensible au trauma ; on n'exige pas qu'elle se justifie.",
          explEn: "Feeling shut in can revive trauma. Giving the person control is part of trauma-informed care; she doesn't have to justify herself."
        }
      ]
    }
  ]
},

/* ---------- 7. Médication en santé mentale ---------- */
{
  id: "sm_psychotropes", order: 7,
  title_fr: "Médication en santé mentale",
  title_en: "Psychiatric Medication",
  icon: "💊",
  tiers: [
    {
      level: 1,
      theme_fr: "Classes de médicaments et rôle de l'infirmière auxiliaire",
      theme_en: "Drug classes and the LPN's role",
      questions: [
        {
          ...match("Associe chaque classe de médicaments à son usage principal.", "Match each drug class with its main use.", [
            pair("Antipsychotique", "Antipsychotic", "Traite les symptômes psychotiques (hallucinations, idées délirantes)", "Treats psychotic symptoms (hallucinations, delusions)"),
            pair("Antidépresseur", "Antidepressant", "Traite la dépression et certains troubles anxieux", "Treats depression and some anxiety disorders"),
            pair("Régulateur de l'humeur (ex. : lithium)", "Mood stabilizer (e.g. lithium)", "Prévient les rechutes de manie et de dépression dans le trouble bipolaire", "Prevents manic and depressive relapses in bipolar disorder"),
            pair("Anxiolytique (benzodiazépine)", "Anxiolytic (benzodiazepine)", "Soulage l'anxiété aiguë, idéalement à court terme", "Relieves acute anxiety, ideally short term"),
            pair("Hypnotique", "Hypnotic", "Favorise le sommeil", "Promotes sleep"),
            pair("Anticholinergique (ex. : benztropine)", "Anticholinergic (e.g. benztropine)", "Atténue certains effets extrapyramidaux des antipsychotiques", "Reduces some extrapyramidal effects of antipsychotics")
          ]),
          explFr: "Connaître la classe d'un médicament aide à savoir quels effets thérapeutiques et indésirables observer. Les noms et doses exacts se vérifient toujours au dossier.",
          explEn: "Knowing a drug's class helps you know which therapeutic and side effects to watch for. Exact names and doses are always checked in the record."
        },
        {
          fr: "En santé mentale, quel est le rôle de l'infirmière auxiliaire à l'égard de la médication ?",
          en: "In mental health, what is the LPN's role regarding medication?",
          choices: [
            ch("Ajuster la dose selon l'état de la personne, dans les limites indiquées sur l'ordonnance", "Adjust the dose to the person's condition, within the limits on the prescription"),
            ch("Choisir le médicament le mieux toléré", "Choose the best-tolerated medication"),
            ch("Administrer les médicaments prescrits, en observer les effets et les rapporter", "Administer prescribed medication, observe its effects and report them", true),
            ch("Cesser un médicament si la personne va mieux et en aviser ensuite le prescripteur", "Stop a medication if the person is better and inform the prescriber afterwards")
          ],
          explFr: "L'infirmière auxiliaire administre selon l'ordonnance et contribue à la surveillance. Elle ne modifie ni la dose ni le traitement.",
          explEn: "The LPN administers according to the prescription and contributes to monitoring. She does not change the dose or treatment."
        },
        {
          ...tf("Les benzodiazépines (ex. : lorazépam) peuvent causer de la somnolence, augmenter le risque de chute et entraîner une dépendance.",
                "Benzodiazepines (e.g. lorazepam) can cause drowsiness, increase the risk of falls and lead to dependence.", true),
          explFr: "Vrai. La prudence est de mise, surtout chez la personne âgée et en association avec l'alcool ou d'autres sédatifs, qui augmentent la dépression respiratoire.",
          explEn: "True. Caution is needed, especially in older adults and with alcohol or other sedatives, which increase respiratory depression."
        },
        {
          fr: "Quels effets anticholinergiques sont fréquents avec plusieurs psychotropes ?",
          en: "Which anticholinergic effects are common with several psychiatric drugs?",
          choices: [
            ch("Diarrhée, salivation excessive, larmoiement et envies fréquentes d'uriner", "Diarrhea, excessive salivation, watery eyes and frequent urge to urinate"),
            ch("Bouche sèche, constipation, rétention urinaire, vision embrouillée et tachycardie", "Dry mouth, constipation, urinary retention, blurred vision and rapid heart rate", true),
            ch("Perte de cheveux et éruption cutanée", "Hair loss and rash"),
            ch("Hausse de l'appétit seulement", "Increased appetite only")
          ],
          explFr: "Ces effets sont désagréables et peuvent nuire à l'adhésion. Hydratation, fibres et surveillance de l'élimination font partie des soins ; une rétention urinaire se rapporte.",
          explEn: "These effects are unpleasant and can affect adherence. Hydration, fibre and monitoring elimination are part of care; urinary retention is reported."
        },
        {
          ...tf("Un antidépresseur peut être cessé brusquement dès que la personne se sent mieux.",
                "An antidepressant can be stopped abruptly as soon as the person feels better.", false),
          explFr: "Faux. Un arrêt brusque peut provoquer des symptômes d'arrêt (étourdissements, irritabilité, malaises) et favoriser une rechute. L'arrêt se planifie avec le prescripteur.",
          explEn: "False. Stopping abruptly can cause discontinuation symptoms (dizziness, irritability, discomfort) and promote relapse. Stopping is planned with the prescriber."
        },
        {
          fr: "Plusieurs antipsychotiques peuvent causer une hypotension orthostatique. Quel conseil donner à la personne ?",
          en: "Several antipsychotics can cause orthostatic hypotension. What advice should you give the person?",
          choices: [
            ch("Se lever lentement, en s'assoyant d'abord au bord du lit", "Get up slowly, sitting on the edge of the bed first", true),
            ch("Se lever rapidement d'un seul mouvement pour activer la circulation", "Get up quickly in one movement to activate circulation"),
            ch("Rester couché toute la journée", "Stay in bed all day"),
            ch("Boire moins d'eau", "Drink less water")
          ],
          explFr: "Se lever par étapes laisse à la pression le temps de s'ajuster et prévient les chutes. Des étourdissements fréquents se rapportent à l'infirmière.",
          explEn: "Getting up in stages gives blood pressure time to adjust and prevents falls. Frequent dizziness is reported to the nurse."
        }
      ]
    },
    {
      level: 2,
      theme_fr: "Effets indésirables graves : reconnaître et rapporter",
      theme_en: "Serious side effects: recognize and report",
      questions: [
        {
          ...match("Associe chaque effet extrapyramidal à sa description.", "Match each extrapyramidal effect with its description.", [
            pair("Dystonie aiguë", "Acute dystonia", "Contractions musculaires soudaines et douloureuses (cou, yeux, mâchoire), souvent en début de traitement", "Sudden, painful muscle contractions (neck, eyes, jaw), often early in treatment"),
            pair("Akathisie", "Akathisia", "Besoin intense de bouger, incapacité à rester en place", "Intense need to move, inability to stay still"),
            pair("Parkinsonisme", "Parkinsonism", "Tremblements, rigidité, démarche à petits pas, visage figé", "Tremor, rigidity, shuffling gait, mask-like face"),
            pair("Dyskinésie tardive", "Tardive dyskinesia", "Mouvements involontaires de la bouche, de la langue ou du visage après un usage prolongé, parfois irréversibles", "Involuntary movements of the mouth, tongue or face after long-term use, sometimes irreversible")
          ]),
          explFr: "Ces effets touchent le contrôle des mouvements. Ils sont à observer et à rapporter : certains se traitent rapidement, d'autres demandent de revoir la médication.",
          explEn: "These effects involve movement control. They must be observed and reported: some are treated quickly, others require reviewing the medication."
        },
        {
          fr: "Quel ensemble de signes doit faire penser au syndrome malin des neuroleptiques, une urgence médicale ?",
          en: "Which set of signs should suggest neuroleptic malignant syndrome, a medical emergency?",
          choices: [
            ch("Bouche sèche, légère constipation et vision un peu embrouillée en fin de journée", "Dry mouth, mild constipation and slightly blurred vision at the end of the day"),
            ch("Prise de poids progressive, hausse de la glycémie et du cholestérol sur plusieurs mois", "Gradual weight gain and rising blood sugar and cholesterol over several months"),
            ch("Forte fièvre, rigidité musculaire importante, confusion et pression instable", "High fever, severe muscle rigidity, confusion and unstable blood pressure", true),
            ch("Légère somnolence le matin", "Mild drowsiness in the morning")
          ],
          explFr: "Ce syndrome rare peut être mortel. Devant ces signes chez une personne sous antipsychotique, on avise immédiatement l'infirmière et on prend les signes vitaux selon le protocole.",
          explEn: "This rare syndrome can be fatal. With these signs in a person on an antipsychotic, notify the nurse immediately and take vital signs per protocol."
        },
        {
          fr: "Quels signes évoquent un syndrome sérotoninergique, qui peut survenir notamment lors de la combinaison de médicaments augmentant la sérotonine ?",
          en: "Which signs suggest serotonin syndrome, which can occur especially when combining drugs that increase serotonin?",
          choices: [
            ch("Ralentissement, somnolence, hypothermie, pouls lent et constipation importante", "Slowing, drowsiness, hypothermia, slow pulse and severe constipation"),
            ch("Agitation, confusion, sudation, tachycardie, fièvre, tremblements et secousses musculaires", "Agitation, confusion, sweating, rapid heart rate, fever, tremor and muscle jerks", true),
            ch("Bouche sèche isolée", "Isolated dry mouth"),
            ch("Prise de poids lente", "Slow weight gain")
          ],
          explFr: "Il apparaît souvent dans les heures suivant un ajout ou une hausse de dose. C'est une situation à rapporter sans délai.",
          explEn: "It often appears within hours of adding a drug or increasing a dose. It must be reported without delay."
        },
        {
          ...scenario(
            "Une usagère sous antidépresseur (ISRS) a commencé de son côté un produit naturel à base de millepertuis. Elle devient agitée, transpire beaucoup et tremble. Que faites-vous ?",
            "A client on an antidepressant (SSRI) has started taking a St. John's wort herbal product on her own. She becomes agitated, sweats heavily and is shaking. What do you do?",
            [
              ch("Lui conseiller de cesser le millepertuis d'elle-même et de boire beaucoup d'eau, puis attendre au lendemain", "Advise her to stop the St. John's wort herself and drink plenty of water, then wait until tomorrow"),
              ch("Attendre au lendemain pour voir si ça passe", "Wait until tomorrow to see if it passes"),
              ch("Rapporter sans délai les signes et le produit naturel à l'infirmière : un syndrome sérotoninergique est possible", "Report the signs and the herbal product to the nurse without delay: serotonin syndrome is possible", true),
              ch("Lui donner un café pour la ramener", "Give her a coffee to bring her round")
            ]),
          explFr: "Les produits naturels peuvent interagir avec les médicaments. Toujours demander et rapporter ce que la personne prend en plus de sa médication prescrite.",
          explEn: "Herbal products can interact with medications. Always ask about and report what the person takes in addition to prescribed medication."
        },
        {
          fr: "Quel facteur peut faire augmenter dangereusement le taux de lithium dans le sang ?",
          en: "Which factor can dangerously raise blood lithium levels?",
          choices: [
            ch("Boire de l'eau régulièrement", "Drinking water regularly"),
            ch("La déshydratation (vomissements, diarrhée, forte chaleur) ou une forte baisse de sel", "Dehydration (vomiting, diarrhea, extreme heat) or a sharp drop in salt", true),
            ch("Prendre le lithium pendant un repas riche en sel, ce qui ralentit son élimination", "Taking lithium with a salty meal, which slows its elimination"),
            ch("Faire une marche quotidienne", "Taking a daily walk")
          ],
          explFr: "Le lithium a une marge thérapeutique étroite et son élimination dépend de l'eau et du sodium. Certains médicaments (ex. : anti-inflammatoires, diurétiques) peuvent aussi en augmenter le taux.",
          explEn: "Lithium has a narrow therapeutic range and its elimination depends on water and sodium. Some drugs (e.g. anti-inflammatories, diuretics) can also raise its level."
        },
        {
          ...tf("Un léger tremblement fin des mains et une soif accrue peuvent être des effets courants du lithium, alors que des tremblements grossiers, de la diarrhée et une démarche instable peuvent signaler une toxicité.",
                "A slight fine hand tremor and increased thirst can be common effects of lithium, whereas coarse tremors, diarrhea and unsteady gait may signal toxicity.", true),
          explFr: "Vrai. Savoir distinguer l'effet courant du signe d'alerte permet de rapporter à temps. Les dosages sanguins (lithémie) servent à surveiller le taux.",
          explEn: "True. Telling a common effect from a warning sign allows timely reporting. Blood tests (lithium levels) are used to monitor the level."
        }
      ]
    },
    {
      level: 3,
      theme_fr: "Adhésion au traitement, surveillance et jugement clinique",
      theme_en: "Treatment adherence, monitoring and clinical judgment",
      questions: [
        {
          fr: "Parmi ces raisons, laquelle explique souvent qu'une personne cesse sa médication psychiatrique ?",
          en: "Which of these reasons often explains why a person stops their psychiatric medication?",
          choices: [
            ch("Des effets indésirables pénibles (poids, somnolence) ou le sentiment de ne pas être malade", "Unpleasant side effects (weight, drowsiness) or feeling they are not ill", true),
            ch("Le goût trop agréable des comprimés", "The pills taste too good"),
            ch("Un suivi trop rapproché avec l'équipe, qui rend la personne trop dépendante de ses intervenants", "Follow-up with the team that is too frequent, making the person too dependent on caregivers"),
            ch("Le manque de choix de couleurs des comprimés", "Not enough pill colour options")
          ],
          explFr: "Comprendre la raison de la non-adhésion permet d'y répondre : un effet indésirable rapporté peut mener à un ajustement par le prescripteur.",
          explEn: "Understanding the reason for non-adherence makes it possible to address it: a reported side effect may lead the prescriber to adjust treatment."
        },
        {
          fr: "Pourquoi surveille-t-on le poids, la glycémie et le tour de taille d'une personne sous certains antipsychotiques de deuxième génération ?",
          en: "Why are weight, blood sugar and waist circumference monitored in a person on certain second-generation antipsychotics?",
          choices: [
            ch("Parce qu'ils causent souvent une perte d'appétit et une perte de poids importante à surveiller", "Because they often cause loss of appetite and significant weight loss to watch for"),
            ch("Parce qu'ils peuvent causer un syndrome métabolique (poids, diabète, cholestérol)", "Because they can cause metabolic syndrome (weight, diabetes, cholesterol)", true),
            ch("Seulement pour calculer la dose du lendemain", "Only to calculate the next day's dose"),
            ch("Parce que la loi exige ces mesures pour tous les médicaments administrés en psychiatrie", "Because the law requires these measures for all medications given in psychiatry")
          ],
          explFr: "Ces effets augmentent le risque cardiovasculaire. Peser régulièrement, encourager une saine alimentation et l'activité, et rapporter les changements fait partie du suivi.",
          explEn: "These effects increase cardiovascular risk. Regular weighing, encouraging healthy eating and activity, and reporting changes are part of follow-up."
        },
        {
          ...scenario(
            "Un usager traité à la clozapine vous dit qu'il a mal à la gorge et il fait de la fièvre. Que faites-vous ?",
            "A client taking clozapine tells you he has a sore throat and he has a fever. What do you do?",
            [
              ch("Lui offrir une pastille et attendre quelques jours", "Offer him a lozenge and wait a few days"),
              ch("Rapporter sans délai à l'infirmière : la clozapine peut faire chuter les globules blancs et favoriser une infection", "Report to the nurse without delay: clozapine can lower white blood cells and favour infection", true),
              ch("Cesser vous-même la clozapine", "Stop the clozapine yourself"),
              ch("Noter l'information au dossier et la transmettre à l'infirmière au rapport de fin de quart, sans urgence", "Note it in the record and pass it to the nurse at end-of-shift report, without urgency")
            ]),
          explFr: "La clozapine exige des prises de sang régulières en raison du risque d'agranulocytose. Fièvre et mal de gorge sont des signes d'alerte à transmettre immédiatement.",
          explEn: "Clozapine requires regular blood tests because of the risk of agranulocytosis. Fever and sore throat are warning signs to pass on immediately."
        },
        {
          ...tf("Pour favoriser l'adhésion, il est acceptable de cacher un médicament dans la nourriture d'une personne sans qu'elle le sache, si on croit que c'est pour son bien.",
                "To promote adherence, it is acceptable to hide medication in a person's food without their knowledge if you believe it's for their own good.", false),
          explFr: "Faux. Administrer un médicament à l'insu de la personne porte atteinte à son droit de consentir aux soins. On rapporte plutôt le refus à l'infirmière ; seule l'équipe, dans le cadre légal, peut décider de la suite.",
          explEn: "False. Giving medication without the person's knowledge violates their right to consent to care. Report the refusal to the nurse instead; only the team, within the legal framework, can decide what comes next."
        },
        {
          fr: "Quel avantage offre un antipsychotique injectable à action prolongée ?",
          en: "What is the benefit of a long-acting injectable antipsychotic?",
          choices: [
            ch("Il n'a jamais d'effets indésirables", "It never has side effects"),
            ch("Il assure une médication régulière sur plusieurs semaines, utile si les comprimés sont difficiles", "It provides steady medication over several weeks, useful when pills are difficult", true),
            ch("Il guérit définitivement la maladie", "It permanently cures the illness"),
            ch("Il remplace les rendez-vous de suivi avec l'équipe, puisque la dose est assurée pour plusieurs semaines", "It replaces follow-up appointments with the team, since the dose is covered for several weeks")
          ],
          explFr: "L'injection aux deux à quatre semaines (selon le produit) réduit les oublis et les rechutes. Une injection manquée est une information importante à rapporter.",
          explEn: "Injection every two to four weeks (depending on the product) reduces missed doses and relapses. A missed injection is important information to report."
        },
        {
          ...scenario(
            "Une usagère vous confie qu'elle garde ses comprimés dans sa joue et les recrache plus tard. Que faites-vous ?",
            "A client tells you she keeps her pills in her cheek and spits them out later. What do you do?",
            [
              ch("Lui promettre de garder le secret pour préserver sa confiance, à condition qu'elle recommence à avaler ses comprimés dès demain matin", "Promise to keep it secret to preserve her trust, on condition she starts swallowing her pills again tomorrow morning"),
              ch("La gronder devant les autres usagers", "Scold her in front of other clients"),
              ch("Explorer ses raisons sans la blâmer, rapporter à l'infirmière et, selon le plan de soins, s'assurer que les comprimés sont bien avalés", "Explore her reasons without blame, report to the nurse and, per the care plan, make sure the pills are actually swallowed", true),
              ch("Doubler sa dose pour compenser", "Double her dose to make up for it")
            ]),
          explFr: "Le traitement n'est pas pris comme prévu : l'équipe doit le savoir pour comprendre l'évolution et adapter le plan. Les raisons de la personne (effets indésirables, peur) sont tout aussi importantes.",
          explEn: "Treatment isn't being taken as planned: the team needs to know to understand the person's progress and adapt the plan. The person's reasons (side effects, fear) are just as important."
        }
      ]
    }
  ]
},

/* ---------- 8. Crise et sécurité ---------- */
{
  id: "sm_crise", order: 8,
  title_fr: "Crise et sécurité",
  title_en: "Crisis and Safety",
  icon: "🛡️",
  tiers: [
    {
      level: 1,
      theme_fr: "Reconnaître l'escalade et désamorcer l'agressivité",
      theme_en: "Recognizing escalation and defusing aggression",
      questions: [
        {
          fr: "Lequel de ces signes annonce souvent une montée de l'agressivité ?",
          en: "Which of these signs often signals rising aggression?",
          choices: [
            ch("Bâillements fréquents", "Frequent yawning"),
            ch("Poings serrés, voix qui monte, va-et-vient, regard fixe", "Clenched fists, rising voice, pacing, fixed stare", true),
            ch("Demande d'une collation", "Asking for a snack"),
            ch("Retrait calme dans sa chambre pour lire ou écouter de la musique", "Quietly withdrawing to their room to read or listen to music")
          ],
          explFr: "Repérer tôt les signes précurseurs permet d'intervenir pendant que la personne peut encore être rejointe par la parole.",
          explEn: "Spotting warning signs early allows intervention while the person can still be reached through words."
        },
        {
          ...match("Associe chaque phase du cycle de l'agressivité à sa description.", "Match each phase of the aggression cycle with its description.", [
            pair("Déclencheur", "Trigger", "Événement ou frustration qui amorce la réaction", "Event or frustration that sets off the reaction"),
            pair("Escalade", "Escalation", "La tension monte : agitation, voix forte, menaces verbales", "Tension rises: agitation, loud voice, verbal threats"),
            pair("Crise", "Crisis", "Perte de contrôle, risque de geste violent", "Loss of control, risk of violent action"),
            pair("Récupération", "Recovery", "Retour progressif au calme ; la tension reste fragile", "Gradual return to calm; tension remains fragile"),
            pair("Après-crise", "Post-crisis", "Fatigue, parfois honte ou remords ; moment propice à un retour sur l'événement", "Fatigue, sometimes shame or remorse; good time to debrief the event")
          ]),
          explFr: "Chaque phase appelle une intervention différente : prévenir au déclencheur, désamorcer à l'escalade, protéger en crise, soutenir après.",
          explEn: "Each phase calls for a different intervention: prevent at the trigger, defuse during escalation, protect during the crisis, support afterwards."
        },
        {
          fr: "Quelle posture favorise la désescalade ?",
          en: "Which posture promotes de-escalation?",
          choices: [
            ch("Se placer bien en face de la personne, bras croisés, pour garder une posture stable", "Stand squarely in front of the person, arms crossed, to keep a stable stance"),
            ch("Se placer de biais, mains visibles et ouvertes, à distance sécuritaire", "Stand sideways, hands visible and open, at a safe distance", true),
            ch("S'approcher très près, face à face, pour montrer calmement qu'on n'a pas peur", "Move in very close, face to face, to calmly show you're not afraid"),
            ch("Pointer la personne du doigt en parlant", "Pointing at the person while speaking")
          ],
          explFr: "Une posture de biais et des mains visibles sont perçues comme moins menaçantes, tout en protégeant l'intervenant. Les bras croisés et le doigt pointé sont vus comme hostiles.",
          explEn: "A sideways stance and visible hands are seen as less threatening while protecting the caregiver. Crossed arms and pointing are seen as hostile."
        },
        {
          ...tf("Pendant la désescalade, il est préférable que plusieurs intervenants parlent en même temps à la personne pour la convaincre plus vite.",
                "During de-escalation, it is better for several caregivers to talk to the person at the same time to convince them faster.", false),
          explFr: "Faux. Une seule personne parle, les autres restent en soutien à distance. Plusieurs voix à la fois augmentent la confusion et le sentiment d'être acculé.",
          explEn: "False. One person speaks; the others stay in support at a distance. Several voices at once increase confusion and the feeling of being cornered."
        },
        {
          fr: "Quelle formulation favorise le mieux la désescalade ?",
          en: "Which statement best promotes de-escalation?",
          choices: [
            ch("« Je vous demande de vous calmer tout de suite, sinon je vais devoir appeler la sécurité. »", "“I'm asking you to calm down right now, otherwise I'll have to call security.”"),
            ch("« Vous n'avez aucune raison d'être fâché. »", "“You have no reason to be upset.”"),
            ch("« Je vois que vous êtes en colère. Voulez-vous en parler dans un endroit plus calme ? »", "“I can see you're angry. Would you like to talk about it somewhere quieter?”", true),
            ch("« Si vous continuez, vous n'aurez pas votre sortie. »", "“If you keep this up, you won't get your outing.”")
          ],
          explFr: "Nommer l'émotion et offrir des choix redonne du contrôle à la personne. Les ordres, les menaces et la négation de l'émotion font souvent monter la tension.",
          explEn: "Naming the emotion and offering choices gives the person back some control. Orders, threats and denying the emotion often raise tension."
        },
        {
          ...tf("Des besoins de base non comblés (faim, douleur, manque de sommeil, longue attente) peuvent contribuer à l'agressivité, et y répondre peut prévenir une crise.",
                "Unmet basic needs (hunger, pain, lack of sleep, long waits) can contribute to aggression, and addressing them can prevent a crisis.", true),
          explFr: "Vrai. Avant de voir un « comportement », on cherche un besoin. Soulager une douleur ou expliquer un délai suffit parfois à désamorcer la situation.",
          explEn: "True. Before seeing a “behaviour”, look for a need. Relieving pain or explaining a delay is sometimes enough to defuse the situation."
        }
      ]
    },
    {
      level: 2,
      theme_fr: "Risque suicidaire : reconnaître et agir",
      theme_en: "Suicide risk: recognize and act",
      questions: [
        {
          fr: "Lequel de ces éléments est un facteur de risque suicidaire important à connaître et à rapporter ?",
          en: "Which of these is an important suicide risk factor to know and report?",
          choices: [
            ch("Une routine quotidienne stable", "A stable daily routine"),
            ch("Une tentative de suicide antérieure", "A previous suicide attempt", true),
            ch("Un bon réseau de soutien", "A good support network"),
            ch("La participation aux activités de l'unité", "Taking part in unit activities")
          ],
          explFr: "Une tentative antérieure est l'un des facteurs de risque les plus importants. Les trois autres choix sont plutôt des facteurs de protection.",
          explEn: "A previous attempt is one of the most important risk factors. The other three choices are protective factors."
        },
        {
          ...scenario(
            "Un usager déprimé, très renfermé depuis des jours, paraît soudainement calme et souriant et donne ses objets personnels à d'autres usagers. Que faites-vous ?",
            "A depressed client, very withdrawn for days, suddenly seems calm and smiling and is giving his belongings to other clients. What do you do?",
            [
              ch("Vous réjouir : il va visiblement mieux", "Be glad: he's clearly better"),
              ch("Y voir des signes d'alerte possibles, rester attentif à sa sécurité et aviser immédiatement l'infirmière", "See possible warning signs, stay attentive to his safety and notify the nurse immediately", true),
              ch("Lui demander gentiment de reprendre ses objets, puis noter au dossier que son humeur s'est nettement améliorée", "Kindly ask him to take his belongings back, then record that his mood has clearly improved"),
              ch("En parler à la prochaine réunion d'équipe", "Bring it up at the next team meeting")
            ]),
          explFr: "Un calme soudain après une période de détresse et le fait de donner ses biens peuvent signaler qu'une décision a été prise. On agit tout de suite, sans attendre.",
          explEn: "Sudden calm after a period of distress and giving away belongings may signal that a decision has been made. Act right away, without waiting."
        },
        {
          ...tf("Une personne qui parle de suicide ne passe jamais à l'acte : c'est surtout une façon d'attirer l'attention.",
                "A person who talks about suicide never acts on it: it's mainly a way to get attention.", false),
          explFr: "Faux. C'est un mythe dangereux. Beaucoup de personnes qui se sont enlevé la vie en avaient parlé. Tout propos suicidaire est pris au sérieux et rapporté.",
          explEn: "False. This is a dangerous myth. Many people who died by suicide had talked about it. Every suicidal statement is taken seriously and reported."
        },
        {
          fr: "Lequel de ces éléments est un facteur de protection face au suicide ?",
          en: "Which of these is a protective factor against suicide?",
          choices: [
            ch("L'isolement social", "Social isolation"),
            ch("Un lien de confiance avec des proches ou des intervenants", "A trusting bond with loved ones or caregivers", true),
            ch("La consommation d'alcool", "Alcohol use"),
            ch("Une perte récente importante, comme un deuil ou une rupture amoureuse", "A recent major loss, such as a bereavement or a breakup")
          ],
          explFr: "Le lien, l'espoir et l'accès à l'aide protègent. Votre présence et votre écoute contribuent à ce lien.",
          explEn: "Connection, hope and access to help are protective. Your presence and listening contribute to that connection."
        },
        {
          fr: "Au Québec, vers quelle ressource peut-on diriger une personne en détresse ou un proche inquiet, en tout temps ?",
          en: "In Quebec, which resource can a person in distress or a worried loved one be referred to at any time?",
          choices: [
            ch("Aucune : il faut attendre un rendez-vous médical", "None: they must wait for a medical appointment"),
            ch("La ligne de prévention du suicide (1 866 APPELLE) ou le 9-8-8", "The suicide prevention line (1-866-APPELLE) or 9-8-8", true),
            ch("Un forum en ligne anonyme seulement", "Only an anonymous online forum"),
            ch("Le commissaire aux plaintes de l'établissement, pendant les heures de bureau", "The facility's complaints commissioner, during office hours")
          ],
          explFr: "Ces lignes sont gratuites et accessibles jour et nuit. En cas de danger immédiat, on compose le 9-1-1. À l'unité, on avise d'abord l'infirmière.",
          explEn: "These lines are free and available day and night. In case of immediate danger, call 9-1-1. On the unit, notify the nurse first."
        },
        {
          fr: "Selon le protocole de l'établissement, quelle mesure de sécurité de l'environnement est appropriée auprès d'une personne à risque suicidaire ?",
          en: "According to facility protocol, which environmental safety measure is appropriate for a person at risk of suicide?",
          choices: [
            ch("Lui laisser tous ses objets pour ne pas la frustrer", "Leave all her belongings so as not to frustrate her"),
            ch("Fermer sa porte pour qu'elle se repose sans être dérangée", "Close her door so she can rest undisturbed"),
            ch("Retirer les objets pouvant servir à se blesser et assurer la surveillance prescrite", "Remove objects that could be used for self-harm and provide the prescribed supervision", true),
            ch("Réduire les passages de l'équipe dans sa chambre pour respecter son intimité et son repos", "Reduce staff check-ins in her room to respect her privacy and rest")
          ],
          explFr: "Un environnement sécuritaire et la surveillance prévue au plan réduisent le risque. On explique ces mesures à la personne avec respect.",
          explEn: "A safe environment and the supervision set in the plan reduce risk. Explain these measures to the person respectfully."
        }
      ]
    },
    {
      level: 3,
      theme_fr: "Mesures de contrôle et cadre légal au Québec",
      theme_en: "Control measures and the legal framework in Quebec",
      questions: [
        {
          fr: "Au Québec, la loi P-38 (Loi sur la protection des personnes dont l'état mental présente un danger pour elles-mêmes ou pour autrui) permet notamment :",
          en: "In Quebec, Act P-38 (Act respecting the protection of persons whose mental state presents a danger to themselves or to others) notably allows:",
          choices: [
            ch("D'imposer n'importe quel traitement à toute personne hospitalisée en psychiatrie, sans autre autorisation", "Imposing any treatment on anyone hospitalized in psychiatry, with no other authorization"),
            ch("De garder une personne en établissement contre son gré lorsque son état mental présente un danger", "Keeping a person in a facility against their will when their mental state presents a danger", true),
            ch("D'isoler une personne pour la punir", "Secluding a person as punishment"),
            ch("De partager son dossier avec sa famille sans restriction", "Sharing their record with family without restriction")
          ],
          explFr: "La P-38 encadre la garde en établissement (préventive, provisoire, autorisée par le tribunal). Elle protège la personne et autrui, tout en limitant les atteintes à ses droits.",
          explEn: "P-38 governs confinement in a facility (preventive, provisional, court-authorized). It protects the person and others while limiting infringements on their rights."
        },
        {
          ...tf("En garde préventive, une personne peut être gardée sans son consentement et sans autorisation du tribunal pendant au plus 72 heures, lorsque son état mental présente un danger grave et immédiat.",
                "Under preventive confinement, a person can be held without consent and without court authorization for at most 72 hours, when their mental state presents a serious and immediate danger.", true),
          explFr: "Vrai. Au-delà de 72 heures, une autorisation du tribunal est nécessaire. Cette mesure exceptionnelle est décidée par un médecin de l'établissement.",
          explEn: "True. Beyond 72 hours, court authorization is required. This exceptional measure is decided by a physician of the facility."
        },
        {
          ...tf("Une personne sous garde en établissement peut, de ce seul fait, recevoir n'importe quel traitement sans son consentement.",
                "A person under confinement in a facility can, for that reason alone, receive any treatment without consent.", false),
          explFr: "Faux. La garde permet de garder la personne, pas de la traiter contre son gré. Le consentement aux soins demeure requis ; sinon, une autorisation distincte du tribunal est nécessaire.",
          explEn: "False. Confinement allows the person to be kept, not treated against their will. Consent to care is still required; otherwise, a separate court authorization is needed."
        },
        {
          fr: "Selon la loi québécoise sur les services de santé et les services sociaux (article 118.1), laquelle de ces interventions est une mesure de contrôle ?",
          en: "Under Quebec's Act respecting health services and social services (section 118.1), which of these interventions is a control measure?",
          choices: [
            ch("Une marche accompagnée", "An accompanied walk"),
            ch("Une discussion dans un endroit calme, à l'écart des autres usagers, avec un intervenant", "A conversation with a caregiver in a quiet place, away from other clients"),
            ch("L'utilisation d'un médicament (substance chimique) pour maîtriser le comportement", "Using a medication (chemical substance) to control behaviour", true),
            ch("L'offre d'une activité de détente", "Offering a relaxation activity")
          ],
          explFr: "La loi reconnaît trois mesures de contrôle : la contention, l'isolement et les substances chimiques. Elles sont minimales, exceptionnelles et encadrées par un protocole.",
          explEn: "The law recognizes three control measures: restraint, seclusion and chemical substances. They are minimal, exceptional and governed by a protocol."
        },
        {
          ...scenario(
            "Un usager est sous contention à la suite d'une décision de l'équipe. Pendant votre surveillance, que devez-vous faire ?",
            "A client is under restraint following a team decision. During your monitoring, what must you do?",
            [
              ch("Le vérifier seulement à la fin du quart pour ne pas le stimuler", "Check on him only at the end of the shift to avoid stimulating him"),
              ch("Surveiller étroitement selon le protocole : état général, circulation, peau, besoins de base, et consigner", "Monitor closely per protocol: general condition, circulation, skin, basic needs, and document", true),
              ch("Ajuster vous-même les attaches pour qu'elles soient plus serrées, puis espacer les visites pour ne pas le stimuler", "Tighten the restraints yourself, then space out visits so as not to stimulate him"),
              ch("Éviter de lui parler pendant toute la durée de la mesure", "Avoid talking to him for the entire duration of the measure")
            ]),
          explFr: "La contention comporte des risques (blessure, circulation, détresse). La surveillance, la réponse aux besoins et la documentation sont obligatoires, et on vise à la retirer dès que possible.",
          explEn: "Restraint carries risks (injury, circulation, distress). Monitoring, meeting needs and documentation are mandatory, and the goal is to remove it as soon as possible."
        },
        {
          fr: "Une personne sous garde en établissement conserve des droits. Lequel est juste ?",
          en: "A person under confinement in a facility keeps certain rights. Which is correct?",
          choices: [
            ch("Elle perd tous ses droits pendant la garde", "She loses all her rights during confinement"),
            ch("Elle doit être informée de ses droits et peut communiquer avec ses proches et un avocat", "She must be informed of her rights and may communicate with loved ones and a lawyer", true),
            ch("Elle peut recevoir des visites, mais seulement de sa famille immédiate et avec l'accord du médecin traitant", "She may have visitors, but only immediate family and with the attending physician's approval"),
            ch("Elle ne peut jamais contester la garde", "She can never challenge the confinement")
          ],
          explFr: "La personne sous garde garde ses droits fondamentaux : être informée, communiquer avec ses proches et un avocat, et contester la décision devant le Tribunal administratif du Québec.",
          explEn: "A person under confinement retains fundamental rights: to be informed, to communicate with loved ones and a lawyer, and to challenge the decision before Quebec's Administrative Tribunal."
        }
      ]
    }
  ]
}

];
/* ---- Textes de l'interface (bilingue) ---- */
const UI_TEXT = {
  fr: {
    appName: "SantéMentaleQuest",
    tagline: "Deviens un pro de l'approche en santé mentale",
    start: "Commencer l'aventure",
    yourName: "Ton prénom",
    chooseAvatar: "Choisis ton avatar",
    map: "Mon parcours",
    badges: "Badges",
    trophies: "Trophées",
    leaderboard: "Palmarès",
    profile: "Profil",
    level: "Niveau",
    xp: "XP",
    locked: "Verrouillé",
    completeToUnlock: "Termine le palier précédent pour déverrouiller",
    startQuest: "Démarrer la quête",
    retryQuest: "Reprendre la quête",
    question: "Question",
    of: "sur",
    submit: "Valider",
    next: "Suivant",
    finish: "Terminer",
    correct: "Bonne réponse!",
    incorrect: "Ce n'est pas ça...",
    questResult: "Résultat de la quête",
    score: "Score",
    passed: "Quête réussie! 🎉",
    failed: "Pas encore réussi — réessaie pour débloquer le palier suivant (seuil: 70%)",
    backToMap: "Retour à la carte",
    newBadge: "Nouveau badge!",
    newTrophy: "Nouveau trophée!",
    hours: "heures",
    switchLang: "EN",
    privacy: "Confidentialité",
    resetProgress: "Réinitialiser tout",
    confirmReset: "Tout réinitialiser? Ton avatar, tes badges, trophées et toute ta progression seront effacés. Cette action est irréversible.",
    installApp: "Installer l'application",
    rank: "Rang",
    you: "Toi",
    leaderboardNote: "Classement local (démo) — un vrai palmarès de classe nécessite un serveur partagé.",
    completedQuests: "quêtes complétées",
    chooseVehicle: "Choisis ta machine",
    myVehicle: "Ta machine",
    vehicleGrows: "Évolue avec ton expérience",
    maxSize: "Forme ultime atteinte !",
    trueLabel: "Vrai",
    falseLabel: "Faux",
    tfPrompt: "Vrai ou faux?",
    masteredLabel: "compétences maîtrisées",
    tiersDoneLabel: "paliers réussis",
    tierLabel: "Palier",
    year1Label: "1re année",
    year2Label: "2e année",
    matchPrompt: "Touche un terme, puis sa définition qui correspond.",
    scenarioLabel: "Mise en situation",
    masteryUnlocked: "Compétence maîtrisée — badge débloqué!",
    accessCodeTitle: "Code d'accès",
    accessCodePrompt: "Entre le code d'accès fourni par ton enseignant pour continuer.",
    accessCodeTrialOver: "Ton essai gratuit de 7 jours est terminé. Entre le code d'accès fourni par ton centre de formation pour continuer.",
    accessCodePlaceholder: "Code d'accès",
    accessCodeSubmit: "Valider",
    accessCodeChecking: "Vérification...",
    accessCodeInvalid: "Code invalide ou inactif. Vérifie auprès de ton enseignante ou de ton enseignant.",
    accessCodeOffline: "Connexion Internet requise pour valider ton code la première fois. Réessaie une fois connecté.",
    accessCodeNotConfigured: "L'application n'est pas encore configurée. Contacte ton enseignant.",
    welcomeHeading: "Comment ça marche",
    welcomeIntro: "Avant de commencer, voici un survol rapide de l'application.",
    welcomeSteps: [
      { icon: "🧠", title: "Huit compétences, trois paliers", text: "L'approche en santé mentale (compétence 20), puis les grands troubles : schizophrénie, psychose, troubles de la personnalité, de l'humeur et anxieux, médication, crise et sécurité. Chaque compétence se traverse en trois paliers de plus en plus exigeants." },
      { icon: "📝", title: "Questions", text: "Choix multiples, vrai/faux, associations de termes et mises en situation cliniques de relation d'aide et de gestion de crise." },
      { icon: "🎖️", title: "Badges", text: "Réussis le palier Avancé d'une compétence à 70% ou plus pour décrocher son badge de maîtrise." },
      { icon: "🏆", title: "Trophées", text: "Décroche des trophées spéciaux pour tes exploits et ta progression." },
      { icon: "📊", title: "Palmarès", text: "Compare ton avancement avec celui du reste de la classe." },
      { icon: "🐉", title: "Ton avatar", text: "Choisis ton avatar — il évolue à mesure que tu gagnes de l'expérience." }
    ]
  },
  en: {
    appName: "SantéMentaleQuest",
    tagline: "Become a pro in the mental health approach",
    start: "Start the adventure",
    yourName: "Your first name",
    chooseAvatar: "Choose your avatar",
    map: "My path",
    badges: "Badges",
    trophies: "Trophies",
    leaderboard: "Leaderboard",
    profile: "Profile",
    level: "Level",
    xp: "XP",
    locked: "Locked",
    completeToUnlock: "Complete the previous tier to unlock",
    startQuest: "Start quest",
    retryQuest: "Retry quest",
    question: "Question",
    of: "of",
    submit: "Submit",
    next: "Next",
    finish: "Finish",
    correct: "Correct!",
    incorrect: "Not quite...",
    questResult: "Quest Result",
    score: "Score",
    passed: "Quest passed! 🎉",
    failed: "Not passed yet — try again to unlock the next tier (threshold: 70%)",
    backToMap: "Back to map",
    newBadge: "New badge!",
    newTrophy: "New trophy!",
    hours: "hours",
    switchLang: "FR",
    privacy: "Privacy",
    resetProgress: "Reset everything",
    confirmReset: "Reset everything? Your avatar, badges, trophies and all progress will be erased. This cannot be undone.",
    installApp: "Install the app",
    rank: "Rank",
    you: "You",
    leaderboardNote: "Local (demo) ranking — a real class leaderboard needs a shared server.",
    completedQuests: "quests completed",
    chooseVehicle: "Choose your machine",
    myVehicle: "Your machine",
    vehicleGrows: "Evolves with your experience",
    maxSize: "Ultimate form reached!",
    trueLabel: "True",
    falseLabel: "False",
    tfPrompt: "True or false?",
    masteredLabel: "competencies mastered",
    tiersDoneLabel: "tiers passed",
    tierLabel: "Tier",
    year1Label: "Year 1",
    year2Label: "Year 2",
    matchPrompt: "Tap a term, then its matching definition.",
    scenarioLabel: "Scenario",
    masteryUnlocked: "Competency mastered — badge unlocked!",
    accessCodeTitle: "Access code",
    accessCodePrompt: "Enter the access code given by your teacher to continue.",
    accessCodeTrialOver: "Your free 7-day trial has ended. Enter the access code provided by your training center to continue.",
    accessCodePlaceholder: "Access code",
    accessCodeSubmit: "Submit",
    accessCodeChecking: "Checking...",
    accessCodeInvalid: "Invalid or inactive code. Check with your teacher.",
    accessCodeOffline: "Internet connection required to validate your code the first time. Try again once connected.",
    accessCodeNotConfigured: "The app isn't configured yet. Contact your teacher.",
    welcomeHeading: "How it works",
    welcomeIntro: "Before you start, here's a quick overview of the app.",
    welcomeSteps: [
      { icon: "🧠", title: "Eight competencies, three tiers", text: "The mental health nursing approach (competency 20), then the major disorders: schizophrenia, psychosis, personality, mood and anxiety disorders, medication, crisis and safety. Each competency has three increasingly demanding tiers." },
      { icon: "📝", title: "Questions", text: "Multiple choice, true/false, term matching and clinical scenarios on the helping relationship and crisis management." },
      { icon: "🎖️", title: "Badges", text: "Pass a competency's Advanced tier with 70% or more to earn its mastery badge." },
      { icon: "🏆", title: "Trophies", text: "Earn special trophies for your achievements and progress." },
      { icon: "📊", title: "Leaderboard", text: "Compare your progress with the rest of the class." },
      { icon: "🐉", title: "Your avatar", text: "Choose your avatar — it evolves as you earn experience." }
    ]
  }
};

/* ---- Paliers de niveau (basés sur XP total) ----
   Seuils resserrés à l'époque où l'app ne comptait qu'une compétence
   (47 questions). ⚠️ Volontairement CONSERVÉS lors de l'ajout des
   compétences sm_* (nov. 2026) : les relever ferait régresser le niveau et
   l'avatar d'élèves existants. L'avatar atteindra simplement sa forme
   finale plus tôt dans le parcours. */
const LEVELS = [
  { min: 0,   name_fr: "Novice",       name_en: "Novice",     avatarStage: 0 },
  { min: 120, name_fr: "Apprenti(e)",  name_en: "Apprentice", avatarStage: 2 },
  { min: 320, name_fr: "Compétent(e)", name_en: "Competent",  avatarStage: 4 },
  { min: 620, name_fr: "Chevronné(e)", name_en: "Seasoned",   avatarStage: 6 },
  { min: 950, name_fr: "Expert(e)",    name_en: "Expert",     avatarStage: 9 },
  { min: 1300, name_fr: "Maître",      name_en: "Master",     avatarStage: 11 }
];

/* ---- Personnages d'avatar (créatures légendaires, évolutives) ----
   Chaque personnage est rendu par un emoji qui change de stade avec le XP
   (voir avatarSVG() dans app.js). Les 12 stades correspondent aux
   avatarStage de LEVELS. */
const AVATAR_CHARACTERS = [
 {
  "id": "tortuesm",
  "name_fr": "Tortue",
  "name_en": "Turtle",
  "title_fr": "La Sereine",
  "title_en": "The Serene One",
  "stages": ["🥚","🥚","🐢","🐢","🐢","🐢","🐢","🐢","🐢","🐢","🐢","🐢"]
 },
 {
  "id": "chatsm",
  "name_fr": "Chat",
  "name_en": "Cat",
  "title_fr": "L'Apaisant",
  "title_en": "The Soothing One",
  "stages": ["🥚","🥚","🐱","🐱","🐈","🐈","🐈","🐈","🐈","🐈","🐈","🐈"]
 },
 {
  "id": "elephant",
  "name_fr": "Éléphant",
  "name_en": "Elephant",
  "title_fr": "La Mémoire",
  "title_en": "The Memory Keeper",
  "stages": ["🥚","🥚","🐘","🐘","🐘","🐘","🐘","🐘","🐘","🐘","🐘","🐘"]
 },
 {
  "id": "papillonsm",
  "name_fr": "Papillon",
  "name_en": "Butterfly",
  "title_fr": "La Renaissance",
  "title_en": "The Rebirth",
  "stages": ["🥚","🥚","🐛","🐛","🐛","🐛","🦋","🦋","🦋","🦋","🦋","🦋"]
 }
];

const AVATAR_COLORS = [
  { id: "turquoise", hex: "#0f8b8d", name_fr: "Turquoise", name_en: "Turquoise" },
  { id: "violet", hex: "#6b3fa0", name_fr: "Violet", name_en: "Purple" },
  { id: "jaune",  hex: "#f7b500", name_fr: "Jaune soleil", name_en: "Sunny Yellow" },
  { id: "orange", hex: "#ff7a1a", name_fr: "Orange vif", name_en: "Bright Orange" },
  { id: "vert",   hex: "#3bb54a", name_fr: "Vert menthe", name_en: "Mint Green" },
  { id: "rose",   hex: "#e5559c", name_fr: "Rose", name_en: "Pink" }
];

/* ---- Compatibilité du moteur ----
   Le moteur (app.js) est partagé avec les apps de métiers, où l'élève
   choisit une « machine » qui grossit avec le XP. SantéMentaleQuest
   n'utilise pas cette mécanique : entrée neutre + objet vide pour les
   questions de type "hotspot" (aucune dans cette app). */
const VEHICLE_TYPES = [
  { id: "aucun", name_fr: "—", name_en: "—" }
];
const VEHICLE_GROWTH = { minHeight: 78, maxHeight: 178, maxXP: 1300 };
const CABIN_CONTROLS = {};

/* ---- Trophées (méta-réussites) ----
   Conçus quand l'app ne comptait qu'UNE compétence : ils récompensent la
   progression par PALIER. Ids et conditions conservés tels quels (nov. 2026)
   pour ne retirer aucun trophée déjà obtenu par un élève. */
const TROPHIES = [
  { id: "t_first", name_fr: "Premier pas", name_en: "First Step", icon: "🥉",
    desc_fr: "Réussir le palier Débutant de l'approche en santé mentale", desc_en: "Pass the Beginner tier of the mental health approach",
    check: (state) => !!state.completed["approche_sante_mentale_1"] },
  { id: "t_tier2", name_fr: "Mi-parcours", name_en: "Halfway There", icon: "🥈",
    desc_fr: "Réussir le palier Intermédiaire", desc_en: "Pass the Intermediate tier",
    check: (state) => !!state.completed["approche_sante_mentale_2"] },
  { id: "t_all", name_fr: "Diplômé virtuel", name_en: "Virtual Graduate", icon: "🏆",
    desc_fr: "Maîtriser la compétence (palier Avancé)", desc_en: "Master the competency (Advanced tier)",
    check: (state) => (state.badges || []).length >= 1 },
  { id: "t_perfect", name_fr: "Sans faute", name_en: "Flawless", icon: "💯",
    desc_fr: "Obtenir 100% à un palier", desc_en: "Score 100% on a tier",
    check: (state) => Object.values(state.completed).some(s => s.score === 100) },
  { id: "t_ecoute", name_fr: "Oreille attentive", name_en: "Attentive Ear", icon: "👂",
    desc_fr: "Obtenir 90% ou plus au palier Débutant (communication)", desc_en: "Score 90% or more on the Beginner tier (communication)",
    check: (state) => !!state.completed["approche_sante_mentale_1"] && state.completed["approche_sante_mentale_1"].best >= 90 },
  { id: "t_explorateur", name_fr: "Trois paliers", name_en: "All Three Tiers", icon: "🧭",
    desc_fr: "Tenter au moins trois paliers", desc_en: "Attempt at least three tiers",
    check: (state) => Object.keys(state.scores || {}).length >= 3 },
  { id: "t_streak", name_fr: "Assidu", name_en: "Dedicated", icon: "🔥",
    desc_fr: "Se connecter 3 jours différents", desc_en: "Log in on 3 different days",
    check: (state) => (state.loginDays || []).length >= 3 },
  { id: "t_matcher", name_fr: "Bonne association", name_en: "Great Match", icon: "🧩",
    desc_fr: "Réussir les 3 questions d'association de termes", desc_en: "Complete the 3 term-matching questions",
    check: (state) => (state.matchesCompleted || 0) >= 3 },
  { id: "t_ultime", name_fr: "Forme ultime", name_en: "Ultimate Form", icon: "🌟",
    desc_fr: "Faire évoluer ton avatar jusqu'à sa forme finale", desc_en: "Evolve your avatar to its final form",
    check: (state) => state.xp >= VEHICLE_GROWTH.maxXP }
];

/* ---- Palmarès (données d'exemple — classe fictive) ----
   À remplacer par de vraies données élèves lorsqu'un palmarès partagé
   sera branché. Le tableau de bord enseignant, lui, utilise Supabase. */
const LEADERBOARD_SEED = [
  { name: "Mia-Rose T.", xp: 1180, avatarChar: "licorne", avatarColor: "vert" },
  { name: "Xavier L.", xp: 940, avatarChar: "dragon", avatarColor: "turquoise" },
  { name: "Sam D.", xp: 700, avatarChar: "phenix", avatarColor: "orange" },
  { name: "Alicia P.", xp: 510, avatarChar: "griffon", avatarColor: "rose" },
  { name: "Kevin R.", xp: 340, avatarChar: "dragon", avatarColor: "jaune" },
  { name: "Noémie B.", xp: 170, avatarChar: "licorne", avatarColor: "violet" },
  { name: "Tommy G.", xp: 60, avatarChar: "phenix", avatarColor: "vert" }
];
