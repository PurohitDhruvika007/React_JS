import React, { createContext, useState } from 'react'
export const CounterContext = createContext();

export default function CounterProvider({ children }) {
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1)
    }
    const decrement = () => {
        setCount(count - 1)
    }
    const multiply = () => {
        setCount(count * 2)
    }
    const divide = () => {
        setCount(count / 2)
    }
    return (

        <CounterContext.Provider value={{ count, increment, decrement, multiply, divide }}>
            {children}
        </CounterContext.Provider>

    )
}
