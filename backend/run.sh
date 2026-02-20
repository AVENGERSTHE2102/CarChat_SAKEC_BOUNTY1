#!/bin/bash

# AI Career Guidance Backend - Quick Start Script
# This script installs dependencies and starts the server

echo "🚀 AI Career Guidance Assistant - Starting Backend..."
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null
then
    echo "❌ Python3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pip3 install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed"
echo ""

# Check if .env exists, if not create from example
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo "📝 Creating .env from .env.example..."
        cp .env.example .env
        echo "⚠️  Note: API will run in fallback mode without ANTHROPIC_API_KEY"
    fi
fi

echo "🎯 Starting server..."
echo "   API will be available at: http://localhost:8000"
echo "   Documentation at: http://localhost:8000/docs"
echo ""
echo "   Press CTRL+C to stop the server"
echo ""

# Start the server
python3 main.py
