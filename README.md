# 🌳 landing-mc Pro

> **Eine schöne Landing-Page für deinen Minecraft-Server.**
> Du brauchst kein Programmierer zu sein. Wenn du klicken kannst, kannst du das.

Das hier ist eine professionelle Webseite-Vorlage. Du kaufst sie einmal, machst sie zu **deiner** Webseite (eigener Name, eigene Farben, eigene Texte) und stellst sie online. Das war's.

---

## Was du am Ende hast

Eine moderne Webseite für deinen Server mit:

- ✨ **Hell- und Dunkelmodus** — wechselt automatisch je nach Tageszeit deiner Besucher
- 🌍 **Drei Sprachen** — Deutsch, Englisch, Spanisch (automatisch erkannt)
- 📋 **IP-Kopieren-Knopf** — Besucher klicken einmal, fertig
- 📊 **Live Spielerzahl** (optional) — wird automatisch von deinem Server geholt
- 📱 **Funktioniert überall** — Handy, Tablet, Computer, alles
- 🎨 **Editorial Design** — sieht aus wie ein Magazin, nicht wie ein 0815-Template
- ⚡ **Blitzschnell** — lädt in unter einer Sekunde

---

## 🚀 Der einfachste Weg: Klick. Klick. Live. (Etwa 3 Minuten)

