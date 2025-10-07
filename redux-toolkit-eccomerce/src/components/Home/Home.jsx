import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../slices/ProductSlice'

export default function Home() {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    return (
        <div>
            {
                products.map((product, index) => (
                    <div key={index}>
                        <h3>{product.title}</h3>
                    </div>
                ))
            }
        </div>
    )
}
