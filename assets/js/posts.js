/**
 * BeJoy — Blog Posts Data
 * ─────────────────────────────────────────────────────────────
 * Hier fügst du neue Blogartikel hinzu.
 * Einfach ein neues Objekt ans Array anhängen.
 *
 * Felder:
 *   id        — eindeutige Zahl (immer +1 zum letzten Eintrag)
 *   cat       — "mindful" | "joyful" | "resilient" | "future" | "worldwide"
 *   emoji     — passendes Emoji für den Artikelthumb
 *   bg        — CSS gradient für den Thumb-Hintergrund
 *   badgeColor— Farbe des Kategorie-Badges
 *   date      — Datum als String (z.B. "4. Jun 2026")
 *   read      — Lesezeit (z.B. "5 Min")
 *   wide      — true = großer Featured-Card (nur 1x verwenden!)
 *   de/en/es  — Übersetzungen: { title, excerpt }
 *   author    — Kürzel (2 Buchstaben)
 *   authorName— Voller Name
 *   av        — Avatar-Hintergrundfarbe (CSS-Variable oder Hex)
 *
 * TIPP: Claude kann dir neue Einträge direkt schreiben lassen.
 * Prompt: "Schreib einen BeJoy-Post über [Thema], Kategorie [X]"
 * ─────────────────────────────────────────────────────────────
 */

