import React, { useContext } from 'react'
import { CounterContext } from '../../context/CounterProvider.jsx'
import './Home.css'

export default function Home() {
    const { count, setCount } = useContext(CounterContext)

    return (
        <div className="home-container">
            <div className="card">
                <h1 className="counter">{count}</h1>
                <div className="button-group">
                    <button className="btn btn-inc" onClick={() => setCount(count + 1)}>+1</button>
                    <button className="btn btn-dec" onClick={() => setCount(count - 1)}>-1</button>
                    <button className="btn btn-mul" onClick={() => setCount(count * 2)}>×2</button>
                    <button className="btn btn-div" onClick={() => setCount(count / 2)}>÷2</button>
                </div>
            </div>
        </div>
    )
}
