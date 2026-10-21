@echo off
setlocal
cd /d "%~dp0"

where py >nul 2>&1
if not errorlevel 1 goto use_py

where python >nul 2>&1
if errorlevel 1 (
  echo Python was not found. Install Python, then run this file again.
  pause
  exit /b 1
)

echo Serving A9 Epoxy Inspirations at http://localhost:4173/
python -m http.server 4173 --bind 127.0.0.1
goto end

:use_py
echo Serving A9 Epoxy Inspirations at http://localhost:4173/
py -m http.server 4173 --bind 127.0.0.1

:end
pause
