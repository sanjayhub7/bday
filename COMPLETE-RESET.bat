@echo off
echo ========================================
echo COMPLETE PROJECT RESET
echo ========================================
echo.

echo [1/5] Stopping all Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 3 /nobreak >nul

echo [2/5] Deleting .next build folder...
if exist ".next" rmdir /s /q ".next"
timeout /t 1 /nobreak >nul

echo [3/5] Deleting cache folders...
if exist ".cache" rmdir /s /q ".cache"
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"
timeout /t 1 /nobreak >nul

echo [4/5] Clearing npm cache...
call npm cache clean --force
timeout /t 2 /nobreak >nul

echo [5/5] Starting fresh development server...
echo.
echo ========================================
echo Server starting on http://localhost:3003
echo ========================================
echo.
call npm run dev
