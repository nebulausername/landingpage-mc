# 🌳 landing-mc Pro · v2

> **Eine schöne Landing-Page für deinen Minecraft-Server, die auch wirklich verkauft.**
> Du brauchst kein Programmierer zu sein. Wenn du klicken kannst, kannst du das.

Das hier ist eine **professionelle, conversion-optimierte Webseite-Vorlage**. Du kaufst sie einmal, machst sie zu **deiner** Webseite (eigener Name, eigene Farben, eigene Texte) und stellst sie online. Das war's.

**Neu in v2:** 9 zusätzliche Sektionen — Testimonials, Galerie, Team, Vote-Liste, Roadmap, Live-Discord, Vergleichstabelle, Newsletter und ein Trust-Bar — alle in 3 Sprachen, alle aus einer einzigen Config-Datei steuerbar.

---

## Was du am Ende hast

Eine moderne Webseite für deinen Server mit:

### Sektionen (auf einer Seite, in dieser Reihenfolge)

1. **Hero** mit Parallax-Szene und Live-Spielerzahl
2. **Trust-Bar** — drei Vertrauenssignale auf einen Blick
3. **Stats** — Zahlen, die zur Größe sprechen
4. **Welten** — asymmetrisches Grid für alle Spielmodi
5. **Features** — Bento-Grid mit hervorgehobenem Zitat
6. **Testimonials** — Spieler-Stimmen mit Sternen und Avataren
7. **Galerie** — Lightbox mit Tastatur-Navigation
8. **Ränge** — drei Tiers mit Geld-zurück-Garantie
9. **Vergleichstabelle** — du vs. typischer großer SMP
10. **Roadmap** — vertikale Timeline mit Status-Badges
11. **Team** — Staff-Karten mit Minecraft-Avataren und Online-Status
12. **Discord-Widget** — Live-Mitgliederliste eingebettet
13. **Vote-Liste** — Vote-Sites mit Belohnungs-Bar
14. **FAQ** — Akkordeon mit erweiterten Fragen
15. **Newsletter** — Lead-Capture mit Discord-Webhook
16. **CTA** — finaler Push mit IP

### Technisch

- ✨ **Hell- und Dunkelmodus** — wechselt automatisch je nach Tageszeit
- 🌍 **Drei Sprachen** — Deutsch, Englisch, Spanisch (automatisch erkannt)
- 📋 **IP-Kopieren-Knopf** — überall: Nav, Hero, Footer, CTA-Band
- 📊 **Live Spielerzahl** (optional) — wird automatisch vom Server geholt
- 📨 **Newsletter** mit Discord-Webhook und Rate-Limit
- 🔎 **JSON-LD strukturierte Daten** — Google zeigt Stars/FAQ/Preis direkt im Suchergebnis
- 🖼️ **Dynamisches Open-Graph-Bild** — schöne Vorschau auf Discord, X, WhatsApp
- 📈 **Privacy-friendly Analytics** (Plausible / Umami / aus) — DSGVO ohne Cookie-Banner
- 📱 **Funktioniert überall** — Handy, Tablet, Computer, alles
- 🎨 **Editorial Design** — sieht aus wie ein Magazin, nicht wie ein 0815-Template
- ⚡ **Blitzschnell** — lädt in unter einer Sekunde

---

## 🚀 Der einfachste Weg: Klick. Klick. Live. (Etwa 3 Minuten)

