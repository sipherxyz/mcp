@echo off
setlocal enabledelayedexpansion

echo Checking Node.js installation...

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Downloading and installing Node.js...
    
    :: Download Node.js installer
    curl -o nodejs_installer.msi https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi
    
    :: Install Node.js silently
    msiexec /i nodejs_installer.msi /qn
    
    :: Wait for installation
    timeout /t 10 /nobreak
    
    :: Clean up installer
    del nodejs_installer.msi
    
    :: Refresh environment variables
    call refreshenv.cmd 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo Please restart your terminal and run this script again for the PATH changes to take effect.
        exit /b 1
    )
)

:: Check Node.js version
echo Node.js version:
node -v

:: Check npm version
echo npm version:
npm -v

:: Navigate to context-bank directory
cd /d "%~dp0context-bank"
if %ERRORLEVEL% NEQ 0 (
    echo Failed to navigate to context-bank directory
    exit /b 1
)

:: Install dependencies
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies
    exit /b 1
)

:: Build project
echo Building project...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Failed to build project
    exit /b 1
)

:: Output configuration
echo.
echo Configuration for Context Bank:
echo "Context Bank": { "command": "node", "args": [ "%%current-path%%/mcp/context-bank/build/index.js" ], "env": { "ONYX_API_BASE": "", "ONYX_API_KEY": "" }}
echo.
echo "Please replace ${current-path} with the actual path to the context-bank directory"
echo.
echo Installation and setup completed successfully!
pause
