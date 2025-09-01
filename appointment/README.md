# 🏥 React Appointment Booking System

This project is a **React-based Appointment Booking Application** designed to simplify the process of scheduling doctor visits.  
It allows patients to fill out a form with their details and problems, and the app will display all submitted appointments instantly.

---

## 📖 About the Project
Many clinics still rely on manual appointment booking systems. This project was built to **demonstrate how a digital solution can make the process faster, more reliable, and user-friendly**.  

The app consists of two major parts:
1. **Input Form** → where patients can book an appointment.  
2. **Data List Section** → where all booked appointments are displayed dynamically.  

It’s a **frontend-only project** for now, but it’s structured in such a way that it can be easily connected to a backend in the future.

---

## 🎯 Key Highlights
- 📝 **Patient Form** collects name, phone, gender, age, appointment date, selected doctor, and health problem.  
- 🔍 **Validation** ensures that important fields like name, phone, age, and problem cannot be left blank.  
- 📊 **Real-time Data Display**: Each appointment instantly shows up in the list section.  
- 📱 **Responsive Layout**: Works smoothly on desktops and mobiles.  
- ✨ **Modern UI**: Clean, minimal, and easy-to-use interface.

---

## 🛠️ Tools & Technologies
- **React.js** → For building UI components.  
- **CSS Modules** → For styling form and data list sections.  
- **JavaScript (ES6+)** → Logic and state handling.  
- **HTML5** → Base structure.  

---

## 📂 Components Overview
- **InputData.jsx** → Manages the form, handles validation, and collects user input.  
- **DataList.jsx** → Displays submitted appointments in a structured way.  
- **CSS files** → Provide styles for both input and list components.  

---

## 🚀 How It Works
1. User fills in the form with personal details and problem description.  
2. On submitting, data is validated. If fields are empty, an alert is shown.  
3. Valid data is stored in the **state** and passed to the `DataList` component.  
4. The `DataList` dynamically renders each appointment as a card-like display.  

---

## 📂 Project Structure
<pre>📦 appointment-booking
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 inputData
 ┃ ┃ ┃ ┣ InputData.jsx
 ┃ ┃ ┃ ┗ inputData.css
 ┃ ┃ ┣ 📂 dataList
 ┃ ┃ ┃ ┣ DataList.jsx
 ┃ ┃ ┃ ┗ dataList.css
 ┃ ┗ App.js
 ┗ README.md</pre>

---

## 🎥video

https://github.com/user-attachments/assets/854b7493-6853-4e27-99f6-38b2f5a42058

