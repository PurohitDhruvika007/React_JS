import React, { useEffect } from 'react'
import './Movie.css'

export default function Movie() {
    useEffect(() => {
        str = sessionStorage.getItem("signin");
        res = str ? JSON.parse(str) : {};
    }, []);
    return (
        <div>
            <h1>Movie Page</h1>

        </div>
    )
}
