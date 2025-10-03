import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './Movie.css';

export default function Movie() {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState("");
    const [existingData, setExistingData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const str = localStorage.getItem("movie");
        const res = str && str !== "undefined" ? JSON.parse(str) : [];
        setExistingData(res);
    }, []);

    const AddMovie = () => {
        if (!title || !genre || !image || rating < 0 || rating > 10) {
            alert("Please fill all fields correctly");
            return;
        }
        const data = { title, genre, rating: Number(rating), image };
        let updatedData;
        if (editIndex !== null) {
            updatedData = existingData.map((m, i) => (i === editIndex ? data : m));
            setEditIndex(null);
        } else {
            updatedData = [...existingData, data];
        }
        setExistingData(updatedData);
        localStorage.setItem("movie", JSON.stringify(updatedData));
        setTitle(""); setGenre(""); setRating(0); setImage("");
    };

    const deleteMovie = (i) => {
        const updatedData = existingData.filter((_, index) => index !== i);
        setExistingData(updatedData);
        localStorage.setItem("movie", JSON.stringify(updatedData));
    };

    const updateMovie = (i) => {
        const movie = existingData[i];
        setTitle(movie.title);
        setGenre(movie.genre);
        setRating(movie.rating);
        setImage(movie.image);
        setEditIndex(i);
    };

    const favoriteMovie = (i) => {
        const movie = existingData[i];
        const favStr = localStorage.getItem("favorites");
        const fav = favStr ? JSON.parse(favStr) : [];
        if (!fav.some(f => f.title === movie.title)) {
            const newFav = [...fav, movie];
            localStorage.setItem("favorites", JSON.stringify(newFav));
        }
        alert('Movie added to favorite list');
        navigate('/favorites');
    };

    return (
        <div className="liquid-bg">

            <div className="navigation">
                <button onClick={() => navigate('/movie')}>Movies</button>
                <button onClick={() => navigate('/favorites')}>Favorites</button>
            </div>

            <h1 className="page-title">🎬 Movie Library</h1>

            <div className="movie-form">
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} />
                <input type="number" placeholder="Rating 0-10" value={rating} onChange={e => setRating(e.target.value)} />
                <input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
                <button onClick={AddMovie}>{editIndex !== null ? "Update Movie" : "Add Movie"}</button>
            </div>

            <div className="movie-grid">
                {existingData.map((movie, index) => (
                    <div key={index} className="movie-card">
                        <img src={movie.image} alt={movie.title} />
                        <div className="movie-info">
                            <h2>{movie.title}</h2>
                            <p>{movie.genre}</p>
                            <p>⭐ {movie.rating}</p>
                        </div>
                        <div className="movie-actions">
                            <button className="update" onClick={() => updateMovie(index)}>Update</button>
                            <button className="delete" onClick={() => deleteMovie(index)}>Delete</button>
                            <button className="favorite" onClick={() => favoriteMovie(index)}>❤️ Favorite</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
