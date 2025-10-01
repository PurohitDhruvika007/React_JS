import React, { useContext } from 'react';
import { counterContext } from '../../context/CounterProvider';
import './Home.css';

export default function Home() {
    const { count, increament, decreament, multiply, divide } = useContext(counterContext);

    return (
        <div className="home-container">
            <h2 className="todo-heading">Counter app</h2>
            <h1 className="counter">{count}</h1>

            <div className="button-group">
                <button className="btn btn-inc" onClick={increament}>
                    <span>++</span>
                </button>

                <button className="btn btn-dec" onClick={decreament}>
                    <span>--</span>
                </button>

                <button className="btn btn-mul" onClick={multiply}>
                    <span>*2</span>
                </button>

                <button className="btn btn-div" onClick={divide}>
                    <span>/2</span>
                </button>
            </div>
        </div>
    );
}
