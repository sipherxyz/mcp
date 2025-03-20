@echo off
echo Checking for Node.js installation...


where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Node.js is not installed! Please install Node.js first.
    pause
    exit /b 1
)


echo Node.js is installed. Version:
node --version


echo.
echo Changing directory to context-bank...
cd .\context-bank


echo.
echo Installing dependencies...
call npm install


if %ERRORLEVEL% neq 0 (
    echo Failed to install dependencies!
    pause
    exit /b 1
)


echo.
echo Building project...
call npm run build


if %ERRORLEVEL% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)


echo.
echo Build completed successfully!
pause





