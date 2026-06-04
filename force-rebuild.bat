@echo off
echo Stopping any running Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Deleting cache folders...
rmdir /s /q .next 2>nul
rmdir /s /q node_modules\.cache 2>nul
rmdir /s /q .cache 2>nul

echo Starting fresh server...
npm run dev
