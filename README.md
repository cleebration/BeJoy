# BeJoy — bejoy.life

Globaler Blog für Mindfulness, Resilienz und selbstbestimmtes Leben in der KI-Ära.

## Struktur

```
bejoy/
├── index.html                  ← Hauptseite
├── vercel.json                 ← Vercel-Konfiguration
├── robots.txt                  ← Für Suchmaschinen
├── sitemap.xml                 ← SEO
├── assets/
│   ├── css/
│   │   └── main.css            ← Alle Styles
│   ├── js/
│   │   ├── i18n.js             ← Übersetzungen (DE/EN/ES)
│   │   ├── posts.js            ← Blog-Artikel ← HIER neue Posts eintragen
│   │   └── app.js              ← Logik (Filter, Cursor, Nav, etc.)
│   └── images/logo/            ← SVG Logo-Varianten
├── blog/
│   └── posts/                  ← Spätere Einzelartikel-Seiten
└── public/
    ├── favicon.ico
    ├── favicon_32.svg
    └── og-image.png            ← Social-Sharing-Bild
```

## Neuen Blogartikel hinzufügen

1. `assets/js/posts.js` öffnen
2. Neues Objekt ans Array anhängen (Vorlage am Ende der Datei)
3. Committen → Vercel deployed automatisch

### Schneller mit Claude:
> "Schreib einen BeJoy-Blogartikel über [Thema], Kategorie [mindful/joyful/resilient/future/worldwide], ca. [X] Wörter"
→ Ausgabe direkt als `posts.js`-Objekt kopieren & einfügen

## Deployment

Verbunden mit Vercel → jeder Push auf `main` = automatisches Deployment.

## Farben

| Name         | Hex       | Verwendung              |
|--------------|-----------|-------------------------|
| Saffron Joy  | `#F5A623` | Akzent, CTA, Logo       |
| Ocean Teal   | `#1A7A6E` | Ruhe, Navigation, Links |
| Deep Earth   | `#2C1810` | Text, Footer            |
| Warm Rose    | `#E8856A` | Badges, Highlights      |
| Soft Cream   | `#FAF7F2` | Hintergrund             |