Du brauchst nichts zu installieren. Wirklich. Nur zwei Konten:
1. Ein **GitHub-Konto** (kostenlos, [github.com/signup](https://github.com/signup))
2. Ein **Vercel-Konto** (kostenlos, [vercel.com/signup](https://vercel.com/signup))

**Pro-Tipp:** 💡 Bei Vercel kannst du dich mit deinem GitHub-Konto einloggen. Dann brauchst du nur ein Passwort, nicht zwei.

### Schritt 1: Lade die Dateien zu GitHub hoch

Du musst **kein Terminal benutzen.** GitHub hat eine "Datei hochladen"-Funktion im Browser. So gehts:

1. Auf [github.com/new](https://github.com/new) ein neues Repository erstellen
   - Name: zum Beispiel `mein-server-website`
   - "Privat" auswählen (damit niemand deinen Code klauen kann)
   - Klick "Create repository"
2. Du landest auf einer fast leeren Seite. Da steht **"uploading an existing file"** als Link. Klick drauf.
3. Entpacke unsere ZIP-Datei auf deinem Computer. Du hast jetzt einen Ordner `landing-mc-next/` mit ganz vielen Dateien drin.
4. Im GitHub-Browser-Fenster: **ziehe ALLE Dateien aus dem Ordner** (nicht den Ordner selbst!) ins Upload-Feld.
   - 💡 Tipp: Im Ordner `landing-mc-next/` Strg+A drücken (alle markieren), dann reinziehen.
5. Unten auf "Commit changes" klicken. Warten. Fertig. 🎉

Deine Dateien sind jetzt auf GitHub.

### Schritt 2: Verbinde GitHub mit Vercel

1. Gehe zu [vercel.com/new](https://vercel.com/new)
2. Klick "Import Git Repository"
3. Wenn du noch nicht verbunden bist, fragt Vercel ob es GitHub anbinden darf → Erlauben
4. **Such dein Repo** (`mein-server-website`) in der Liste → klick **"Import"**
5. Auf der nächsten Seite: einfach **"Deploy"** klicken. Nichts anpassen.
6. Warte ~60 Sekunden. Vercel baut deine Seite.
7. ✅ **FERTIG.** Du siehst einen Bildschirm mit Konfetti und einer URL wie `mein-server-website.vercel.app`

**Glückwunsch.** Deine Seite ist live. Im Internet. Für alle erreichbar.

### Schritt 3 (optional): Eigene Domain wie `play.deinserver.de`

1. In Vercel: dein Projekt öffnen → "Settings" → "Domains"
2. Deine Domain eingeben (z.B. `deinserver.de`) → "Add"
3. Vercel zeigt dir an, was du bei deinem Domain-Anbieter eintragen musst (DNS-Einträge)
4. Bei deinem Domain-Anbieter (Strato, IONOS, GoDaddy etc.) im Domain-Verwaltungsbereich die Einträge übernehmen
5. Nach ~10 Min ist deine Domain mit deiner Seite verbunden

---

## ✏️ Was an der Seite ändern? Hier:

Diese Webseite soll **deine** sein. Hier ist eine Schummelliste — was änderst du, und wo:

| Wenn du das ändern willst... | ...öffne diese Datei |
|---|---|
| Server-Name, IP, Discord-Link, Store-URL | `lib/config.ts` |
| Welche Welten (Survival, Skyblock etc.) gezeigt werden | `lib/config.ts` (suche `worlds`) |
| Welche Ränge mit welchen Preisen | `lib/config.ts` (suche `ranks`) |
| **Farben** der ganzen Seite | `app/globals.css` (oben drin) |
| **Deutsche Texte** | `lib/translations/de.ts` |
| **Englische Texte** | `lib/translations/en.ts` |
| **Spanische Texte** | `lib/translations/es.ts` |
| Das Logo | `components/Nav.tsx` (suche nach `Logo`) |

### Beispiel: Server-Namen ändern

Öffne `lib/config.ts` in einem Texteditor (Notepad reicht, aber [VS Code](https://code.visualstudio.com) ist schöner).

Du siehst sowas hier:

```ts
server: {
  name: 'Oakhaven',           // ← Hier den Namen ändern
  ip:   'play.oakhaven.gg',   // ← Hier die IP
  ...
}
```

Ändere `'Oakhaven'` zu `'DeinServer'`. **Achte auf die Anführungszeichen!** Die müssen bleiben. Speichern.

### So bringst du Änderungen online

**Wenn du den Vercel-Weg gegangen bist:** Jede Änderung in GitHub geht automatisch live. So machst du das im Browser:

1. Geh zu deinem Repo auf GitHub
2. Klick auf die Datei die du ändern willst (z.B. `lib/config.ts`)
3. Oben rechts das Stift-Symbol ✏️ klicken
4. Änderungen machen
5. Unten "Commit changes" klicken
6. Vercel sieht die Änderung automatisch und baut deine Seite neu (~60 Sek)
7. Refresh deine Seite — fertig.

**Pro-Tipp:** 💡 Bevor du Änderungen committest, kannst du oben rechts auf "Preview" klicken um zu sehen ob du keine Klammern oder Anführungszeichen vergessen hast.

### Beispiel: Farben ändern

Öffne `app/globals.css`. Ganz oben siehst du sowas:

```css
:root, [data-theme="light"] {
  --c-cream:    242 234 211;   /* Hintergrundfarbe */
  --c-moss:      90 122 58;    /* Akzentfarbe (Grün) */
  --c-amber:    200 134  46;   /* zweite Akzentfarbe (Gold) */
  ...
}
```

Die Format ist **RGB getrennt durch Leerzeichen** (nicht Hex). So findest du die richtigen Zahlen:

1. Geh zu [coolors.co](https://coolors.co) oder [rgbcolorcode.com](https://rgbcolorcode.com)
2. Wähle deine Wunschfarbe
3. Schreib dir die "RGB"-Werte auf (z.B. 46, 84, 158)
4. In `globals.css` einfügen — aber **mit Leerzeichen statt Komma**:
   ```css
   --c-moss: 46 84 158;
   ```

Speichern → committen → Vercel baut neu → fertig.

---

## 🆘 Hilfe! Was wenn...

### "Ich hab Schritt 1 falsch gemacht"
Auf GitHub: dein Repo → "Settings" (oben rechts) → ganz unten scrollen → **"Delete this repository"**. Dann nochmal von vorn. Keine Panik, kostet nichts und du kannst es so oft machen wie du willst.

### "Vercel zeigt 'Build Failed'"
- Klick auf "View Build Logs"
- Such nach roten "Error"-Zeilen
- Häufigster Grund: vergessenes Komma oder Anführungszeichen in `config.ts`
- Geh zur Datei zurück, repariere, committe → Vercel versucht's nochmal automatisch

### "Live-Spielerzahl zeigt immer die gleiche Zahl"
Das ist Absicht — solange du keine API verbunden hast, kommen Fallback-Werte. So aktivierst du echte Daten:

In `lib/config.ts`:
```ts
server: {
  ...
  statusApi: 'https://api.mcsrvstat.us/3/play.deinserver.com',  // ← deine Server-IP einsetzen
}
```

Speichern, committen, Vercel baut neu. Die Spielerzahl auf der Seite ist jetzt echt.

### "Ich hab gar nichts verstanden was ich da machen soll"
Kein Stress. Schreib eine Nachricht im BBB-Resource-Chat und ich helfe Schritt für Schritt. Wirklich.

---

## 🤓 Für die Tech-Leute: lokal entwickeln

(Diesen Teil kannst du **komplett ignorieren** wenn du den Vercel-Weg gegangen bist!)

Wenn du lokal entwickeln willst:

1. Node.js installieren von [nodejs.org](https://nodejs.org) (LTS-Version, links)
2. **Mac/Linux:** Doppelklick `setup.sh` ODER im Terminal `./setup.sh`
   **Windows:** Doppelklick `setup.bat`
3. Browser öffnet automatisch unter `http://localhost:3000`
4. Änderungen erscheinen sofort, ohne Refresh

### Statisches Hosting (Hostinger, Strato, eigener Server etc.)

Wenn du auf einem normalen Webhosting (keine Node.js) hosten willst:

1. In `next.config.mjs` diese Zeile auskommentieren (das `//` vorne entfernen):
   ```js
   output: 'export',
   ```
2. `npm run build` ausführen
3. Den `out/`-Ordner per FTP auf deinen Webspace hochladen
4. Fertig.

---

## 📂 Was ist in welcher Datei?

```
landing-mc-next/
├── 🎨 app/                  ← Die Webseite selbst
│   ├── globals.css            ← Farben & Schriften
│   ├── layout.tsx             ← Rahmen um die ganze Seite
│   ├── page.tsx               ← Die Hauptseite
│   ├── icon.svg               ← Favicon (Browser-Tab-Icon)
│   ├── not-found.tsx          ← 404-Seite ("Seite nicht gefunden")
│   ├── error.tsx              ← Fehler-Seite ("Ups, was ging schief")
│   ├── robots.ts              ← Sagt Google "darfst meine Seite indexieren"
│   └── sitemap.ts             ← Inhaltsverzeichnis für Google
│
├── 🧱 components/           ← Die Bausteine der Seite
│   ├── Nav.tsx                ← Menü oben
│   ├── Hero.tsx               ← Großer Bereich ganz oben
│   ├── Stats.tsx              ← Die Zahlen-Leiste
│   ├── Worlds.tsx             ← Welten-Übersicht
│   ├── Features.tsx           ← Features-Bento
│   ├── Ranks.tsx              ← Rang-Preise
│   ├── FAQ.tsx                ← Häufige Fragen
│   ├── CTABand.tsx            ← Dunkler "Komm her"-Streifen
│   └── Footer.tsx             ← Fußbereich
│
├── ⚙️  lib/                  ← Die "Konfiguration"
│   ├── config.ts              ← 🌟 HIER ÄNDERST DU AM MEISTEN
│   ├── translations/          ← Die Texte in 3 Sprachen
│   │   ├── de.ts                ← Deutsche Texte
│   │   ├── en.ts                ← Englische Texte
│   │   └── es.ts                ← Spanische Texte
│   ├── providers.tsx          ← Theme + Sprache Mechanik (anfassen unnötig)
│   ├── hooks.ts               ← Live-Status-Abfrage (anfassen unnötig)
│   └── types.ts               ← TypeScript-Typen (anfassen unnötig)
│
├── 📜 README.md             ← Diese Datei hier
├── 📜 LICENSE.md            ← Was du mit dem Template darfst und nicht darfst
├── 📦 package.json          ← Liste der benötigten Pakete (nicht anfassen!)
├── 🛠 setup.sh / setup.bat  ← One-Click-Installer für lokale Entwicklung
└── ... (ein paar Config-Dateien, die Vercel selbst versteht)
```

**Die meisten dieser Dateien musst du nie anfassen.** Du brauchst praktisch nur:
- `lib/config.ts` — Server-Daten
- `lib/translations/de.ts` — deine deutschen Texte
- `app/globals.css` — wenn du die Farben anpassen willst

---

## 📜 Lizenz

Du hast eine **Single-Server-Lizenz** gekauft (über BuiltByBit). Du darfst:

- ✅ Diese Vorlage für **deinen Minecraft-Server** verwenden
- ✅ Sie nach Belieben anpassen — Farben, Texte, Layout, alles
- ✅ Sie auch für **mehrere Server** verwenden, **wenn du sie selbst betreibst**

Du darfst **nicht**:

- ❌ Die Vorlage weiterverkaufen oder verschenken
- ❌ Den Quellcode öffentlich auf GitHub stellen (private Repos sind ok)
- ❌ Für Kunden Webseiten damit bauen und verkaufen (dafür gibt's eine Multi-License — bei Bedarf nachfragen)

Siehe `LICENSE.md` für die volle Version.

---

## 💬 Brauchst du Hilfe?

Schreib mir in der BuiltByBit-Resource-Konversation. Ich helfe gerne durch das Setup — wirklich, **frag einfach**, auch bei vermeintlich dummen Fragen. Wir haben alle mal mit GitHub angefangen ohne zu wissen was ein Commit ist.

---

<p align="center">
  <strong>Built slow. Played warm. Made for Minecrafter:innen, von Minecrafter:innen.</strong>
</p>
