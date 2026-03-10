#!/bin/bash

echo "Starting ECG Analysis System..."
echo

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    echo "Please install Python 3.8+ and try again"
    exit 1
fi

# Check if required files exist
if [ ! -f "ECG-data/ecg_mobilenet_final.h5" ]; then
    echo "Error: ECG model file not found"
    echo "Please ensure ECG-data/ecg_mobilenet_final.h5 exists"
    exit 1
fi

if [ ! -f "ECG-data/class_indices.json" ]; then
    echo "Error: Class indices file not found"
    echo "Please ensure ECG-data/class_indices.json exists"
    exit 1
fi

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "Installing Python dependencies..."
    pip3 install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install dependencies"
        exit 1
    fi
fi

# Start the Flask application
echo
echo "Starting Flask application..."
echo "Open your browser and go to: http://localhost:5000"
echo
echo "Press Ctrl+C to stop the server"
echo

python3 app.py

