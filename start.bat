@echo off
echo Starting ECG Analysis System...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.8+ and try again
    pause
    exit /b 1
)

REM Check if required files exist
if not exist "ECG-data\ecg_mobilenet_final.h5" (
    echo Error: ECG model file not found
    echo Please ensure ECG-data\ecg_mobilenet_final.h5 exists
    pause
    exit /b 1
)

if not exist "ECG-data\class_indices.json" (
    echo Error: Class indices file not found
    echo Please ensure ECG-data\class_indices.json exists
    pause
    exit /b 1
)

REM Install dependencies if requirements.txt exists
if exist "requirements.txt" (
    echo Installing Python dependencies...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Start the Flask application
echo.
echo Starting Flask application...
echo Open your browser and go to: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

python app.py

pause
