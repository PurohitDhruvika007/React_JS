import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, insertProducts } from '../../slices/ProductSlice'
import { useState } from 'react';

export default function Home() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const { products } = useSelector((state) => state.product);
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    return (
        <div>
            <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='enter the title' />
            <input type="number" onChange={(e) => setPrice(parseInt(e.target.value))} placeholder='enter the price' />
            {
                products.map((product, index) => (
                    <div key={index}>
                        <h3>{product.title}</h3>
                    </div>
                ))
            }
            <button onClick={() => { dispatch(insertProducts({ title: title, price: price })) }}>insert</button>
        </div>

    )
}
