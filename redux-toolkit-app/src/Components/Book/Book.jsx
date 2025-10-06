import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, removeBook, updateBook, addToFavlist, removeFromFavlist } from '../../Slices/BookSlice.js'

export default function Book() {
    const dispatch = useDispatch()
    const bookRef = useRef("");
    const { books, totalBooks, favList } = useSelector((state) => state.books)
    return (
        <div>
            <h1>Book Manager</h1>
            <h5>Total Books : {totalBooks}</h5>
            <input type="text" placeholder='Enter the book..' ref={bookRef} />
            <h1>Book List:</h1>
            <button onClick={() => { dispatch(addBook(bookRef.current.value)) }}>Add</button>
            {
                books.map((book, index) => (
                    <div key={index}>
                        <p>{book}</p>
                        <button onClick={() => { dispatch(removeBook(index)) }}>Remove</button>
                        <button onClick={() => {
                            dispatch(updateBook({ index: index, value: bookRef.current.value }))
                        }}>Update</button>
                        <button onClick={() => {
                            dispatch(addToFavlist(book))
                        }}>Add To Favorites</button>
                    </div>
                ))
            }
            <h1>Favorite List:</h1>
            {
                favList.map((favorite, index) => (
                    <div key={index}>
                        <p>{favorite}</p>
                        <button onClick={() => { dispatch(removeFromFavlist(index)) }}>Remove from favorites</button>
                    </div>
                ))
            }

        </div>
    )
}
