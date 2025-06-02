#!/bin/bash

# Define the app directory
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Function to open browser
open_browser() {
    # Check which browser is available and open the app
    if [ -n "$(command -v open)" ]; then
        # macOS
        open "file://$APP_DIR/index.html"
    elif [ -n "$(command -v xdg-open)" ]; then
        # Linux
        xdg-open "file://$APP_DIR/index.html"
    elif [ -n "$(command -v start)" ]; then
        # Windows
        start "file://$APP_DIR/index.html"
    else
        echo "Could not detect a way to open the browser."
        echo "Please open a browser and navigate to: file://$APP_DIR/index.html"
    fi
}

echo "Launching Summer Learning Adventure 2025..."
open_browser

echo "If the application didn't open automatically,"
echo "please open a browser and navigate to: file://$APP_DIR/index.html"
