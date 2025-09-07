import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../App.css'

export default function Products() {
    const [products, setProducts] = useState([]);
    const getApi = async () => {
        const res = await axios.get("https://dummyjson.com/products");
        setProducts(res.data.products)
    }
    useEffect(() => { getApi() }, []);
    return (
        <div className='container mb-5' id="products">
            <h1 className='text-center fs-1'>Products</h1>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                {
                    products.map((product, index) => (
                        <div key={index} className='col'>
                            <div className='card shadow-sm p-4 shadow'>
                                <img src={product.thumbnail} alt="" />
                                <p className='fs-5 text-truncate'><strong>{product.title}</strong></p>
                                <p className='text-secondary' style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>{product.description}</p>
                                <div className='d-flex justify-content-between'>
                                    <p className='fs-5'><strong>{product.price}$</strong></p>
                                    <button className='btn btn-primary'>Buy now</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
