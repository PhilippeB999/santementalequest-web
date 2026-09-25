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

   ⚠️ STRUCTURE PARTICULIÈRE : cette app ne compte qu'UNE compétence
   officielle. La profondeur est donc portée par les 3 paliers
   (14 + 13 + 13 = 40 questions), chacun ayant son propre thème
   (tier.theme_fr / theme_en, affiché sur la carte et à l'intro).

   Format des choix: chaque question a un tableau "choices" où chaque
   item a { fr, en, correct }. L'ordre est mélangé au moment de
   l'affichage (voir app.js) — la position de la bonne réponse change
   donc à chaque tentative.
   ============================================================ */

const PROGRAM = {
  fr: { title: "SantéMentaleQuest — Compétence 20 (252-483)", subtitle: "Contenu d'amorçage — à valider" },
  en: { title: "SantéMentaleQuest — Competency 20 (252-483)", subtitle: "Starter content — to be validated" }
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
   pan distinct de la compétence 20 : Débutant -> Intermédiaire -> Avancé. */
const TIER_META = [
  { level: 1, name_fr: "Débutant", name_en: "Beginner", icon: "🌱" },
  { level: 2, name_fr: "Intermédiaire", name_en: "Intermediate", icon: "⚙️" },
  { level: 3, name_fr: "Avancé", name_en: "Advanced", icon: "🏆" }
];

/* Une seule compétence = une seule quête sur la carte.
   ⚠️ id « approche_sante_mentale » : préfixe propre à cette app pour ne pas
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
            ch("L'absence totale de trouble mental", "The complete absence of mental disorder"),
            ch("Un état de bien-être permettant à la personne de composer avec les tensions normales de la vie et de contribuer à sa communauté", "A state of well-being allowing a person to cope with the normal stresses of life and contribute to their community", true),
            ch("La capacité de travailler sans jamais ressentir de stress", "The ability to work without ever feeling stress"),
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
            ch("Terminer les phrases de la personne pour lui montrer qu'on la comprend", "Finishing the person's sentences to show you understand"),
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
            ch("« Le schizophrène de la chambre 12 »", "\"The schizophrenic in room 12\""),
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
              ch("Le lui donner : le lien de confiance passe avant tout", "Give it to him: the trusting relationship comes first"),
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
              ch("« Je reviendrai quand vous serez de meilleure humeur. »", "\"I'll come back when you're in a better mood.\"")
            ]),
          explFr: "Le reflet reconnaît l'émotion sans la contredire et ouvre la porte à la suite. Nier le sentiment (« voyons donc ») ferme l'échange immédiatement.",
          explEn: "Reflecting acknowledges the feeling without contradicting it and opens the door to more. Denying the feeling closes the exchange at once."
        },
        {
          fr: "Comment consigner au dossier ce qu'un usager a dit et fait ?",
          en: "How should you chart what a client said and did?",
          choices: [
            ch("En notant son interprétation personnelle du comportement", "By recording your personal interpretation of the behaviour"),
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
            ch("C'est acceptable tant qu'on ne prononce pas le diagnostic à voix haute", "It's acceptable as long as the diagnosis isn't said out loud")
          ],
          explFr: "La confidentialité ne dépend ni du lieu ni des personnes présentes : l'information clinique ne circule qu'entre les intervenants concernés par les soins, dans un endroit approprié.",
          explEn: "Confidentiality does not depend on the place or on who is present: clinical information circulates only among caregivers involved in the care, in an appropriate setting."
        },
        {
          ...scenario(
            "Vous entrez pour la première fois dans la chambre d'un usager visiblement anxieux. Quelle approche est la plus appropriée ?",
            "You enter the room of a visibly anxious client for the first time. Which approach is most appropriate?",
            [
              ch("Entrer rapidement et commencer les soins pour ne pas perdre de temps", "Walk in quickly and start care so as not to waste time"),
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
            ch("Aucun : l'anxiété est purement psychologique", "None: anxiety is purely psychological")
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
              ch("Lui demander d'expliquer en détail les causes de son anxiété", "Ask her to explain in detail the causes of her anxiety"),
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
            ch("Rien, tant que la personne s'alimente", "Nothing, as long as the person eats")
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
              ch("« Ne m'en parlez plus, ça ne ferait qu'empirer les choses. »", "\"Don't tell me about it again, it would only make things worse.\"")
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
            ch("L'agitation motrice", "Motor agitation")
          ],
          explFr: "Les symptômes positifs s'ajoutent au fonctionnement normal (hallucinations, idées délirantes) ; les symptômes négatifs correspondent à ce qui est en moins (retrait, apathie, émoussement affectif). Ces derniers sont souvent sous-estimés.",
          explEn: "Positive symptoms are additions to normal functioning (hallucinations, delusions); negative symptoms are what is missing (withdrawal, apathy, blunted affect). The latter are often underestimated."
        },
        {
          type: "tf",
          fr: "Dans l'ensemble, les personnes vivant avec un trouble de santé mentale sont plus souvent victimes de violence qu'auteures de violence.",
          en: "Overall, people living with a mental health disorder are more often victims of violence than perpetrators of violence.",
          isTrue: true,
          explFr: "Vrai. L'association entre trouble mental et dangerosité est largement exagérée dans l'imaginaire populaire. Le savoir aide l'intervenant à garder une attitude juste, sans méfiance excessive.",
          explEn: "True. The link between mental disorder and dangerousness is greatly exaggerated in popular belief. Knowing this helps caregivers keep a fair attitude, without excessive wariness."
        },
        {
          ...scenario(
            "Un usager sous antipsychotique présente depuis deux jours une rigidité, des tremblements et une incapacité à rester assis en place. Que faites-vous ?",
            "A client on antipsychotics has had rigidity, tremors and an inability to sit still for two days. What do you do?",
            [
              ch("Cesser la médication de votre propre initiative", "Stop the medication on your own initiative"),
              ch("Consigner vos observations et les rapporter sans délai à l'infirmière : il peut s'agir d'effets extrapyramidaux", "Document your observations and report them promptly to the nurse: these may be extrapyramidal effects", true),
              ch("Le rassurer en disant que c'est de la nervosité et attendre une semaine", "Reassure him that it's nerves and wait a week"),
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
              ch("Ne rien noter, puisqu'il refusera probablement demain aussi", "Chart nothing, since he'll probably refuse tomorrow too")
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
            ch("Attendre 24 heures avant d'en parler", "Wait 24 hours before mentioning it"),
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
            ch("Raconter ses expériences personnelles pour montrer qu'il comprend", "Telling personal stories to show that you understand"),
            ch("Éviter toute émotion afin de rester objectif", "Avoiding all emotion in order to stay objective")
          ],
          explFr: "La relation d'aide vise l'autonomie : la personne reste actrice de sa situation. Donner des solutions toutes faites ou parler de soi déplace le centre de l'échange.",
          explEn: "The helping relationship aims at autonomy: the person remains the actor in their own situation. Handing out ready-made solutions or talking about yourself shifts the focus of the exchange."
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
              ch("Hausser le ton pour reprendre le contrôle de la situation", "Raise your voice to take back control of the situation"),
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
            ch("Se placer entre la personne et la porte pour l'empêcher de sortir", "Standing between the person and the door to prevent them from leaving"),
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
              ch("Attendre la fin du quart de travail pour en parler", "Wait until the end of the shift to mention it")
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
            ch("Promettre, puis en parler quand même sans l'en informer", "Promise, then talk about it anyway without telling him"),
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
              ch("Laisser l'équipe du prochain quart le découvrir au dossier", "Let the next shift find out from the chart")
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
              ch("Inscrire le commentaire tel quel au dossier de l'usager", "Record the comment as is in the client's chart")
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
            ch("Les commentaires des autres usagers présents, avec leur nom", "The comments of the other clients present, with their names")
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
              ch("Fermer la porte et inscrire qu'elle refuse les soins", "Close the door and chart that she refuses care")
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
            ch("Demander un transfert d'unité immédiatement", "Request an immediate transfer to another unit"),
            ch("Éviter tout contact avec l'usager par la suite", "Avoid all contact with the client afterwards")
          ],
          explFr: "Prendre soin de soi fait partie du travail en santé mentale. Nommer ce qu'on a vécu et utiliser les ressources prévues prévient l'épuisement et protège la qualité de la relation avec les usagers.",
          explEn: "Taking care of yourself is part of mental health work. Naming what you experienced and using the available resources prevents burnout and protects the quality of the relationship with clients."
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
      { icon: "🧠", title: "Une compétence, trois paliers", text: "Toute l'app porte sur la compétence 20 — l'approche en santé mentale. Elle se traverse en trois paliers de plus en plus exigeants." },
      { icon: "📝", title: "Questions", text: "Choix multiples, vrai/faux, associations de termes et mises en situation cliniques de relation d'aide et de gestion de crise." },
      { icon: "🎖️", title: "Badge", text: "Réussis le palier Avancé à 70% ou plus pour décrocher le badge de maîtrise." },
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
      { icon: "🧠", title: "One competency, three tiers", text: "The whole app covers competency 20 — the mental health nursing approach. You work through it in three increasingly demanding tiers." },
      { icon: "📝", title: "Questions", text: "Multiple choice, true/false, term matching and clinical scenarios on the helping relationship and crisis management." },
      { icon: "🎖️", title: "Badge", text: "Pass the Advanced tier with 70% or more to earn the mastery badge." },
      { icon: "🏆", title: "Trophies", text: "Earn special trophies for your achievements and progress." },
      { icon: "📊", title: "Leaderboard", text: "Compare your progress with the rest of the class." },
      { icon: "🐉", title: "Your avatar", text: "Choose your avatar — it evolves as you earn experience." }
    ]
  }
};

/* ---- Paliers de niveau (basés sur XP total) ----
   ⚠️ Cette app ne compte qu'une compétence (40 questions au total) : le XP
   maximal atteignable est plus bas que dans les apps à 10 compétences. Les
   seuils sont donc resserrés pour que l'avatar évolue vraiment jusqu'au bout. */
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
   Adaptés à une app à UNE compétence : les trophées récompensent la
   progression par PALIER, pas le nombre de compétences maîtrisées. */
const TROPHIES = [
  { id: "t_first", name_fr: "Premier pas", name_en: "First Step", icon: "🥉",
    desc_fr: "Réussir le palier Débutant", desc_en: "Pass the Beginner tier",
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
    desc_fr: "Tenter les trois paliers de la compétence", desc_en: "Attempt all three tiers of the competency",
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
