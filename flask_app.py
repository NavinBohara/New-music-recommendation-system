from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import joblib
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os

app = Flask(__name__)

# ===== Spotify Setup =====
client_id = "48c27ca09dd848028b2014b25e883bb9"
client_secret = "42add4e9460d43c883a7da850130cb41"

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=client_id,
    client_secret=client_secret
))

# ===== Load Data and Models =====
df = pd.read_csv("hybrid_knn_dataset.csv")
scaler = joblib.load("scaler.joblib")

# Features used in the model
features = [
    "danceability", "energy", "valence", "tempo",
    "acousticness", "instrumentalness", "speechiness", "liveness"
]

def fetch_album_image(song_name, artist_name):
    """Fetch album image from Spotify API"""
    query = f"{song_name} {artist_name}"
    try:
        result = sp.search(q=query, limit=1, type='track')
        if result['tracks']['items']:
            return result['tracks']['items'][0]['album']['images'][0]['url']
    except:
        pass
    return None

def get_recommendations(selected_song):
    """Get music recommendations for the selected song"""
    try:
        input_song = df[df['track'] == selected_song].iloc[0]
        input_cluster = input_song['cluster']

        # Load KNN model for that cluster
        knn_model = joblib.load(f"models/knn_cluster_{int(input_cluster)}.joblib")
        cluster_df = df[df['cluster'] == input_cluster].reset_index(drop=True)

        # Get features for the entire cluster
        scaled_features = scaler.transform(cluster_df[features])

        # Get index of selected song within the cluster
        index_in_cluster = cluster_df[cluster_df['track'] == selected_song].index[0]

        # Find similar songs using KNN
        distances, indices = knn_model.kneighbors([scaled_features[index_in_cluster]])

        recommendations = []
        for idx in indices[0][1:7]:  # Get top 6 recommendations
            result = cluster_df.iloc[idx]
            track = result['track']
            artist = result['artist']
            language = result['language']
            
            image_url = fetch_album_image(track, artist)
            
            recommendations.append({
                'track': track,
                'artist': artist,
                'language': language,
                'image_url': image_url
            })
        
        return recommendations
    except Exception as e:
        print(f"Error getting recommendations: {e}")
        return []

@app.route('/')
def index():
    """Main page"""
    song_list = sorted(df['track'].unique())
    return render_template('index.html', songs=song_list)

@app.route('/get_recommendations', methods=['POST'])
def get_recommendations_api():
    """API endpoint to get recommendations"""
    data = request.get_json()
    selected_song = data.get('song')
    
    if not selected_song:
        return jsonify({'error': 'No song selected'}), 400
    
    recommendations = get_recommendations(selected_song)
    return jsonify({'recommendations': recommendations})

@app.route('/search_songs', methods=['POST'])
def search_songs():
    """Search songs by name"""
    data = request.get_json()
    query = data.get('query', '').lower()
    
    if not query:
        song_list = sorted(df['track'].unique())
    else:
        song_list = sorted([song for song in df['track'].unique() if query in song.lower()])
    
    return jsonify({'songs': song_list[:20]})  # Limit to 20 results

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080) 