window.posts = [
  {
    id: 1,
    cat: "mindful",
    emoji: "🧘‍♀️",
    bg: "linear-gradient(135deg,#E8F5F3,#FAF7F2)",
    badgeColor: "var(--teal)",
    date: "3. Jun 2026",
    read: "8 Min",
    wide: true,
    de: {
      title: "Achtsamkeit in der KI-Ära: Wie wir unser inneres Gleichgewicht bewahren",
      excerpt: "Wenn Algorithmen unsere Arbeit übernehmen — was bleibt von uns? Eine Betrachtung über Präsenz, Menschlichkeit und die stille Revolution des Innehaltens."
    },
    en: {
      title: "Mindfulness in the AI Age: Preserving Our Inner Balance",
      excerpt: "When algorithms take over our work — what remains of us? A reflection on presence, humanity and the quiet revolution of stillness."
    },
    es: {
      title: "Mindfulness en la Era de la IA: Preservar el Equilibrio Interior",
      excerpt: "Cuando los algoritmos se apoderan de nuestro trabajo — ¿qué queda de nosotros?"
    },
    author: "BJ", authorName: "BeJoy Redaktion", av: "var(--teal)"
  },
  {
    id: 2,
    cat: "joyful",
    emoji: "🌸",
    bg: "linear-gradient(135deg,#FDF0EB,#FAF7F2)",
    badgeColor: "var(--rose)",
    date: "28. Mai 2026",
    read: "5 Min",
    wide: false,
    de: {
      title: "Ikigai: Der japanische Schlüssel zu einem sinnerfüllten Leben",
      excerpt: "Was du liebst, was du kannst, was die Welt braucht — wo das zusammentrifft, liegt dein Ikigai."
    },
    en: {
      title: "Ikigai: The Japanese Key to a Purposeful Life",
      excerpt: "What you love, what you're good at, what the world needs — where these meet lies your Ikigai."
    },
    es: {
      title: "Ikigai: La Clave Japonesa para una Vida con Propósito",
      excerpt: "Lo que amas, lo que sabes hacer, lo que el mundo necesita — donde se encuentran está tu Ikigai."
    },
    author: "MK", authorName: "Maria K.", av: "var(--rose)"
  },
  {
    id: 3,
    cat: "resilient",
    emoji: "💪",
    bg: "linear-gradient(135deg,#FFF9E6,#FAF7F2)",
    badgeColor: "var(--joy-dark)",
    date: "22. Mai 2026",
    read: "6 Min",
    wide: false,
    de: {
      title: "Resilienz ist kein Talent — es ist eine Übung",
      excerpt: "Wie du dein Nervensystem trainierst, um Unsicherheit als Chance zu sehen statt als Bedrohung."
    },
    en: {
      title: "Resilience Is Not a Talent — It's a Practice",
      excerpt: "How to train your nervous system to see uncertainty as opportunity rather than threat."
    },
    es: {
      title: "La Resiliencia No es un Talento — es una Práctica",
      excerpt: "Cómo entrenar tu sistema nervioso para ver la incertidumbre como oportunidad."
    },
    author: "TW", authorName: "Thomas W.", av: "var(--joy)"
  },
  {
    id: 4,
    cat: "worldwide",
    emoji: "🌍",
    bg: "linear-gradient(135deg,#F0EDE8,#FAF7F2)",
    badgeColor: "#8B7355",
    date: "15. Mai 2026",
    read: "7 Min",
    wide: false,
    de: {
      title: "Ubuntu: Das afrikanische Weisheitsprinzip, das uns transformieren kann",
      excerpt: "\"Ich bin, weil wir sind.\" — Warum kollektives Wohlbefinden die Grundlage individuellen Glücks ist."
    },
    en: {
      title: "Ubuntu: The African Wisdom That Can Transform Society",
      excerpt: "\"I am because we are.\" — Why collective wellbeing is the foundation of individual happiness."
    },
    es: {
      title: "Ubuntu: La Sabiduría Africana Que Puede Transformarnos",
      excerpt: "\"Soy porque somos.\" — Por qué el bienestar colectivo es la base de la felicidad individual."
    },
    author: "AN", authorName: "Amara N.", av: "#8B7355"
  },
  {
    id: 5,
    cat: "future",
    emoji: "🤖",
    bg: "linear-gradient(135deg,#E8F5F3,#EFF9F7)",
    badgeColor: "var(--earth)",
    date: "8. Mai 2026",
    read: "9 Min",
    wide: false,
    de: {
      title: "Wenn KI denkt — wer bist dann du?",
      excerpt: "Über Kreativität, Neugier und das, was uns als Menschen einzigartig und unersetzbar macht."
    },
    en: {
      title: "When AI Thinks — Who Are You Then?",
      excerpt: "On creativity, curiosity and what makes us uniquely and irreplaceably human."
    },
    es: {
      title: "Cuando la IA Piensa — ¿Quién Eres Tú?",
      excerpt: "Sobre la creatividad, la curiosidad y lo que nos hace únicamente humanos."
    },
    author: "BJ", authorName: "BeJoy Redaktion", av: "var(--teal)"
  },
  {
    id: 6,
    cat: "mindful",
    emoji: "🌿",
    bg: "linear-gradient(135deg,#E8F5F3,#F0FBF9)",
    badgeColor: "var(--teal)",
    date: "1. Mai 2026",
    read: "5 Min",
    wide: false,
    de: {
      title: "Breathwork: Wie dein Atem dein Nervensystem heilt",
      excerpt: "Die Wissenschaft hinter bewusstem Atmen — und drei einfache Übungen für sofortige Ruhe."
    },
    en: {
      title: "Breathwork: How Your Breath Heals Your Nervous System",
      excerpt: "The science behind conscious breathing — and three simple exercises for instant calm."
    },
    es: {
      title: "Respiración Consciente: Cómo tu Aliento Sana tu Sistema Nervioso",
      excerpt: "La ciencia detrás de la respiración consciente — y tres ejercicios para calma inmediata."
    },
    author: "BJ", authorName: "BeJoy Redaktion", av: "var(--teal)"
  }

  // ── NEUER POST: hier einfügen ──────────────────────────────
  // {
  //   id: 7,
  //   cat: "joyful",
  //   emoji: "☀️",
  //   bg: "linear-gradient(135deg,#FFF9E6,#FAF7F2)",
  //   badgeColor: "var(--joy)",
  //   date: "10. Jun 2026",
  //   read: "6 Min",
  //   wide: false,
  //   de: { title: "...", excerpt: "..." },
  //   en: { title: "...", excerpt: "..." },
  //   es: { title: "...", excerpt: "..." },
  //   author: "BJ", authorName: "BeJoy Redaktion", av: "var(--teal)"
  // },
];
