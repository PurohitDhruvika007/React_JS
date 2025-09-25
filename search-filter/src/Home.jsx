import React from 'react'
import { useState } from 'react'
import './Home.css'
import { Data } from './assets/data.js'

export default function Home() {
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState(null);
    const [category, setCategory] = useState("all");
    const [range, setRange] = useState(0);
    let filtering = [...Data];
    if (search) {
        filtering = filtering.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
    }
    if (sortOrder !== null) {
        filtering = filtering.sort((a, b) => sortOrder ? a.price - b.price : b.price - a.price);
    }
    if (category !== "all") {
        filtering = filtering.filter(product => product.category.toLowerCase().includes(category.toLowerCase()))
    }
    if (range > 0) {
        filtering = filtering.filter(product => product.rating >= range)
    }
    return (
        <div>
            <input placeholder="title here..." onChange={(e) => setSearch(e.target.value)} />
            <input placeholder="category here..." onChange={(e) => setCategory(e.target.value)} />
            <label for="price">{range}</label>
            <input type="range" min={0} max={10} step={1} onChange={(e) => setRange(Number(e.target.value))} />
            <button onClick={() => setSortOrder(sortOrder ? false : true)}>Sort</button>
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
