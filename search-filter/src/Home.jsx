import React from 'react'
import { useState } from 'react'
import './Home.css'
import { Data } from './assets/data.js'

export default function Home() {
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState(true);
    let filtering = Data.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
    filtering = filtering.sort((a, b) => sortOrder ? a.price - b.price : b.price - a.price);
    return (
        <div>
            <input placeholder="search here..." onChange={(e) => setSearch(e.target.value)} />
            <button onClick={() => setSortOrder(!sortOrder)}>Sort</button>
            {
                filtering.map((product, index) => (
                    <div key={index}>
                        <h2>{product.title}</h2>
                        <h4>{product.category}</h4>
                        <h5>{product.description}</h5>
                        <h3>{product.price}$
                        </h3>
                        <h3>{product.rating} rating</h3>
                    </div>
                ))
            }
        </div>
    )
}
