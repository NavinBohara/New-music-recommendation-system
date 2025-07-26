#!/usr/bin/env python3
"""
Flask Music Recommendation System Runner
"""

from flask_app import app

if __name__ == '__main__':
    print("🎶 Starting GeetYatra - Your Personalized Music Journey")
    print("🌐 Server will be available at: http://localhost:8080")
    print("📱 Press Ctrl+C to stop the server")
    print("-" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=8080) 