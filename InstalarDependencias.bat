@echo off
echo ==========================================
echo Instalador de Node.js, npm, npx e TypeScript
echo ==========================================

:: Verifica se Node.js está instalado
node -v >nul 2>&1
IF ERRORLEVEL 1 (
    echo Node.js nao encontrado.
    echo Baixe e instale em: https://nodejs.org/
    pause
    exit /b
) ELSE (
    echo Node.js encontrado: 
    node -v
)

:: npm e npx já vêm com o Node.js
echo.
echo Verificando npm...
npm -v

echo.
echo Verificando npx...
npx -v

:: Instalar TypeScript globalmente
echo.
echo Instalando TypeScript Compiler (tsc)...
npm install -g typescript

echo.
echo Verificando instalacao do tsc...
tsc -v

echo.
echo Instalacao concluida!
pause