Du brauchst nichts zu installieren. Wirklich. Nur zwei Konten:
1. Ein **GitHub-Konto** (kostenlos, [github.com/signup](https://github.com/signup))
2. Ein **Vercel-Konto** (kostenlos, [vercel.com/signup](https://vercel.com/signup))

**Pro-Tipp:** 💡 Bei Vercel kannst du dich mit deinem GitHub-Konto einloggen.

### Schritt 1: Lade die Dateien zu GitHub hoch

1. Auf [github.com/new](https://github.com/new) ein neues Repository erstellen
2. Du landest auf einer fast leeren Seite. Da steht **"uploading an existing file"** als Link. Klick drauf.
3. Entpacke unsere ZIP-Datei. Du hast jetzt einen Ordner `landing-mc-next/`.
4. **Ziehe ALLE Dateien aus dem Ordner** (nicht den Ordner selbst!) ins Upload-Feld.
5. Unten auf "Commit changes" klicken. Fertig. 🎉

### Schritt 2: Verbinde GitHub mit Vercel

1. Gehe zu [vercel.com/new](https://vercel.com/new)
2. **Such dein Repo** in der Liste → klick **"Import"** → **"Deploy"**
3. Warte ~60 Sekunden.
4. ✅ **FERTIG.**

### Schritt 3 (optional): Eigene Domain

Vercel → Projekt → "Settings" → "Domains" → Deine Domain eingeben. Vercel zeigt dir die DNS-Einträge.

---

## ✏️ Was an der Seite ändern? Hier:

Diese Webseite soll **deine** sein. Schummelliste:

| Wenn du das ändern willst... | ...öffne diese Datei |
|---|---|
| Server-Name, IP, Discord, Store | `lib/config.ts` (oben drin) |
| Welten / Spielmodi | `lib/config.ts` (suche `worlds`) |
| Ränge und Preise | `lib/config.ts` (suche `ranks`) |
| **Testimonials** (Spieler-Stimmen) | `lib/config.ts` + Texte in `lib/translations/*.ts` |
| **Galerie-Bilder** | Bilder in `/public/gallery/`, Bildunterschriften in `lib/translations/*.ts` |
| **Team-Mitglieder** | `lib/config.ts` (suche `staff`) + Texte in Translations |
| **Vote-Sites** | `lib/config.ts` (suche `voteSites`) |
| **Roadmap-Einträge** | `lib/config.ts` (suche `roadmap`) + Texte in Translations |
| **Vergleichstabelle** | `lib/config.ts` (suche `comparison`) |
| **Newsletter aktivieren** | `enableNewsletter: true` + `CONTACT_WEBHOOK_URL` env |
| **Analytics aktivieren** | `analytics:` in `lib/config.ts` |
| **Discord-Widget aktivieren** | `discordWidgetId` in `lib/config.ts` |
| **Farben** der ganzen Seite | `app/globals.css` (oben drin) |
| Deutsche Texte | `lib/translations/de.ts` |
| Englische Texte | `lib/translations/en.ts` |
| Spanische Texte | `lib/translations/es.ts` |
| Das Logo | `components/Nav.tsx` (suche nach `Logo`) |

---

## 🛠️ Admin-Panel — alles ohne Code anpassen

**v2 hat ein vollständiges Admin-Panel** unter `/admin`. Damit kannst du Server-Infos, Ränge, Testimonials, Galerie, Team, FAQ und alle Texte (in allen Sprachen) bearbeiten ohne eine einzige Datei direkt anzufassen.

### So aktivierst du es

1. In `.env.local` (oder bei Vercel als Environment Variable):
   ```
   ADMIN_PASSWORD=DeinSicheresPasswort123
   ```
   (min. 6 Zeichen — nimm mind. 12 zufällige Zeichen in Produktion)
2. Server neu starten (lokal: Strg+C, dann `npm run dev`)
3. Gehe zu `http://localhost:3000/admin`
4. Passwort eingeben — fertig

### Was kann ich im Admin?

| Tab | Was du dort änderst |
|---|---|
| **Server** | Name, IP, Version, Discord, Store, Status-API, Discord-Widget-ID, Tagline, Social-Links |
| **Worlds** | Welche Spielmodi gezeigt werden, welcher ist groß (featured) |
| **Ranks** | Preise, Buy-URLs, Perks, Texte je Sprache, Garantie-Zeile |
| **Testimonials** | Spieler-Quotes hinzufügen/entfernen, Sterne, Badge, Quote in allen Sprachen |
| **Gallery** | **Drag & Drop Bilder-Upload** → landet direkt in `public/gallery/`, Captions je Sprache |
| **Staff** | Team-Mitglieder mit Rolle, Bio in allen Sprachen, Seit-Datum |
| **Vote** | Vote-Site-URLs + Anzeigenamen + Reward-Text |
| **Roadmap** | Quartal-Einträge mit Status (done/now/next/later) |
| **Compare** | Vergleichszeilen (Du vs. typischer Server) |
| **FAQ** | Anzahl Fragen + Q&A in allen Sprachen |
| **Texts** | Hero, CTA-Band, Newsletter, Nav, Footer, Discord-Sektion — komplette Marketing-Copy |
| **Settings** | Standard-Theme, Standard-Sprache, Site-URL, Newsletter-Sektion an/aus, Analytics-Provider |

### Wie Save funktioniert

- Im **Dev-Modus** (`npm run dev`): Admin schreibt direkt `lib/config.ts` und `lib/translations/*.ts` → Next.js HMR aktualisiert die Live-Site **sofort** ohne Refresh.
- Im **Produktions-Modus** (Vercel): Filesystem ist read-only. Du nutzt das Admin lokal, machst deine Änderungen, dann `git commit` + `git push` → Vercel baut neu mit deinen Werten.

### Sicherheit

- HMAC-signierter Session-Cookie (HttpOnly, SameSite=Strict, 7 Tage)
- Passwort wird mit timing-safe compare verglichen
- `/admin` und alle `/api/admin/*` sind über `robots.txt` von Suchmaschinen ausgeschlossen
- Ohne `ADMIN_PASSWORD` env-var: Admin ist komplett deaktiviert (auch der Login zeigt nur einen Hinweis)

---

## 🎯 Neue Features in v2 — wie aktivieren

### Newsletter / Lead-Capture

1. In Discord: Server-Einstellungen → Integrationen → Webhooks → "Neuer Webhook" → URL kopieren
2. In Vercel: Projekt → Settings → Environment Variables → **Name:** `CONTACT_WEBHOOK_URL` **Wert:** die URL einfügen
3. Redeploy (passiert automatisch beim nächsten Push, oder manuell im Vercel-Dashboard)
4. Jedes Newsletter-Signup landet jetzt direkt in deinem Discord-Kanal als schöne Embed-Nachricht

### Live-Discord-Widget

1. In Discord: dein Server → Einstellungen → Widget → "Server-Widget aktivieren" einschalten → Server-ID kopieren
2. In `lib/config.ts`:
   ```ts
   server: {
     ...
     discordWidgetId: 'DEINE_SERVER_ID',  // ← einsetzen
   }
   ```
3. Commit, Vercel baut neu, fertig. Das Widget zeigt jetzt deine echte Online-Liste.

### Analytics (DSGVO-konform, ohne Cookies)

In `lib/config.ts`:

```ts
analytics: {
  provider: 'plausible',
  domain:    'deinserver.de',
  scriptUrl: 'https://plausible.io/js/script.js',
}
```

Plausible ist nicht kostenlos (9 €/Monat), aber DSGVO-konform und du brauchst **keinen Cookie-Banner**. Alternative: Umami self-hosten (kostenlos).

### Galerie-Bilder einsetzen

1. Bilder im Format `.jpg` oder `.webp` (max ~500 KB pro Bild empfohlen) in den Ordner `public/gallery/` legen
2. Dateinamen müssen den Schlüsseln in `lib/config.ts` → `gallery` entsprechen: `spawn.jpg`, `market.jpg`, etc.
3. Bildunterschriften kommen aus `lib/translations/*.ts` → `gallery.captions`
4. Wenn ein Bild fehlt, wird automatisch ein schöner Farbverlauf als Fallback gezeigt — alles funktioniert auch ohne Bilder

### Eigene Testimonials

In `lib/config.ts` → `testimonials`: Liste von Minecraft-Usernames. Avatare werden automatisch von [mc-heads.net](https://mc-heads.net) geholt — du brauchst nichts hochzuladen.

Die Quotes selbst stehen in `lib/translations/*.ts` → `testimonials.items.<Username>`.

---

## 🆘 Hilfe! Was wenn...

### "Vercel zeigt 'Build Failed'"
- Klick auf "View Build Logs", such nach roten "Error"-Zeilen
- Häufigster Grund: vergessenes Komma oder Anführungszeichen in `config.ts`
- Geh zur Datei zurück, repariere, committe → Vercel versucht's nochmal automatisch

### "Newsletter funktioniert nicht"
- Hast du `CONTACT_WEBHOOK_URL` in den Vercel Environment Variables gesetzt?
- Hast du nach dem Setzen ein **Redeploy** ausgelöst? (Vercel-Dashboard → Deployments → drei Punkte → "Redeploy")
- Test mit echtem Submit, check den Discord-Kanal

### "Discord-Widget zeigt 'Server widget'-Platzhalter"
Das ist der Fallback wenn `discordWidgetId` noch null ist. Setze die ID wie oben beschrieben.

### "Live-Spielerzahl zeigt immer die gleiche Zahl"
Solange `statusApi` null ist, kommen Fallback-Werte. In `lib/config.ts`:
```ts
server: { ..., statusApi: 'https://api.mcsrvstat.us/3/play.deinserver.com' }
```

### "Galerie-Bilder werden nicht angezeigt"
Bilder müssen unter `/public/gallery/` liegen und exakt die Dateinamen aus `lib/config.ts` → `gallery` haben. Bei fehlenden Bildern wird ein Farbverlauf-Fallback angezeigt.

---

## 🤓 Für die Tech-Leute: lokal entwickeln

```bash
npm install
npm run dev
```

Browser öffnet automatisch auf `http://localhost:3000`. Änderungen erscheinen sofort.

### Environment Variables

Lege eine Datei `.env.local` an (siehe `.env.example`):

```bash
CONTACT_WEBHOOK_URL=https://discord.com/api/webhooks/.../...
```

### Statisches Hosting

1. In `next.config.mjs` `output: 'export'` aktivieren
2. `npm run build` → `out/`-Ordner per FTP hochladen

⚠️ **Hinweis:** Im Static-Export-Modus funktionieren die API-Routes (`/api/contact`) und das dynamische OG-Bild **nicht**. Für Newsletter brauchst du dann einen externen Service (z.B. Formspree).

---

## 📂 Was ist in welcher Datei?

```
landing-mc-next/
├── 🎨 app/
│   ├── globals.css            ← Farben & Schriften
│   ├── layout.tsx             ← Rahmen + Meta-Tags + Analytics
│   ├── page.tsx               ← Hauptseite (16 Sektionen)
│   ├── opengraph-image.tsx    ← Dynamisches OG-Bild für Social Shares
│   ├── api/contact/route.ts   ← Newsletter-API → Discord-Webhook
│   ├── icon.svg, not-found.tsx, error.tsx, robots.ts, sitemap.ts
│
├── 🧱 components/
│   ├── Nav.tsx, Hero.tsx, TrustBar.tsx, Stats.tsx,
│   ├── Worlds.tsx, Features.tsx, Testimonials.tsx, Gallery.tsx,
│   ├── Ranks.tsx, Comparison.tsx, Roadmap.tsx, Staff.tsx,
│   ├── DiscordWidget.tsx, Vote.tsx, FAQ.tsx, Newsletter.tsx,
│   ├── CTABand.tsx, Footer.tsx
│   ├── Analytics.tsx           ← Plausible/Umami loader
│   └── JsonLd.tsx              ← Strukturierte Daten für Google
│
├── ⚙️  lib/
│   ├── config.ts               ← 🌟 HIER ÄNDERST DU AM MEISTEN
│   ├── translations/           ← Texte in 3 Sprachen
│   ├── avatar.ts               ← Minecraft-Head-URL-Helfer
│   ├── providers.tsx, hooks.ts, types.ts
│
├── 🖼️  public/
│   ├── gallery/                ← deine Screenshots hier rein
│
├── 📜 README.md, LICENSE.md, LISTING.md
├── 📜 .env.example             ← Vorlage für Webhook-URL
├── 📦 package.json
└── 🛠 setup.sh / setup.bat
```

---

## 📜 Lizenz

Du hast eine **Single-Server-Lizenz** (über BuiltByBit). Du darfst:

- ✅ Diese Vorlage für **deinen Minecraft-Server** verwenden
- ✅ Sie nach Belieben anpassen
- ✅ Mehrere Server, wenn du sie selbst betreibst

Du darfst **nicht**:
- ❌ Die Vorlage weiterverkaufen oder verschenken
- ❌ Den Quellcode öffentlich auf GitHub stellen (private Repos sind ok)
- ❌ Für Kunden Webseiten damit bauen und verkaufen (dafür gibt's Multi-License)

Siehe `LICENSE.md`.

---

## 💬 Brauchst du Hilfe?

Schreib mir in der BuiltByBit-Resource-Konversation. **Frag einfach.**

---

<p align="center">
  <strong>Built slow. Played warm. Made for Minecrafter:innen, von Minecrafter:innen.</strong>
</p>
