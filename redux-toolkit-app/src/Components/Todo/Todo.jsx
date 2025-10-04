import React from 'react'
import './Todo.css'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo } from '../../Slices/TodoSlices/TodoSlices';

export default function Todo() {
    const dispatch = useDispatch();
    const { todos, message } = useSelector((state) => state.todos)
    return (
        <div>
            <h1>Todo app</h1>
            {message}
            {
                todos.map((todo, index) => (
                    <div key={index}>
                        <h1>{todo}</h1>
                    </div>
                ))
            }
            <button onClick={() => { dispatch(addTodo("task1")) }}>Add</button>
            <button onClick={() => { dispatch(removeTodo()) }}>Remove</button>
        </div>
    )
}
