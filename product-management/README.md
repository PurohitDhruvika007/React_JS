# 🌐 Web Product Management App

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux&logoColor=white)](https://redux.js.org/)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)

A **React JS Web Product Management App** to manage products dynamically with CRUD operations, sorting, filtering, searching, and user authentication. Fully responsive UI with Bootstrap and a JSON Server backend.  

The app is **deployed on Vercel** for live testing.  

🔗 **Live Demo:** [Click Here](https://productmanagement-rho.vercel.app/)  

---

## 📝 Project Overview

This project is a **Product Management Web Application** built using React JS, Redux, and JSON Server. Users can:

- View a list of products  
- Add new products  
- Update existing products  
- Delete products  
- Search, sort, and filter products  
- Authenticate users for restricted access  

The application is fully responsive and uses Bootstrap and custom CSS for a modern UI.

---

## 📂 Project Structure

The project is organized into reusable components and Redux slices for state management:
<pre>
  src/
├── components/
│ ├── Navbar/ # Navigation bar
│ ├── ProductList/ # Product list page
│ ├── ProductForm/ # Add / Update Product Form
│ ├── ProductItem/ # Single product card
│ └── PrivateRoute/ # Authentication guard
├── slices/
│ ├── ProductSlice.js # Redux slice for products
│ └── userSlice.js # Redux slice for authentication
├── App.jsx # React router setup
└── index.js # Entry point
</pre>

---

## ⚙️ Features

### 1. **Product List**
- Display all products in a responsive card layout.
- Supports dynamic fetching from Redux store and JSON Server.
- Sorting by price (low to high / high to low).  
- Search by product title.  
- Filter by category.  

### 2. **Add / Update Product**
- Fully responsive form with input validation.
- Add new products with title, price, category, and image URL.  
- Update existing products using product ID.  
- Image preview before submitting.

### 3. **Delete Product**
- Remove products with confirmation modal.  
- Update Redux store and JSON Server backend.  

### 4. **User Authentication**
- Sign in with email/password (mock or Redux state).  
- Google Sign-in support.  
- Restrict add, update, delete operations for unauthorized users.  

### 5. **Navbar**
- Links for **Home**, **Add Product**, and **Logout**.  
- Fully responsive and styled with CSS & Bootstrap.

### 6. **Responsive Design**
- Mobile-first layout with Flexbox and CSS Grid.
- Works on desktop, tablet, and mobile screens.  

---

## 🛠️ Technologies Used

- **Frontend:** React JS, Redux, React Router, Bootstrap 5, CSS  
- **Backend:** JSON Server for REST API simulation  
- **Deployment:** Vercel  
- **State Management:** Redux Toolkit (Slices, Thunks)  

---
 
### live demo:- https://productmanagement-rho.vercel.app/
