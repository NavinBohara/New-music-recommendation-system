# 🎶 GeetYatra – Your Personalized Music Journey

An AI-powered music recommendation system built using **KMeans**, **KNN**, **Flask**, and **Spotify API** with a beautiful modern web interface.

![banner](https://github.com/NavinBohara/New-music-recommendation-system/blob/main/banner.png)

---

## 🚀 Features

- 🎧 **AI-Powered Recommendations**: Song similarity using KNN clustering
- 🌍 **Multi-Language Support**: Both Hindi & English songs
- 🖼️ **Real-time Album Art**: Fetched via Spotify API
- 🔀 **Smart Clustering**: KMeans-based filtering for better recommendations
- ⚡ **Modern Web Interface**: Beautiful, responsive Flask frontend
- 🔍 **Real-time Search**: Instant song search functionality
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ⌨️ **Keyboard Shortcuts**: Enhanced user experience

---

## 🛠️ Technologies Used

### Backend
- **Python 3.8+**
- **Flask** - Web framework
- **Scikit-learn** - Machine Learning (KNN, KMeans)
- **Pandas & NumPy** - Data processing
- **Spotipy** - Spotify API integration
- **Joblib** - Model serialization

### Frontend
- **HTML5 & CSS3** - Modern, responsive design
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Beautiful icons
- **Google Fonts** - Typography

---

## 📁 Project Structure

```
music_recommendation1/
├── flask_app.py              # Main Flask application
├── run_flask.py              # Flask runner script
├── app.py                    # Streamlit version (original)
├── templates/
│   └── index.html           # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css        # Modern CSS styling
│   └── js/
│       └── script.js        # Interactive JavaScript
├── models/                   # Trained ML models
├── hybrid_knn_dataset.csv   # Music dataset
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- Spotify API credentials (optional, for album art)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd music_recommendation1
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Flask application**
   ```bash
   python run_flask.py
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

---

## 🎯 How to Use

1. **Search for Songs**: Use the search bar to find your favorite songs
2. **Select a Song**: Choose from the dropdown or search results
3. **Get Recommendations**: Click "Get Recommendations" to see similar songs
4. **Explore**: Browse through recommended songs with album art

### Keyboard Shortcuts
- `Ctrl/Cmd + K`: Focus search bar
- `Enter`: Get recommendations (after selecting a song)

---

## 🔧 API Endpoints

### GET `/`
- **Description**: Main application page
- **Response**: HTML page with song selection interface

### POST `/get_recommendations`
- **Description**: Get music recommendations for a selected song
- **Request Body**: `{"song": "song_name"}`
- **Response**: `{"recommendations": [...]}`

### POST `/search_songs`
- **Description**: Search songs by name
- **Request Body**: `{"query": "search_term"}`
- **Response**: `{"songs": [...]}`

---

## 🎨 UI Features

### Modern Design
- **Gradient Backgrounds**: Beautiful color schemes
- **Smooth Animations**: CSS transitions and keyframes
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Interactive Elements**: Hover effects and smooth scrolling

### User Experience
- **Real-time Search**: Instant results as you type
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Accessibility**: Keyboard navigation and screen reader support

---

## 🔮 Future Enhancements

- [ ] User authentication and playlists
- [ ] Music preview functionality
- [ ] Advanced filtering options
- [ ] Social sharing features
- [ ] Dark/Light theme toggle
- [ ] Export recommendations to playlist

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Spotify API** for album art and music data
- **Scikit-learn** for machine learning algorithms
- **Font Awesome** for beautiful icons
- **Google Fonts** for typography

---

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

**Made with ❤️ for music lovers everywhere!**

