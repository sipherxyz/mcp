#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing Node.js..."
    
    # For macOS, using Homebrew
    if [[ "$OSTYPE" == "darwin"* ]]; then
        if ! command -v brew &> /dev/null; then
            echo "Installing Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        brew install node
    else
        echo "Please install Node.js manually from https://nodejs.org"
        exit 1
    fi
fi

# Check Node.js version
echo "Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm."
    exit 1
fi

echo "npm version: $(npm -v)"

# Navigate to the context-bank directory
cd "$(dirname "$0")/context-bank" || exit 1

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Create the configuration output
echo "Creating configuration..."
echo '"Context Bank": { "command": "node", "args": [ "${current-path}/mcp/context-bank/build/index.js" ], "env": { "ONYX_API_BASE": "", "ONYX_API_KEY": "" }}'
echo "Please replace ${current-path} with the actual path to the context-bank directory"
echo "Installation and setup completed successfully!" 