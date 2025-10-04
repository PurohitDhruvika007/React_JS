import { configureStore } from "@reduxjs/toolkit";
import TodoReducers from '../Slices/TodoSlices/TodoSlices'

const store = configureStore({
    reducer: {
        todos: TodoReducers,
    },
});

export default store;