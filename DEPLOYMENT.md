# 🚀 Deployment Guide for GeetYatra

This guide will help you deploy your Flask music recommendation system to various platforms.

## 📋 Prerequisites

- Python 3.8 or higher
- All dependencies installed (`pip install -r requirements.txt`)
- Spotify API credentials (optional, for album art)

## 🏠 Local Development

### Quick Start
```bash
# Clone the repository
git clone <your-repo-url>
cd music_recommendation1

# Install dependencies
pip install -r requirements.txt

# Run the application
python run_flask.py

# Open http://localhost:8080 in your browser
```

### Environment Variables (Optional)
Create a `.env` file for Spotify API credentials:
```bash
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

## ☁️ Cloud Deployment Options

### 1. Heroku Deployment

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Steps
1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Create Procfile**
   ```bash
   echo "web: gunicorn flask_app:app" > Procfile
   ```

3. **Add gunicorn to requirements**
   ```bash
   echo "gunicorn" >> requirements.txt
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

5. **Open the app**
   ```bash
   heroku open
   ```

### 2. Railway Deployment

#### Steps
1. **Connect your GitHub repository to Railway**
2. **Add environment variables** (if using Spotify API)
3. **Deploy automatically** - Railway will detect Flask and deploy

### 3. Render Deployment

#### Steps
1. **Connect your GitHub repository to Render**
2. **Create a new Web Service**
3. **Configure build settings**:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn flask_app:app`
4. **Add environment variables** (if needed)
5. **Deploy**

### 4. PythonAnywhere Deployment

#### Steps
1. **Upload your files** to PythonAnywhere
2. **Create a new web app** (Flask)
3. **Configure WSGI file**:
   ```python
   import sys
   path = '/home/yourusername/your-project-directory'
   if path not in sys.path:
       sys.path.append(path)
   
   from flask_app import app as application
   ```
4. **Reload the web app**

## 🐳 Docker Deployment

### Create Dockerfile
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "flask_app:app"]
```

### Build and Run
```bash
# Build the image
docker build -t geetyatra .

# Run the container
docker run -p 8080:8080 geetyatra
```

## 🔧 Production Configuration

### Update flask_app.py for Production
```python
if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=int(os.environ.get('PORT', 8080)),
        debug=False  # Set to False in production
    )
```

### Add gunicorn configuration
Create `gunicorn.conf.py`:
```python
bind = "0.0.0.0:8080"
workers = 4
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2
```

## 🔒 Security Considerations

### For Production
1. **Set debug=False** in Flask app
2. **Use environment variables** for sensitive data
3. **Enable HTTPS** (most cloud platforms do this automatically)
4. **Set up proper logging**
5. **Configure CORS** if needed

### Environment Variables
```bash
export FLASK_ENV=production
export FLASK_DEBUG=0
export SPOTIFY_CLIENT_ID=your_client_id
export SPOTIFY_CLIENT_SECRET=your_client_secret
```

## 📊 Monitoring and Logging

### Add logging to flask_app.py
```python
import logging
from logging.handlers import RotatingFileHandler

if not app.debug:
    file_handler = RotatingFileHandler('logs/geetyatra.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('GeetYatra startup')
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change port in `flask_app.py`
   - Kill existing processes: `lsof -ti:8080 | xargs kill -9`

2. **Module not found errors**
   - Ensure all dependencies are installed: `pip install -r requirements.txt`
   - Check Python environment

3. **Spotify API errors**
   - Verify API credentials
   - Check rate limits

4. **Model loading errors**
   - Ensure all model files are present in the `models/` directory
   - Check file permissions

### Debug Mode
For local debugging, set:
```python
app.run(debug=True, host='0.0.0.0', port=8080)
```

## 📈 Performance Optimization

1. **Use gunicorn** instead of Flask development server
2. **Enable caching** for Spotify API responses
3. **Optimize model loading** (load once at startup)
4. **Use CDN** for static files
5. **Enable compression** for responses

## 🔄 Continuous Deployment

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
        heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

## 📞 Support

If you encounter issues during deployment:
1. Check the logs: `heroku logs --tail` (for Heroku)
2. Verify all dependencies are installed
3. Ensure environment variables are set correctly
4. Check file permissions and paths

---

**Happy Deploying! 🎶** 