import { createContext, useState } from 'react'
const TodoContext = createContext();

export default function Todoprovider({ children }) {
    const [todo, setTodo] = useState([]);
    return (
        <TodoContext.Provider value={todo}>
            {children}
        </TodoContext.Provider>
    )
}
