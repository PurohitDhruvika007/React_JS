import React, { createContext, useState } from 'react'
export const counterContext = createContext();

export default function CounterProvider({ children }) {
    const [count, setCount] = useState(0);
    const [todos, setTodo] = useState([{ id: 0, title: "read a book" }])
    const increament = () => {
        setCount(count + 1)
    }
    const decreament = () => {
        setCount(count - 1)
    }
    const multiply = () => {
        setCount(count * 2)
    }
    const divide = () => {
        setCount(count / 2)
    }
    const addBtn = (title) => {
        setTodo(prev => [...prev, { id: Date.now(), title: title }]);
    }
    const deleteBtn = (index) => {
        setTodo(prev => prev.filter((todo) => todo.id !== index))
    }
    const updateBtn = (index, newTitle) => {
        setTodo(prev =>
            prev.map(todo =>
                todo.id === index ? { ...todo, title: newTitle } : todo
            )
        );
    }
    return (
        <div>
            <counterContext.Provider value={{ count, increament, decreament, divide, multiply, todos, addBtn, deleteBtn, updateBtn }}>
                {children}
            </counterContext.Provider>
        </div>
    )
}
