import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'fs'
import { posts } from './src/data.js'

const SITE = 'https://bejoy.life'

const slugify = (s) =>
  (s || '').toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/&/g, ' und ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const xesc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const rfc822 = (d) => new Date(d + 'T08:00:00Z').toUTCString().replace('GMT', '+0000')

function buildFeed() {
  const ordered = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
  const items = ordered
    .map((p) => {
      const slug = slugify(p.de?.title || '')
      return `    <item>
      <title>${xesc(p.de.title)}</title>
      <link>${SITE}/blog/${slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${slug}</guid>
      <category>${xesc(p.cat)}</category>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${xesc(p.de.excerpt)}</description>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BeJoy – Blog</title>
    <link>${SITE}/</link>
    <description>Achtsamkeit, Resilienz und selbstbestimmtes Leben — Mindful · Joyful · Resilient · Future-Self · Worldwide.</description>
    <language>de</language>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`
}

function rssFeedPlugin() {
  return {
    name: 'bejoy-rss-feed',
    buildStart() {
      writeFileSync('public/feed.xml', buildFeed())
      console.log('[bejoy-rss-feed] public/feed.xml regenerated from data.js')
    },
  }
}

export default defineConfig({
  plugins: [react(), rssFeedPlugin()],
})
