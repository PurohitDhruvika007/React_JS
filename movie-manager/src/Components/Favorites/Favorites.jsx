import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import './Favorites.css'

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const str = localStorage.getItem('favorites');
        if (str) {
            setFavorites(JSON.parse(str))
        }
    }, []);

    const removeFavorites = (index) => {
        const updated = favorites.filter((_, i) => i !== index);
        setFavorites(updated);
        alert("movie removed from favorite list")
        localStorage.setItem('favorites', JSON.stringify(updated));
    }

    return (
        <div className="liquid-bg">
            {/* Navigation */}
            <div className="navigation">
                <button onClick={() => navigate('/movie')}>Movies</button>
                <button onClick={() => navigate('/favorites')}>Favorites</button>
            </div>

            <h1 className="page-title">⭐ Favorites</h1>

            {favorites.length === 0 && <p>There is no data in favorites</p>}

            <div className="favorites-grid">
                {favorites.map((fav, index) => (
                    <div key={index} className="favorite-card">
                        <img src={fav.image} alt={fav.title} />
                        <div className="favorite-info">
                            <h2>{fav.title}</h2>
                            <h4>{fav.genre}</h4>
                            <h3>⭐ {fav.rating}</h3>
                        </div>
                        <div className="favorite-actions">
                            <button onClick={() => removeFavorites(index)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
