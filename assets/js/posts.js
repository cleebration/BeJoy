/* ════════════════════════════════════════════════════════════
   BeJoy — posts.js
   Blog-Artikel. Reihenfolge im Array = Reihenfolge im Blog.
   Felder pro Post:
     id          eindeutige Zahl
     cat         mindful | joyful | resilient | future | worldwide
     emoji       Thumbnail-Symbol
     bg          Thumbnail-Hintergrund (Brand-Farbe / Verlauf)
     badgeColor  Farbe des Kategorie-Badges
     av          Avatar-Hintergrund
     author      Avatar-Kürzel
     authorName  Anzeigename
     date        ISO-Datum (YYYY-MM-DD)
     read        Lesezeit
     wide        true = großer "Featured"-Block (nur 1 empfohlen)
     de/en/es    { title, excerpt, content }  ← content = HTML-Artikeltext
   ──────────────────────────────────────────────────────────
   Neuen Post anlegen: Objekt kopieren, id hochzählen, Inhalt füllen.
   ════════════════════════════════════════════════════════════ */

window.posts = [

  /* ═══════════════ FEATURED / FUTURE-SELF ═══════════════ */
  {
    id: 1,
    cat: "future",
    emoji: "🤖",
    bg: "linear-gradient(135deg,#1A7A6E 0%,#2A9D8F 100%)",
    badgeColor: "#1A7A6E",
    av: "#F5A623",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-06-02",
    read: "8 Min",
    wide: true,
    de: {
      title: "Wer bist du, wenn die Maschine alles kann?",
      excerpt: "Künstliche Intelligenz übernimmt Aufgabe um Aufgabe. Genau deshalb wird die Frage nach dem eigenen Selbst wichtiger denn je — nicht trotz, sondern wegen der KI.",
      content: `
<p>Es gibt einen Moment, der vielen Menschen gerade zum ersten Mal passiert: Man tippt eine Aufgabe in ein Textfeld — etwas, worauf man stolz war, das man <em>konnte</em> — und Sekunden später erledigt eine Maschine es besser. Schneller. Geduldiger. Ohne schlechten Tag.</p>
<p>Die erste Reaktion ist oft ein leises Erschrecken. Wenn das auch geht, was bleibt dann <strong>mir</strong>?</p>
<h2>Die falsche Frage</h2>
<p>Wir haben uns lange über unsere Leistung definiert. Über das, was wir produzieren. Doch wenn Produktion zunehmend automatisierbar wird, führt diese Selbstdefinition in eine Sackgasse. Die produktivere Frage lautet nicht „Was kann ich besser als die KI?", sondern „Wer will ich sein, jetzt, wo ich die Wahl habe?"</p>
<p>Achtsamkeit ist hier kein esoterisches Extra, sondern eine praktische Fähigkeit: Sie trainiert genau das, was keine Maschine für dich übernehmen kann — das bewusste Erleben deines eigenen Lebens.</p>
<h2>Drei Anker für dein Selbst</h2>
<p><strong>1. Werte vor Aufgaben.</strong> Aufgaben kann man delegieren, Werte nicht. Wofür stehst du, auch wenn niemand zuschaut und kein Algorithmus es misst?</p>
<p><strong>2. Präsenz als Praxis.</strong> Die Fähigkeit, ganz hier zu sein — bei einem Menschen, einem Gespräch, einem Atemzug — wird in einer beschleunigten Welt zur Superkraft.</p>
<p><strong>3. Sinn vor Effizienz.</strong> Die KI optimiert auf Effizienz. Du darfst auf etwas anderes optimieren: auf ein Leben, das sich von innen richtig anfühlt.</p>
<h2>Der Mensch bleibt die Frage</h2>
<p>Maschinen geben Antworten. Aber die wichtigste Arbeit eines Menschen war nie das Antworten — es war das Stellen der richtigen Fragen. Wer bin ich? Was zählt? Wie will ich leben?</p>
<p>Diese Fragen kann dir keine KI abnehmen. Und genau darin liegt deine Freiheit.</p>
`
    },
    en: {
      title: "Who are you when the machine can do it all?",
      excerpt: "AI is taking over task after task. That's exactly why the question of your own self matters more than ever — not despite AI, but because of it.",
      content: `
<p>There's a moment many people are having for the first time right now: you type a task into a text box — something you were proud of, something you <em>could do</em> — and seconds later a machine does it better. Faster. More patiently. Without a bad day.</p>
<p>The first reaction is often a quiet fright. If that can be done too, what's left for <strong>me</strong>?</p>
<h2>The wrong question</h2>
<p>We defined ourselves through our output for a long time. But as production becomes automatable, that self-definition hits a dead end. The more useful question isn't "What can I do better than AI?" but "Who do I want to be, now that I have the choice?"</p>
<p>Mindfulness here is not an esoteric extra but a practical skill: it trains exactly what no machine can take over for you — the conscious experience of your own life.</p>
<h2>Three anchors for your self</h2>
<p><strong>1. Values before tasks.</strong> Tasks can be delegated, values cannot.</p>
<p><strong>2. Presence as practice.</strong> The ability to be fully here becomes a superpower in an accelerated world.</p>
<p><strong>3. Meaning before efficiency.</strong> AI optimizes for efficiency. You get to optimize for something else.</p>
<h2>The human remains the question</h2>
<p>Machines give answers. But a person's most important work was never answering — it was asking the right questions. No AI can take those from you. And that's exactly where your freedom lies.</p>
`
    },
    es: {
      title: "¿Quién eres cuando la máquina puede hacerlo todo?",
      excerpt: "La IA asume tarea tras tarea. Por eso la pregunta por tu propio yo importa más que nunca — no a pesar de la IA, sino gracias a ella.",
      content: `
<p>Hay un momento que muchas personas están viviendo por primera vez: escribes una tarea en un cuadro de texto y, segundos después, una máquina la hace mejor. Más rápido. Sin un mal día.</p>
<p>La primera reacción suele ser un susto silencioso. Si eso también se puede hacer, ¿qué me queda a <strong>mí</strong>?</p>
<h2>La pregunta equivocada</h2>
<p>Nos definimos por nuestra producción durante mucho tiempo. La pregunta más útil no es "¿Qué hago mejor que la IA?" sino "¿Quién quiero ser, ahora que puedo elegir?"</p>
<h2>Tres anclas para tu yo</h2>
<p><strong>1. Valores antes que tareas.</strong> Las tareas se delegan, los valores no.</p>
<p><strong>2. Presencia como práctica.</strong> Estar plenamente aquí se vuelve un superpoder.</p>
<p><strong>3. Sentido antes que eficiencia.</strong> La IA optimiza la eficiencia. Tú puedes optimizar otra cosa.</p>
<h2>El ser humano sigue siendo la pregunta</h2>
<p>Las máquinas dan respuestas. Pero el trabajo más importante de una persona nunca fue responder, sino hacer las preguntas correctas. Ahí está tu libertad.</p>
`
    }
  },

  /* ═══════════════ MINDFUL ═══════════════ */
  {
    id: 2,
    cat: "mindful",
    emoji: "🌬️",
    bg: "linear-gradient(135deg,#E8F5F3 0%,#FFF8EC 100%)",
    badgeColor: "#1A7A6E",
    av: "#1A7A6E",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-05-28",
    read: "5 Min",
    de: {
      title: "Der Atem als Reset-Knopf",
      excerpt: "Du trägst ein Werkzeug bei dir, das dein Nervensystem in Sekunden beruhigen kann — und benutzt es meist nur unbewusst. Eine kleine Anleitung.",
      content: `
<p>Zwischen Reiz und Reaktion liegt ein Raum. In diesem Raum liegt unsere Freiheit, schrieb der Psychiater Viktor Frankl sinngemäß. Der Atem ist der einfachste Weg, diesen Raum zu betreten.</p>
<h2>Warum es funktioniert</h2>
<p>Langsames Ausatmen aktiviert den Parasympathikus — den Teil des Nervensystems, der für Ruhe und Erholung zuständig ist. Das ist keine Esoterik, sondern messbare Physiologie.</p>
<h2>Die 4-6-Atmung</h2>
<p>Atme vier Sekunden lang ein. Atme sechs Sekunden lang aus. Wiederhole das fünf Mal. Das längere Ausatmen ist der Schlüssel: Es signalisiert dem Körper Sicherheit.</p>
<h2>Wann du es einsetzt</h2>
<p>Vor einem schwierigen Gespräch. Im Stau. Wenn das Handy dich in einen Strudel gezogen hat. Der Atem ist immer da — du musst dich nur erinnern, ihn zu benutzen.</p>
`
    },
    en: {
      title: "The breath as a reset button",
      excerpt: "You carry a tool that can calm your nervous system in seconds — and mostly use it unconsciously. A small guide.",
      content: `
<p>Between stimulus and response there is a space. In that space lies our freedom, the psychiatrist Viktor Frankl suggested. The breath is the simplest way to enter that space.</p>
<h2>Why it works</h2>
<p>Slow exhalation activates the parasympathetic nervous system — responsible for calm and recovery. Not esoterics, but measurable physiology.</p>
<h2>The 4-6 breath</h2>
<p>Inhale for four seconds. Exhale for six. Repeat five times. The longer exhale is the key: it signals safety to the body.</p>
<h2>When to use it</h2>
<p>Before a difficult conversation. In traffic. When your phone has pulled you into a vortex. The breath is always there.</p>
`
    },
    es: {
      title: "La respiración como botón de reinicio",
      excerpt: "Llevas contigo una herramienta que puede calmar tu sistema nervioso en segundos — y casi siempre la usas sin darte cuenta.",
      content: `
<p>Entre el estímulo y la respuesta hay un espacio. En ese espacio reside nuestra libertad, sugirió el psiquiatra Viktor Frankl. La respiración es la vía más simple para entrar en él.</p>
<h2>Por qué funciona</h2>
<p>La exhalación lenta activa el sistema nervioso parasimpático, responsable de la calma. No es esoterismo, es fisiología medible.</p>
<h2>La respiración 4-6</h2>
<p>Inhala cuatro segundos. Exhala seis. Repite cinco veces. La exhalación más larga es la clave.</p>
<h2>Cuándo usarla</h2>
<p>Antes de una conversación difícil. En el tráfico. Cuando el móvil te ha arrastrado a un remolino.</p>
`
    }
  },
  {
    id: 3,
    cat: "mindful",
    emoji: "📵",
    bg: "linear-gradient(135deg,#FAF7F2 0%,#E8F5F3 100%)",
    badgeColor: "#1A7A6E",
    av: "#2A9D8F",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-05-20",
    read: "6 Min",
    de: {
      title: "Digital Detox ohne Dogma",
      excerpt: "Du musst nicht in den Wald ziehen und dein Smartphone vergraben. Achtsamer Umgang mit Technik beginnt mit kleinen, ehrlichen Entscheidungen.",
      content: `
<p>Digital Detox wird oft als Alles-oder-nichts verkauft: 30 Tage offline, Handy in die Schublade, am besten gleich auf eine Almhütte. Für die meisten Menschen ist das weder realistisch noch nötig.</p>
<h2>Das Problem ist nicht die Technik</h2>
<p>Das Problem ist die Unbewusstheit. Das gedankenlose Greifen zum Gerät, das zwölfte Öffnen derselben App, das Scrollen, an das man sich zehn Minuten später nicht mehr erinnert.</p>
<h2>Drei Mikro-Praktiken</h2>
<p><strong>Die Schwelle.</strong> Lege eine Sekunde Pause ein, bevor du das Handy entsperrst, und frage: Wofür greife ich gerade danach?</p>
<p><strong>Die Ladestation.</strong> Lade dein Handy nachts außerhalb des Schlafzimmers. Ein analoger Wecker kostet wenig und verändert viel.</p>
<p><strong>Die erste Stunde.</strong> Schenke dir die erste Stunde des Tages ohne Bildschirm. Dein Kopf gehört dann erst einmal dir.</p>
<h2>Worum es wirklich geht</h2>
<p>Nicht um Verzicht, sondern um Wahl. Du entscheidest, wann die Technik dir dient — und nicht umgekehrt.</p>
`
    },
    en: {
      title: "Digital detox without dogma",
      excerpt: "You don't have to move to the woods and bury your phone. Mindful tech use starts with small, honest decisions.",
      content: `
<p>Digital detox is often sold as all-or-nothing: 30 days offline, phone in a drawer. For most people that's neither realistic nor necessary.</p>
<h2>The problem isn't the tech</h2>
<p>The problem is unawareness. The thoughtless reach for the device, the twelfth opening of the same app.</p>
<h2>Three micro-practices</h2>
<p><strong>The threshold.</strong> Pause one second before unlocking and ask: what am I reaching for this for?</p>
<p><strong>The charging spot.</strong> Charge your phone outside the bedroom at night.</p>
<p><strong>The first hour.</strong> Give yourself the first hour of the day without a screen.</p>
<h2>What it's really about</h2>
<p>Not renunciation, but choice. You decide when tech serves you — not the other way around.</p>
`
    },
    es: {
      title: "Desintoxicación digital sin dogma",
      excerpt: "No tienes que mudarte al bosque y enterrar tu móvil. El uso consciente de la tecnología empieza con decisiones pequeñas y honestas.",
      content: `
<p>La desintoxicación digital se vende a menudo como todo o nada. Para la mayoría no es ni realista ni necesario.</p>
<h2>El problema no es la tecnología</h2>
<p>El problema es la inconsciencia. El gesto automático de coger el aparato.</p>
<h2>Tres microprácticas</h2>
<p><strong>El umbral.</strong> Haz una pausa de un segundo antes de desbloquear.</p>
<p><strong>El cargador.</strong> Carga el móvil fuera del dormitorio.</p>
<p><strong>La primera hora.</strong> Regálate la primera hora del día sin pantalla.</p>
<h2>De qué se trata realmente</h2>
<p>No de renuncia, sino de elección. Tú decides cuándo la tecnología te sirve.</p>
`
    }
  },

  /* ═══════════════ JOYFUL (glückliches, selbstbestimmtes Leben) ═══════════════ */
  {
    id: 4,
    cat: "joyful",
    emoji: "🧭",
    bg: "linear-gradient(135deg,#FFF8EC 0%,#FDF0EB 100%)",
    badgeColor: "#F5A623",
    av: "#F5A623",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-05-25",
    read: "7 Min",
    de: {
      title: "Selbstbestimmt leben heißt nicht, alles allein zu machen",
      excerpt: "Autonomie wird oft mit Einzelkämpfertum verwechselt. Dabei zeigt die Forschung: Selbstbestimmung und Verbundenheit sind keine Gegensätze.",
      content: `
<p>„Selbstbestimmt" klingt für viele nach Unabhängigkeit um jeden Preis: keine Hilfe annehmen, alles selbst stemmen, niemandem etwas schuldig sein. Doch das ist ein Missverständnis.</p>
<h2>Was Selbstbestimmung wirklich bedeutet</h2>
<p>Die Selbstbestimmungstheorie der Psychologen Deci und Ryan beschreibt drei Grundbedürfnisse: <strong>Autonomie</strong> (selbst wählen können), <strong>Kompetenz</strong> (etwas bewirken können) und <strong>Verbundenheit</strong> (zu anderen gehören). Erst zusammen ergeben sie ein erfülltes Leben.</p>
<h2>Autonomie ist nicht Isolation</h2>
<p>Ein selbstbestimmter Mensch sagt nicht „Ich brauche niemanden". Er sagt: „Ich wähle, mit wem ich mein Leben teile." Der Unterschied ist entscheidend. Das eine ist Mauer, das andere ist Tür.</p>
<h2>Drei Fragen für mehr Selbstbestimmung</h2>
<p>Tue ich das, weil ich es <em>will</em> — oder weil ich glaube, es zu <em>müssen</em>? Wessen Stimme höre ich in dieser Entscheidung — meine oder eine fremde? Wenn niemand zusehen würde: Wofür würde ich mich entscheiden?</p>
<h2>Freiheit mit Wurzeln</h2>
<p>Das glücklichste Leben ist nicht das freieste im Sinne von bindungslos. Es ist eines, in dem man frei <em>gewählt</em> hat, woran man sich bindet.</p>
`
    },
    en: {
      title: "A self-determined life doesn't mean doing it all alone",
      excerpt: "Autonomy is often confused with going it alone. Yet research shows: self-determination and connection are not opposites.",
      content: `
<p>"Self-determined" sounds to many like independence at any cost. But that's a misunderstanding.</p>
<h2>What self-determination really means</h2>
<p>Deci and Ryan's self-determination theory describes three basic needs: <strong>autonomy</strong>, <strong>competence</strong> and <strong>relatedness</strong>. Only together do they make a fulfilling life.</p>
<h2>Autonomy is not isolation</h2>
<p>A self-determined person doesn't say "I need no one." They say "I choose who I share my life with." One is a wall, the other a door.</p>
<h2>Three questions</h2>
<p>Am I doing this because I <em>want</em> to, or because I think I <em>have</em> to? Whose voice do I hear in this decision? If no one were watching, what would I choose?</p>
<h2>Freedom with roots</h2>
<p>The happiest life isn't the most unattached one. It's one where you freely <em>chose</em> what to bind yourself to.</p>
`
    },
    es: {
      title: "Vivir con autodeterminación no significa hacerlo todo solo",
      excerpt: "La autonomía se confunde a menudo con ir por libre. La investigación muestra que autodeterminación y conexión no son opuestos.",
      content: `
<p>"Autodeterminado" suena para muchos como independencia a toda costa. Pero es un malentendido.</p>
<h2>Qué significa realmente</h2>
<p>La teoría de la autodeterminación de Deci y Ryan describe tres necesidades: <strong>autonomía</strong>, <strong>competencia</strong> y <strong>vínculo</strong>.</p>
<h2>Autonomía no es aislamiento</h2>
<p>Una persona autodeterminada no dice "no necesito a nadie". Dice "elijo con quién comparto mi vida".</p>
<h2>Tres preguntas</h2>
<p>¿Lo hago porque <em>quiero</em> o porque creo que <em>debo</em>? ¿De quién es la voz que oigo? Si nadie mirara, ¿qué elegiría?</p>
<h2>Libertad con raíces</h2>
<p>La vida más feliz no es la más desvinculada, sino aquella en la que has <em>elegido</em> tus vínculos.</p>
`
    }
  },
  {
    id: 5,
    cat: "joyful",
    emoji: "✨",
    bg: "linear-gradient(135deg,#FDF0EB 0%,#FFF8EC 100%)",
    badgeColor: "#E8856A",
    av: "#E8856A",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-05-15",
    read: "5 Min",
    de: {
      title: "Die kleine Kunst, Freude zu bemerken",
      excerpt: "Glück ist seltener ein großes Ereignis als ein übersehener Moment. Wer Freude bemerken lernt, vervielfacht sie.",
      content: `
<p>Wir warten oft auf das große Glück: den Urlaub, die Beförderung, den perfekten Moment. Dabei zieht das kleine Glück ständig an uns vorbei — und wir sehen es nicht.</p>
<h2>Savoring: Genuss als Fähigkeit</h2>
<p>Die Positive Psychologie nennt es <em>Savoring</em> — das bewusste Auskosten angenehmer Momente. Der erste Schluck Kaffee. Sonne auf der Haut. Das Lachen eines Menschen, den du magst.</p>
<h2>Eine einfache Übung</h2>
<p>Notiere abends drei Dinge, die heute gut waren — und <strong>warum</strong>. Das Warum ist wichtiger als das Was: Es trainiert dein Gehirn, das Gute aktiv zu suchen.</p>
<h2>Warum das zählt</h2>
<p>Unser Gehirn ist evolutionär darauf gepolt, Gefahren zu bemerken, nicht Schönes. Freude zu bemerken ist deshalb kein naiver Optimismus — es ist ein bewusstes Gegengewicht.</p>
`
    },
    en: {
      title: "The small art of noticing joy",
      excerpt: "Happiness is rarely a big event and more often an overlooked moment. Those who learn to notice joy multiply it.",
      content: `
<p>We often wait for big happiness — the vacation, the promotion. Meanwhile small joy passes us constantly, and we don't see it.</p>
<h2>Savoring as a skill</h2>
<p>Positive psychology calls it <em>savoring</em> — consciously relishing pleasant moments. The first sip of coffee. Sun on your skin.</p>
<h2>A simple exercise</h2>
<p>Each evening, note three things that were good today — and <strong>why</strong>. The why matters more than the what.</p>
<h2>Why it counts</h2>
<p>Our brain is wired to notice danger, not beauty. Noticing joy is a conscious counterweight.</p>
`
    },
    es: {
      title: "El pequeño arte de notar la alegría",
      excerpt: "La felicidad rara vez es un gran evento y más a menudo un momento que pasamos por alto.",
      content: `
<p>Solemos esperar la gran felicidad. Mientras tanto, la pequeña alegría pasa constantemente y no la vemos.</p>
<h2>Saborear como habilidad</h2>
<p>La psicología positiva lo llama <em>savoring</em>: disfrutar conscientemente los momentos agradables.</p>
<h2>Un ejercicio simple</h2>
<p>Cada noche anota tres cosas buenas del día — y <strong>por qué</strong>.</p>
<h2>Por qué importa</h2>
<p>Nuestro cerebro está programado para notar el peligro, no la belleza. Notar la alegría es un contrapeso consciente.</p>
`
    }
  },

  /* ═══════════════ RESILIENT ═══════════════ */
  {
    id: 6,
    cat: "resilient",
    emoji: "💪",
    bg: "linear-gradient(135deg,#FDF0EB 0%,#E8F5F3 100%)",
    badgeColor: "#E8856A",
    av: "#E8856A",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-05-22",
    read: "7 Min",
    de: {
      title: "Resilienz ist kein Panzer",
      excerpt: "Widerstandsfähigkeit bedeutet nicht, nichts an sich heranzulassen. Sie bedeutet, sich nach einem Schlag wieder aufzurichten — verändert, aber nicht zerbrochen.",
      content: `
<p>Resilienz wird oft falsch verstanden: als Härte, als die Fähigkeit, alles wegzustecken. Doch die widerstandsfähigsten Menschen sind selten die unerschütterlichsten. Sie sind die, die fühlen — und sich trotzdem wieder aufrichten.</p>
<h2>Das Bild vom Bambus</h2>
<p>Der Eichbaum wirkt stark, bis der Sturm ihn bricht. Der Bambus biegt sich, scheint nachzugeben — und steht danach wieder aufrecht. Resilienz ist Biegsamkeit, nicht Starrheit.</p>
<h2>Was Resilienz wirklich stärkt</h2>
<p><strong>Verbundenheit.</strong> Der stärkste Schutzfaktor in der Resilienzforschung ist nicht Willenskraft, sondern mindestens eine verlässliche Beziehung.</p>
<p><strong>Bedeutung.</strong> Wer das eigene Leid in einen größeren Sinn einordnen kann, trägt es leichter.</p>
<p><strong>Selbstmitgefühl.</strong> Sich selbst nach einem Rückschlag nicht zu verurteilen, sondern zu begleiten wie einen guten Freund.</p>
<h2>Nach dem Sturm</h2>
<p>Resilienz heißt nicht, unversehrt zu bleiben. Sie heißt, mit den Narben weiterzugehen — und manchmal an genau den Bruchstellen stärker zu werden.</p>
`
    },
    en: {
      title: "Resilience is not armor",
      excerpt: "Resilience doesn't mean letting nothing touch you. It means rising again after a blow — changed, but not broken.",
      content: `
<p>Resilience is often misunderstood as hardness. But the most resilient people are rarely the most unshakeable. They are the ones who feel — and rise again anyway.</p>
<h2>The bamboo image</h2>
<p>The oak looks strong until the storm breaks it. The bamboo bends, seems to yield — and stands upright again afterward.</p>
<h2>What truly strengthens resilience</h2>
<p><strong>Connection.</strong> The strongest protective factor is not willpower but at least one reliable relationship.</p>
<p><strong>Meaning.</strong> Those who can place their suffering within a larger sense carry it more lightly.</p>
<p><strong>Self-compassion.</strong> Accompanying yourself after a setback like a good friend.</p>
<h2>After the storm</h2>
<p>Resilience doesn't mean staying unharmed. It means walking on with the scars.</p>
`
    },
    es: {
      title: "La resiliencia no es una armadura",
      excerpt: "Ser resiliente no significa que nada te afecte. Significa levantarse tras un golpe — cambiado, pero no roto.",
      content: `
<p>La resiliencia se malinterpreta a menudo como dureza. Pero las personas más resilientes son las que sienten — y aun así se levantan.</p>
<h2>La imagen del bambú</h2>
<p>El roble parece fuerte hasta que la tormenta lo rompe. El bambú se dobla y vuelve a erguirse.</p>
<h2>Qué fortalece la resiliencia</h2>
<p><strong>Vínculo.</strong> El factor protector más fuerte no es la fuerza de voluntad, sino al menos una relación fiable.</p>
<p><strong>Sentido.</strong> Quien sitúa su sufrimiento en un sentido mayor lo lleva más ligero.</p>
<p><strong>Autocompasión.</strong> Acompañarte tras un revés como a un buen amigo.</p>
<h2>Tras la tormenta</h2>
<p>La resiliencia es seguir caminando con las cicatrices.</p>
`
    }
  },
  {
    id: 7,
    cat: "resilient",
    emoji: "🌱",
    bg: "linear-gradient(135deg,#E8F5F3 0%,#FFF8EC 100%)",
    badgeColor: "#1A7A6E",
    av: "#2A9D8F",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-05-10",
    read: "6 Min",
    de: {
      title: "Zukunfts-Resilienz: ruhig bleiben im Wandel",
      excerpt: "Die Welt verändert sich schneller, als wir mithalten können. Zukunfts-Resilienz ist die Fähigkeit, im Ungewissen handlungsfähig zu bleiben.",
      content: `
<p>Technologie, Klima, Arbeitswelt — die Veränderungsrate steigt, und mit ihr ein diffuses Gefühl der Überforderung. Zukunfts-Resilienz ist die Antwort darauf: nicht alles vorhersehen zu können, aber sich selbst zu vertrauen, dass man mit dem Kommenden umgehen wird.</p>
<h2>Kontrolle loslassen, Einfluss behalten</h2>
<p>Vieles können wir nicht kontrollieren. Aber fast immer gibt es einen Bereich, in dem wir Einfluss haben. Resiliente Menschen verschwenden wenig Energie auf das Erste und investieren sie ins Zweite.</p>
<h2>Lernfähigkeit schlägt Wissen</h2>
<p>In einer schnellen Welt veraltet Wissen rasch. Wertvoller wird die Fähigkeit, immer wieder neu zu lernen — und die Gelassenheit, nicht alles schon zu wissen.</p>
<h2>Anker im Beständigen</h2>
<p>Je schneller außen alles wird, desto wichtiger werden innere Konstanten: deine Werte, deine Beziehungen, deine täglichen Rituale. Sie sind der ruhige Punkt im Wandel.</p>
`
    },
    en: {
      title: "Future-resilience: staying calm amid change",
      excerpt: "The world is changing faster than we can keep up. Future-resilience is the ability to stay capable of acting amid uncertainty.",
      content: `
<p>Technology, climate, work — the rate of change is rising, and with it a diffuse sense of overwhelm. Future-resilience is trusting yourself to handle what comes, even without predicting it.</p>
<h2>Release control, keep influence</h2>
<p>We can't control much. But there's almost always an area where we have influence. Resilient people invest their energy there.</p>
<h2>Learning beats knowing</h2>
<p>In a fast world, knowledge ages quickly. The ability to keep learning becomes more valuable.</p>
<h2>Anchors in the constant</h2>
<p>The faster everything outside becomes, the more important inner constants are: your values, relationships, daily rituals.</p>
`
    },
    es: {
      title: "Resiliencia de futuro: calma ante el cambio",
      excerpt: "El mundo cambia más rápido de lo que podemos seguir. La resiliencia de futuro es seguir siendo capaces de actuar en la incertidumbre.",
      content: `
<p>Tecnología, clima, trabajo: la tasa de cambio sube, y con ella una sensación difusa de agobio. La resiliencia de futuro es confiar en que sabrás manejar lo que venga.</p>
<h2>Soltar el control, mantener la influencia</h2>
<p>No podemos controlar mucho. Pero casi siempre hay un área donde sí tenemos influencia.</p>
<h2>Aprender supera a saber</h2>
<p>En un mundo rápido el conocimiento envejece pronto. La capacidad de seguir aprendiendo vale más.</p>
<h2>Anclas en lo constante</h2>
<p>Cuanto más rápido es todo fuera, más importan las constantes internas: valores, relaciones, rituales diarios.</p>
`
    }
  },

  /* ═══════════════ WORLDWIDE ═══════════════ */
  {
    id: 8,
    cat: "worldwide",
    emoji: "☀️",
    bg: "linear-gradient(135deg,#FFF8EC 0%,#FDF0EB 100%)",
    badgeColor: "#F5A623",
    av: "#F5A623",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-05-18",
    read: "6 Min",
    de: {
      title: "Ikigai: der japanische Grund aufzustehen",
      excerpt: "Kein Fünf-Schritte-Plan, sondern eine Lebenshaltung. Was wir vom japanischen Konzept des Ikigai wirklich lernen können.",
      content: `
<p>Ikigai (生き甲斐) wird oft auf ein hübsches Venn-Diagramm reduziert: die Schnittmenge aus dem, was du liebst, kannst, wofür du bezahlt wirst und was die Welt braucht. Doch in Japan selbst ist Ikigai schlichter — und tiefer.</p>
<h2>Der Grund, morgens aufzustehen</h2>
<p>Wörtlich heißt Ikigai etwa „das, wofür es sich zu leben lohnt". Für viele Menschen auf Okinawa, einer der Regionen mit den meisten gesunden Hundertjährigen, ist das kein großer Lebenssinn, sondern etwas Kleines: der Garten, die Enkel, die morgendliche Runde mit Freunden.</p>
<h2>Sinn muss nicht groß sein</h2>
<p>Das ist die befreiende Botschaft: Dein Ikigai muss kein weltbewegendes Projekt sein. Es darf in den kleinen, regelmäßigen Dingen liegen, die deinem Tag einen Grund geben.</p>
<h2>Eine Frage zum Mitnehmen</h2>
<p>Was ist die kleine Sache, die deinen morgigen Tag lebenswert macht? Wenn du sie benennen kannst, hast du einen Faden deines Ikigai schon in der Hand.</p>
`
    },
    en: {
      title: "Ikigai: the Japanese reason to get up",
      excerpt: "Not a five-step plan but a way of living. What we can really learn from the Japanese concept of ikigai.",
      content: `
<p>Ikigai is often reduced to a pretty Venn diagram. But in Japan itself, ikigai is simpler — and deeper.</p>
<h2>The reason to rise in the morning</h2>
<p>Literally, ikigai means roughly "that which makes life worth living." For many in Okinawa — a region with many healthy centenarians — it's something small: the garden, the grandchildren, the morning round with friends.</p>
<h2>Meaning doesn't have to be big</h2>
<p>That's the liberating message: your ikigai needn't be a world-changing project. It may lie in small, regular things.</p>
<h2>A question to take with you</h2>
<p>What is the small thing that makes your tomorrow worth living? Name it, and you already hold a thread of your ikigai.</p>
`
    },
    es: {
      title: "Ikigai: la razón japonesa para levantarse",
      excerpt: "No un plan de cinco pasos, sino una actitud ante la vida. Lo que de verdad podemos aprender del ikigai.",
      content: `
<p>El ikigai se reduce a menudo a un bonito diagrama de Venn. Pero en Japón es más simple — y más profundo.</p>
<h2>La razón para levantarse</h2>
<p>Literalmente significa "aquello que hace que la vida valga la pena". En Okinawa suele ser algo pequeño: el jardín, los nietos, el paseo matutino.</p>
<h2>El sentido no tiene que ser grande</h2>
<p>Ese es el mensaje liberador: tu ikigai no necesita ser un gran proyecto.</p>
<h2>Una pregunta para llevar</h2>
<p>¿Cuál es la pequeña cosa que hace que tu mañana valga la pena?</p>
`
    }
  },
  {
    id: 9,
    cat: "worldwide",
    emoji: "🕯️",
    bg: "linear-gradient(135deg,#FFF8EC 0%,#E8F5F3 100%)",
    badgeColor: "#F5A623",
    av: "#E8856A",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-05-08",
    read: "4 Min",
    de: {
      title: "Hygge ist kein Möbelstil",
      excerpt: "Der dänische Begriff wurde zur Marketing-Vokabel. Dabei beschreibt Hygge etwas, das man nicht kaufen kann.",
      content: `
<p>Seit Hygge zum Export-Schlager wurde, verkauft man uns Wolldecken, Kerzen und Strickpullover als Glücksrezept. Doch Hygge ist kein Einrichtungskatalog.</p>
<h2>Das Gefühl, nicht die Deko</h2>
<p>Hygge beschreibt einen Zustand: Wärme, Geborgenheit, das Gefühl, am richtigen Ort mit den richtigen Menschen zu sein. Eine Kerze hilft — aber das Entscheidende ist die Atmosphäre des Zusammenseins.</p>
<h2>Warum Dänemark</h2>
<p>In einem Land mit langen, dunklen Wintern wird das bewusste Schaffen von Wärme und Nähe zur Überlebensstrategie. Hygge ist die kultivierte Kunst, es sich gemeinsam schön zu machen.</p>
<h2>Hygge ohne Budget</h2>
<p>Telefon weg. Licht gedämpft. Ein Mensch, den du magst, gegenüber. Das ist alles, was es braucht — und nichts davon steht im Möbelhaus.</p>
`
    },
    en: {
      title: "Hygge is not a furniture style",
      excerpt: "The Danish term became a marketing word. Yet hygge describes something you cannot buy.",
      content: `
<p>Since hygge became an export hit, we're sold wool blankets and candles as a happiness recipe. But hygge is not a furniture catalogue.</p>
<h2>The feeling, not the decor</h2>
<p>Hygge describes a state: warmth, safety, the feeling of being in the right place with the right people.</p>
<h2>Why Denmark</h2>
<p>In a land of long, dark winters, deliberately creating warmth and closeness becomes a survival strategy.</p>
<h2>Hygge on no budget</h2>
<p>Phone away. Lights low. A person you like across from you. That's all it takes.</p>
`
    },
    es: {
      title: "El hygge no es un estilo de muebles",
      excerpt: "El término danés se volvió palabra de marketing. Pero el hygge describe algo que no se puede comprar.",
      content: `
<p>Desde que el hygge se volvió un éxito de exportación, nos venden mantas y velas como receta de felicidad. Pero no es un catálogo de muebles.</p>
<h2>El sentimiento, no la decoración</h2>
<p>El hygge describe un estado: calidez, cobijo, la sensación de estar en el lugar correcto con las personas correctas.</p>
<h2>Por qué Dinamarca</h2>
<p>En un país de inviernos largos y oscuros, crear calidez se vuelve estrategia de supervivencia.</p>
<h2>Hygge sin presupuesto</h2>
<p>El móvil lejos. Luz tenue. Alguien a quien quieres enfrente. Eso es todo.</p>
`
    }
  },
  {
    id: 10,
    cat: "worldwide",
    emoji: "🌿",
    bg: "linear-gradient(135deg,#E8F5F3 0%,#FAF7F2 100%)",
    badgeColor: "#1A7A6E",
    av: "#1A7A6E",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-04-30",
    read: "5 Min",
    de: {
      title: "Ubuntu: Ich bin, weil wir sind",
      excerpt: "Die südafrikanische Philosophie Ubuntu stellt eine radikale These auf: Menschsein gibt es nur in Beziehung.",
      content: `
<p>„Umuntu ngumuntu ngabantu" — ein Mensch ist ein Mensch durch andere Menschen. In diesem Satz der Nguni-Sprachen steckt eine ganze Weltanschauung.</p>
<h2>Eine andere Idee vom Selbst</h2>
<p>Während der Westen das Individuum in den Mittelpunkt stellt, beginnt Ubuntu bei der Gemeinschaft. Mein Wohlergehen ist mit deinem verflochten. Ich werde erst ganz Mensch durch meine Beziehungen zu anderen.</p>
<h2>Was wir daraus lernen können</h2>
<p>In einer zunehmend vereinzelten Welt erinnert Ubuntu daran, dass Glück selten allein entsteht. Großzügigkeit, Mitgefühl und Verantwortung füreinander sind keine moralische Pflicht, sondern Quellen eines erfüllten Lebens.</p>
<h2>Ubuntu im Alltag</h2>
<p>Du musst nicht die Welt retten. Es reicht, einen Menschen heute wirklich zu sehen — und dadurch ein Stück menschlicher zu werden.</p>
`
    },
    en: {
      title: "Ubuntu: I am because we are",
      excerpt: "The South African philosophy of ubuntu makes a radical claim: being human exists only in relationship.",
      content: `
<p>"Umuntu ngumuntu ngabantu" — a person is a person through other people. This Nguni phrase holds an entire worldview.</p>
<h2>A different idea of the self</h2>
<p>While the West centers the individual, ubuntu begins with community. My wellbeing is interwoven with yours.</p>
<h2>What we can learn</h2>
<p>In an increasingly isolated world, ubuntu reminds us that happiness rarely arises alone.</p>
<h2>Ubuntu in daily life</h2>
<p>You don't have to save the world. It's enough to truly see one person today.</p>
`
    },
    es: {
      title: "Ubuntu: soy porque somos",
      excerpt: "La filosofía sudafricana del ubuntu plantea una tesis radical: ser humano solo existe en relación.",
      content: `
<p>"Umuntu ngumuntu ngabantu": una persona es persona a través de otras personas. En esta frase nguni cabe toda una cosmovisión.</p>
<h2>Otra idea del yo</h2>
<p>Mientras Occidente centra al individuo, el ubuntu empieza por la comunidad. Mi bienestar está entrelazado con el tuyo.</p>
<h2>Qué podemos aprender</h2>
<p>En un mundo cada vez más aislado, el ubuntu recuerda que la felicidad rara vez surge en soledad.</p>
<h2>Ubuntu en lo cotidiano</h2>
<p>No tienes que salvar el mundo. Basta con ver de verdad a una persona hoy.</p>
`
    }
  },

  /* ═══════════════ FUTURE-SELF (weitere) ═══════════════ */
  {
    id: 11,
    cat: "future",
    emoji: "🧠",
    bg: "linear-gradient(135deg,#E8F5F3 0%,#FDF0EB 100%)",
    badgeColor: "#1A7A6E",
    av: "#2A9D8F",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-05-12",
    read: "6 Min",
    de: {
      title: "KI-Angst verstehen — und entschärfen",
      excerpt: "Die Sorge vor künstlicher Intelligenz ist real und berechtigt. Doch Angst ist ein schlechter Ratgeber. So findest du einen klaren Kopf.",
      content: `
<p>„Werde ich ersetzt?" Diese Frage geht gerade durch unzählige Köpfe. Die Angst vor KI ist keine Einbildung — und doch lohnt es sich, genauer hinzusehen, woraus sie besteht.</p>
<h2>Drei Schichten der Angst</h2>
<p><strong>Die wirtschaftliche:</strong> Verliere ich meinen Job? <strong>Die existenzielle:</strong> Was bin ich wert, wenn Maschinen denken? <strong>Die Kontrollangst:</strong> Wer steuert das alles eigentlich?</p>
<h2>Angst trennen von Information</h2>
<p>Angst verallgemeinert und beschleunigt. Hilfreich ist, sie zu zerlegen: Was weiß ich wirklich? Was nehme ich nur an? Worüber habe ich Einfluss, worüber nicht? Diese Trennung verwandelt diffuse Bedrohung in konkrete, bearbeitbare Fragen.</p>
<h2>Vom Sorgen zum Gestalten</h2>
<p>Du kannst die Entwicklung der KI nicht allein steuern. Aber du kannst lernen, sie zu nutzen, deine eigenen Fähigkeiten weiterzuentwickeln und für eine menschliche Anwendung einzustehen. Handeln ist das beste Gegenmittel gegen Ohnmacht.</p>
`
    },
    en: {
      title: "Understanding — and defusing — AI anxiety",
      excerpt: "The worry about artificial intelligence is real and valid. But fear is a poor advisor. Here's how to find a clear head.",
      content: `
<p>"Will I be replaced?" That question is running through countless minds. AI anxiety is no illusion — yet it's worth looking closely at what it's made of.</p>
<h2>Three layers of fear</h2>
<p><strong>Economic:</strong> will I lose my job? <strong>Existential:</strong> what am I worth if machines think? <strong>Control:</strong> who's steering all this?</p>
<h2>Separating fear from information</h2>
<p>Fear generalizes. It helps to break it down: what do I actually know? What am I only assuming? Where do I have influence?</p>
<h2>From worrying to shaping</h2>
<p>You can't steer AI's development alone. But you can learn to use it and stand up for a human application. Acting is the best antidote to powerlessness.</p>
`
    },
    es: {
      title: "Entender — y desactivar — la ansiedad por la IA",
      excerpt: "La preocupación por la inteligencia artificial es real y legítima. Pero el miedo es mal consejero.",
      content: `
<p>"¿Me reemplazarán?" Esa pregunta recorre innumerables mentes. La ansiedad por la IA no es ilusión, pero vale mirar de qué está hecha.</p>
<h2>Tres capas del miedo</h2>
<p><strong>Económica:</strong> ¿perderé mi trabajo? <strong>Existencial:</strong> ¿qué valgo si las máquinas piensan? <strong>De control:</strong> ¿quién dirige todo esto?</p>
<h2>Separar miedo de información</h2>
<p>El miedo generaliza. Ayuda desglosarlo: ¿qué sé de verdad? ¿qué solo supongo? ¿dónde tengo influencia?</p>
<h2>De preocuparse a dar forma</h2>
<p>No puedes dirigir el desarrollo de la IA solo. Pero puedes aprender a usarla. Actuar es el mejor antídoto.</p>
`
    }
  },
  {
    id: 12,
    cat: "future",
    emoji: "🎨",
    bg: "linear-gradient(135deg,#FDF0EB 0%,#FFF8EC 100%)",
    badgeColor: "#E8856A",
    av: "#E8856A",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-05-05",
    read: "5 Min",
    de: {
      title: "Kreativität als menschlicher Kern",
      excerpt: "Wenn KI Bilder malt und Texte schreibt — wozu noch selbst kreativ sein? Weil Kreativität nie nur das Ergebnis war.",
      content: `
<p>Eine verbreitete Sorge: Wenn Maschinen Kunst, Musik und Texte erzeugen, wird menschliche Kreativität dann überflüssig? Die Frage verwechselt das Produkt mit dem Prozess.</p>
<h2>Der Wert liegt im Tun</h2>
<p>Wenn du malst, schreibst oder musizierst, verändert das dich — unabhängig davon, ob eine Maschine es „besser" könnte. Kreativität ist eine Form, sich selbst auszudrücken und die Welt zu verarbeiten. Dieser innere Wert lässt sich nicht automatisieren.</p>
<h2>KI als Werkzeug, nicht als Ersatz</h2>
<p>Der Pinsel hat den Maler nicht ersetzt. Die Kamera hat die Malerei nicht beendet — sie hat sie befreit, abstrakt zu werden. KI kann ein neues Werkzeug sein, wenn der gestaltende Impuls von dir kommt.</p>
<h2>Bleib der Autor deines Ausdrucks</h2>
<p>Nutze die Werkzeuge, aber gib die Urheberschaft deiner Stimme nicht ab. Das, was nur du zu sagen hast, kann keine Maschine wissen.</p>
`
    },
    en: {
      title: "Creativity as the human core",
      excerpt: "If AI paints pictures and writes texts — why be creative yourself? Because creativity was never only the result.",
      content: `
<p>A common worry: if machines make art, music and texts, does human creativity become obsolete? The question confuses the product with the process.</p>
<h2>The value is in the doing</h2>
<p>When you paint, write or make music, it changes you — regardless of whether a machine could do it "better." This inner value can't be automated.</p>
<h2>AI as tool, not replacement</h2>
<p>The brush didn't replace the painter. The camera didn't end painting — it freed it to become abstract.</p>
<h2>Stay the author of your expression</h2>
<p>Use the tools, but don't hand over authorship of your voice. What only you have to say, no machine can know.</p>
`
    },
    es: {
      title: "La creatividad como núcleo humano",
      excerpt: "Si la IA pinta cuadros y escribe textos, ¿para qué ser creativo? Porque la creatividad nunca fue solo el resultado.",
      content: `
<p>Una preocupación común: si las máquinas crean arte, música y textos, ¿se vuelve obsoleta la creatividad humana? La pregunta confunde el producto con el proceso.</p>
<h2>El valor está en el hacer</h2>
<p>Cuando pintas, escribes o haces música, eso te transforma, sin importar si una máquina lo haría "mejor".</p>
<h2>La IA como herramienta, no sustituto</h2>
<p>El pincel no reemplazó al pintor. La cámara no terminó la pintura: la liberó.</p>
<h2>Sé el autor de tu expresión</h2>
<p>Usa las herramientas, pero no cedas la autoría de tu voz.</p>
`
    }
  },

  /* ═══════════════ MINDFUL (weitere) ═══════════════ */
  {
    id: 13,
    cat: "mindful",
    emoji: "🍵",
    bg: "linear-gradient(135deg,#FAF7F2 0%,#FFF8EC 100%)",
    badgeColor: "#1A7A6E",
    av: "#1A7A6E",
    author: "BJ",
    authorName: "BeJoy Redaktion",
    date: "2026-04-26",
    read: "4 Min",
    de: {
      title: "Eine Sache nach der anderen",
      excerpt: "Multitasking fühlt sich produktiv an und macht uns langsamer, fehleranfälliger und unzufriedener. Die Alternative ist überraschend einfach.",
      content: `
<p>Wir tragen Multitasking wie eine Auszeichnung. Dabei zeigt die Forschung seit Jahren: Das Gehirn kann nicht wirklich parallel denken — es springt nur schnell hin und her. Und jeder Sprung kostet Energie und Aufmerksamkeit.</p>
<h2>Die versteckten Kosten</h2>
<p>Wer ständig zwischen Aufgaben wechselt, braucht länger, macht mehr Fehler und fühlt sich erschöpfter. Schlimmer noch: Man ist nirgends ganz da.</p>
<h2>Single-Tasking als Achtsamkeitspraxis</h2>
<p>Eine Sache. Volle Aufmerksamkeit. Bis sie fertig oder die Zeit um ist. Das klingt banal, ist aber eine der wirkungsvollsten Achtsamkeitsübungen — weil sie nicht auf dem Kissen, sondern mitten im Leben stattfindet.</p>
<h2>Heute ausprobieren</h2>
<p>Wähle eine Tätigkeit — Geschirr spülen, ein Gespräch, eine E-Mail — und tue nur das. Wenn der Geist abschweift, hol ihn freundlich zurück. Das ist die ganze Übung.</p>
`
    },
    en: {
      title: "One thing at a time",
      excerpt: "Multitasking feels productive and makes us slower, more error-prone and less content. The alternative is surprisingly simple.",
      content: `
<p>We wear multitasking like a badge. Yet research has shown for years: the brain can't truly think in parallel — it just jumps quickly back and forth, and each jump costs energy.</p>
<h2>The hidden costs</h2>
<p>Constantly switching tasks takes longer, causes more errors, and is more exhausting. Worse: you're never fully anywhere.</p>
<h2>Single-tasking as mindfulness</h2>
<p>One thing. Full attention. Until it's done or time's up. It's one of the most effective mindfulness practices — because it happens in the middle of life.</p>
<h2>Try it today</h2>
<p>Pick one activity and do only that. When the mind wanders, bring it back kindly. That's the whole practice.</p>
`
    },
    es: {
      title: "Una cosa a la vez",
      excerpt: "La multitarea parece productiva y nos hace más lentos, más propensos a errores y menos satisfechos.",
      content: `
<p>Llevamos la multitarea como una medalla. Pero la investigación lo muestra: el cerebro no piensa en paralelo, solo salta rápido de un lado a otro.</p>
<h2>Los costes ocultos</h2>
<p>Cambiar de tarea constantemente lleva más tiempo y causa más errores. Peor aún: nunca estás del todo en ningún sitio.</p>
<h2>La monotarea como práctica de atención</h2>
<p>Una cosa. Plena atención. Hasta terminar. Es una de las prácticas de atención más eficaces.</p>
<h2>Pruébalo hoy</h2>
<p>Elige una actividad y haz solo eso. Cuando la mente divague, tráela de vuelta con amabilidad.</p>
`
    }
  }

];

/* Sidebar / "Auch interessant"-Liste (Titel der verwandten Beiträge) */
window.sidebarPosts = [
  { de: "Der Atem als Reset-Knopf", en: "The breath as a reset button", es: "La respiración como botón de reinicio" },
  { de: "Resilienz ist kein Panzer", en: "Resilience is not armor", es: "La resiliencia no es una armadura" },
  { de: "Ikigai: der Grund aufzustehen", en: "Ikigai: the reason to get up", es: "Ikigai: la razón para levantarse" },
  { de: "Kreativität als menschlicher Kern", en: "Creativity as the human core", es: "La creatividad como núcleo humano" }
];
