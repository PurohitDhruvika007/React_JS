import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    books: ["harry poter", "Think and Grow Rich", "Awaken the Giant Within", "Start with Why"],
    favList: [],
    totalBooks: 150,
}
const BookSlice = createSlice({
    name: "book",
    initialState: initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload)
        },
        removeBook: (state, action) => {
            state.books.splice(action.payload, 1)
        },
        updateBook: (state, action) => {
            const { index, value } = action.payload;
            state.books[index] = value;
        },
        addToFavlist: (state, action) => {
            state.favList.push(action.payload)
        },
        removeFromFavlist: (state, action) => {
            state.favList.splice(action.payload, 1)
        }
    }
})

export default BookSlice.reducer;
export const { addBook, removeBook, updateBook, addToFavlist, removeFromFavlist } = BookSlice.actions; 