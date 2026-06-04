@echo off
echo Cleaning and restarting...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
if exist .next rmdir /s /q .next
timeout /t 1 /nobreak >nul
echo Starting server...
npm run dev
