import { createSlice } from '@reduxjs/toolkit'
const TodoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: [],
        message: "hello this is redux toolkit"
    },
    reducers: {
        addTodo: (state, action) => {
            const data = action.payload;
            state.todos.push(data);
        },
        removeTodo: (state, action) => {
            state.todos.pop();
        },
        updateTodo: (state, action) => {

        }
    }
})

export default TodoSlice.reducer;
export const { addTodo, removeTodo, updateTodo } = TodoSlice.actions;