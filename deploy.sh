#!/bin/bash

echo "🎶 Deploying GeetYatra to the cloud..."
echo "======================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - GeetYatra Music Recommender"
fi

echo ""
echo "🚀 Choose your deployment platform:"
echo "1. Railway (Recommended - Free & Easy)"
echo "2. Heroku"
echo "3. Render"
echo "4. PythonAnywhere"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🚂 Deploying to Railway..."
        echo "1. Go to https://railway.app"
        echo "2. Sign up/Login with GitHub"
        echo "3. Click 'New Project' → 'Deploy from GitHub repo'"
        echo "4. Select this repository"
        echo "5. Railway will automatically detect Flask and deploy!"
        echo ""
        echo "✅ Your app will be live in 2-3 minutes!"
        ;;
    2)
        echo "🦸 Deploying to Heroku..."
        echo "1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli"
        echo "2. Run: heroku login"
        echo "3. Run: heroku create your-app-name"
        echo "4. Run: git push heroku main"
        echo "5. Run: heroku open"
        ;;
    3)
        echo "🎨 Deploying to Render..."
        echo "1. Go to https://render.com"
        echo "2. Sign up/Login with GitHub"
        echo "3. Click 'New Web Service'"
        echo "4. Connect your GitHub repository"
        echo "5. Set Build Command: pip install -r requirements.txt"
        echo "6. Set Start Command: gunicorn flask_app:app"
        echo "7. Deploy!"
        ;;
    4)
        echo "🐍 Deploying to PythonAnywhere..."
        echo "1. Go to https://www.pythonanywhere.com"
        echo "2. Create a free account"
        echo "3. Upload your files"
        echo "4. Create a new web app (Flask)"
        echo "5. Configure WSGI file"
        echo "6. Reload the web app"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment instructions completed!"
echo "📖 For detailed instructions, see DEPLOYMENT.md" 