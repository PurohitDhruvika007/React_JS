import "./books.css";
import { useState } from "react";

const Books = () => {
  const [bookList, setBookList] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "Pride and Prejudice", author: "Jane Austen" },
    { id: 3, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
  ]);
  const [Title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");

  return (
    <div className="books-wrapper" id="booksApp">
      <h2 className="books-heading">Book Manager</h2>

      <div className="books-input-section" id="inputArea">
        <input
          type="text"
          placeholder="Enter the book name ..."
          id="inputBook"
          className="book-input"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the author name ..."
          id="inputAuthor"
          className="book-input"
          value={Author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button
          className="book-add-btn"
          id="addBookBtn"
          onClick={() => {
            let add_book = { id: Date.now(), title: Title, author: Author };
           if(add_book.title=="" && add_book.author=="")
           {
            alert("book name and author name is required!!");
           }
           else if(add_book.title=="")
           {
            alert("book name is required!!");
           }
           else if(add_book.author=="")
           {
            alert("author name is required!!");
           }
           else
           {
             setBookList([...bookList, add_book]);
           }
          }}
        >
          Add
        </button>
      </div>

      <div className="book-list-section" id="bookList">
        {bookList.map((book, index) => (
          <div className="book-card" key={index} id={`book-${book.id}`}>
            <p className="book-text">
              {book.title} ~ {book.author}
            </p>
            <button
              className="book-delete-btn"
              onClick={() => {
                let temp = bookList.filter((bk) => book.id !== bk.id);
                setBookList(temp);
              }}
            >
              delete
            </button>
            <button
              className="book-update-btn"
              onClick={() => {
              
              }}
            >
              update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
