# ⚛️ React Context Counter App

A **simple yet powerful counter application** built with **React** and **Context API**, demonstrating **global state management** without prop drilling. Perform arithmetic operations on a counter with a clean, responsive UI.  

---

## 🚀 Features

- 🔼 **Increment / Decrement**: Increase or decrease the counter by 1  
- ✖️ **Multiply / Divide**: Multiply or divide the counter by 2  
- 🌐 **Global State**: Managed with **React Context API**  
- 🎨 **Clean UI**: Minimalistic and responsive design  
- ♻️ **Reusable & Scalable**: Easy to extend with additional functionality  

---

## 🛠️ Tech Stack

- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) **React** – Frontend library  
- ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white) **CSS** – Styling and layout  
- ⚡ **Context API** – Global state management  

---

## 📂 Folder Structure

<pre>src/
├── App.js
├── App.css
├── context/
│   └── CounterProvider.jsx
└── Pages/
    └── Home/
        ├── Home.jsx
        └── Home.css
</pre>
---

## ⚙️ How It Works

- `CounterProvider` uses `useState` and `createContext` to create a **global counter state**.  
- `Home` component accesses the counter via `useContext(CounterContext)`.  
- Buttons update the counter using `setCount()`.  
- Any component inside `CounterProvider` can use the counter state without **prop drilling**.


## 🎥video
https://github.com/user-attachments/assets/7adf1f6a-3a06-4622-9c0d-0440e4617fb3

