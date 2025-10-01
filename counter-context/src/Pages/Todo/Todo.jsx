import React, { useContext, useState } from 'react';
import { counterContext } from '../../context/CounterProvider';
import './Todo.css';

export default function Todo() {
    const { todos, addBtn, deleteBtn, updateBtn } = useContext(counterContext);
    const [title, setTitle] = useState("");
    const [id, setId] = useState(null);

    const handleSubmit = () => {
        if (!title.trim()) return;

        if (id !== null) {
            updateBtn(id, title);
            setId(null);
        } else {
            addBtn(title);
        }

        setTitle("");
    };

    return (
        <div className="todo-container">
            <h1 className="todo-heading">Todo List</h1>

            <div className="todo-input-group">
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="todo-input"
                />
                <button className="btn btn-add" onClick={handleSubmit}>
                    {id !== null ? "Update" : "Add"}
                </button>
            </div>

            <div className="todo-list">
                {todos.map(todo => (
                    <div className="todo-item" key={todo.id}>
                        <span className="todo-title">{todo.title}</span>
                        <div className="todo-buttons">
                            <button
                                className="btn btn-edit"
                                onClick={() => {
                                    setTitle(todo.title);
                                    setId(todo.id);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-delete"
                                onClick={() => deleteBtn(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
