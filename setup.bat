@echo off
:: ═══════════════════════════════════════════════════════════════════
::  landing-mc · One-Click Setup (Windows)
::
::  Doppelklick auf setup.bat → installiert und startet alles.
:: ═══════════════════════════════════════════════════════════════════

cd /d "%~dp0"
echo.
echo  landing-mc - Setup
echo  =====================================================
echo.

:: Check for Node
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Node.js ist nicht installiert.
    echo.
    echo     Lade es hier herunter:  https://nodejs.org
    echo     Waehle die linke "LTS"-Version.
    echo     Doppelklick auf den Installer, dann diese Datei wieder ausfuehren.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js gefunden
echo.

:: Install if needed
if not exist node_modules (
    echo [*] Installiere Pakete (dauert ~30 Sekunden)...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [X] Installation fehlgeschlagen.
        pause
        exit /b 1
    )
    echo.
)

echo [OK] Alles installiert!
echo.
echo [*] Starte Dev-Server...
echo     Browser oeffnet automatisch unter http://localhost:3000
echo     Stoppen: Strg+C in diesem Fenster
echo.

:: Open browser after 3 seconds
start /min cmd /c "timeout /t 3 >nul && start http://localhost:3000"

:: Start dev server
call npm run dev
pause
