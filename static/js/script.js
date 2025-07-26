// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const songSelect = document.getElementById('songSelect');
const recommendBtn = document.getElementById('recommendBtn');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const recommendationsContainer = document.getElementById('recommendationsContainer');

// Search functionality
let searchTimeout;

searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    const query = this.value.trim();
    
    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    searchTimeout = setTimeout(() => {
        searchSongs(query);
    }, 300);
});

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

// Search songs function
async function searchSongs(query) {
    try {
        const response = await fetch('/search_songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query })
        });
        
        const data = await response.json();
        displaySearchResults(data.songs);
    } catch (error) {
        console.error('Error searching songs:', error);
    }
}

// Display search results
function displaySearchResults(songs) {
    if (songs.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No songs found</div>';
    } else {
        searchResults.innerHTML = songs.map(song => 
            `<div class="search-result-item" onclick="selectSong('${song}')">${song}</div>`
        ).join('');
    }
    searchResults.style.display = 'block';
}

// Select song from search results
function selectSong(songName) {
    songSelect.value = songName;
    searchInput.value = songName;
    searchResults.style.display = 'none';
    updateRecommendButton();
}

// Song select change handler
songSelect.addEventListener('change', function() {
    updateRecommendButton();
});

// Update recommend button state
function updateRecommendButton() {
    const selectedSong = songSelect.value;
    recommendBtn.disabled = !selectedSong;
}

// Get recommendations
recommendBtn.addEventListener('click', async function() {
    const selectedSong = songSelect.value;
    
    if (!selectedSong) {
        showNotification('Please select a song first!', 'error');
        return;
    }
    
    // Show loading
    loadingSection.style.display = 'block';
    resultsSection.style.display = 'none';
    
    try {
        const response = await fetch('/get_recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ song: selectedSong })
        });
        
        const data = await response.json();
        
        if (data.error) {
            showNotification(data.error, 'error');
        } else {
            displayRecommendations(data.recommendations);
        }
    } catch (error) {
        console.error('Error getting recommendations:', error);
        showNotification('Error getting recommendations. Please try again.', 'error');
    } finally {
        loadingSection.style.display = 'none';
    }
});

// Display recommendations
function displayRecommendations(recommendations) {
    if (recommendations.length === 0) {
        recommendationsContainer.innerHTML = `
            <div style="text-align: center; grid-column: 1 / -1; padding: 40px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ff6b6b; margin-bottom: 20px;"></i>
                <h3>No recommendations found</h3>
                <p>Try selecting a different song.</p>
            </div>
        `;
    } else {
        recommendationsContainer.innerHTML = recommendations.map(song => `
            <div class="recommendation-card">
                <div class="album-art">
                    ${song.image_url ? 
                        `<img src="${song.image_url}" alt="${song.track}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-music\\'></i>'">` : 
                        '<i class="fas fa-music"></i>'
                    }
                </div>
                <div class="song-info">
                    <div class="song-title">${escapeHtml(song.track)}</div>
                    <div class="song-artist">${escapeHtml(song.artist)}</div>
                    <div class="song-language">${song.language}</div>
                </div>
            </div>
        `).join('');
    }
    
    resultsSection.style.display = 'block';
    
    // Smooth scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ff6b6b' : '#667eea'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const notes = document.querySelectorAll('.note');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    notes.forEach((note, index) => {
        const speed = 0.5 + (index * 0.1);
        note.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .recommendation-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Enter to get recommendations when song is selected
    if (e.key === 'Enter' && document.activeElement === songSelect && songSelect.value) {
        recommendBtn.click();
    }
});

// Add tooltip for keyboard shortcuts
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.title = 'Press Ctrl+K to focus search';
    }
    
    const recommendButton = document.querySelector('.recommend-btn');
    if (recommendButton) {
        recommendButton.title = 'Press Enter after selecting a song';
    }
}); 