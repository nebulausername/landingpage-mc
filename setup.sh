#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════════════
#  landing-mc · One-Click Setup (Mac / Linux)
#  
#  Doppelklick diese Datei (oder: chmod +x setup.sh && ./setup.sh)
#  → installiert alles und startet den Dev-Server
# ════════════════════════════════════════════════════════════════════

set -e
cd "$(dirname "$0")"

echo ""
echo "🌳  landing-mc · Setup"
echo "═══════════════════════════════════════════════════"
echo ""

# Node check
if ! command -v node &> /dev/null; then
  echo "❌  Node.js ist nicht installiert."
  echo ""
  echo "    Lade es von hier:  https://nodejs.org"
  echo "    Wähle die linke 'LTS'-Version."
  echo "    Doppelklick → installieren → diesen Script nochmal starten."
  echo ""
  exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌  Node.js Version $NODE_VERSION ist zu alt."
  echo "    Brauchst mindestens Version 18. Update von https://nodejs.org"
  exit 1
fi

echo "✓  Node.js $(node -v) gefunden"
echo ""

# Install
if [ ! -d "node_modules" ]; then
  echo "📦  Installiere Pakete (dauert ~30 Sekunden) ..."
  npm install
  echo ""
fi

echo "✓  Alles installiert!"
echo ""
echo "🚀  Starte Dev-Server ..."
echo "    Browser öffnet automatisch unter http://localhost:3000"
echo "    Stoppen: Ctrl+C"
echo ""

# Open browser after 3s, then start dev server
(sleep 3 && (xdg-open http://localhost:3000 2>/dev/null || open http://localhost:3000 2>/dev/null)) &
npm run dev
