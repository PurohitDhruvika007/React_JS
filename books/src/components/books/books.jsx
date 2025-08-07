import { useState } from "react";
import "./books.css";
const Books = () => {
  const [books, setBooks] = useState([
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
    },
    {
      title: "1984",
      author: "George Orwell",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
    },
  ]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [i, setI] = useState(0);
  function addBook() {
    let newBook = { title: title, author: author };
    if (title == "" && author == "") {
      alert("title and author both are required !!");
    } else if (title == "") {
      alert("title is required !!");
    } else if (author == "") {
      alert("author is required !!");
    } else {
      setBooks([...books, newBook]);
    }
  }
  function deleteBook(index) {
    let temp = [...books];
    temp.splice(index, 1);
    setBooks(temp);
  }
  function editBook(index) {
    setI(index);
    setTitle(books[index].title);
    setAuthor(books[index].author);
  }
  function updateBook(index) {
    let temp = [...books];
    temp[index].title = title;
    temp[index].author = author;
    setBooks(temp);
  }
  return (
    <div className="books-wrapper" id="booksApp">
      <h2 className="books-heading">Book Manager</h2>
      <input
        type="text"
        placeholder="Enter the book name ...."
        id="inputBook"
          className="book-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter the author name ...."
        id="inputAuthor"
          className="book-input"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button className="book-add-btn"
          id="addBookBtn" onClick={() => addBook()}>Add</button>
      <button
      className="book-add-btn"
          id="updateBookBtn" onClick={() => updateBook(i)}>Update</button>
          <div className="book-list-section" id="bookList">
      {books.map((book, index) => (
        <div className="book-card" key={index}>
          <p className="book-text">
            {book.title} ~ {book.author}
          </p>
          <div className="main-btn">
            <button  className="book-delete-btn" onClick={() => deleteBook(index)}>Delete</button>
          <button className="book-update-btn" onClick={() => editBook(index)}>Edit</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Books;
