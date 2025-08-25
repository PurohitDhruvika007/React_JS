import React, { useRef, useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [user, setUser] = useState({});
  // const email=useRef("");
  // const name=useRef("");
  // const phone=useRef("");
  // const query=useRef("");
  // const submit_data=()=>{
  //     if(name.current.value!=="")
  //     {
  //          alert(`name ${name.current.value} submitted successfully!`)
  //          name.current.value="";
  //     }
  //     if(email.current.value!=="")
  //     {
  //          alert(`email ${email.current.value} submitted successfully!`)
  //          email.current.value="";
  //     }
  //     if(phone.current.value!=="")
  //     {
  //          alert(`phone ${phone.current.value} submitted successfully!`)
  //          phone.current.value="";
  //     }
  //     if(query.current.value!=="")
  //     {
  //          alert(`query ${query.current.value} submitted successfully!`)
  //          query.current.value="";
  //     }

  // }
  const submit_data = () => {
    alert("form submitted successfully");
  };
  const handleData = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const temp = { ...user };
    temp[key] = value;
    setUser(temp);
  };
  return (
    <div id="Contact">
      <h1 className="contact">Contact</h1>
      <div className="contact-box">
        <input
          type="text"
          value={user.name}
          onChange={handleData}
          name="name"
          placeholder="Enter the name..."
        />
        <input
          type="email"
          value={user.email}
          onChange={handleData}
          name="email"
          placeholder="Enter the email..."
        />
        <input
          type="tel"
          value={user.phone}
          onChange={handleData}
          name="phone"
          placeholder="Enter the mobile number..."
        />
        <input
          type="text"
          value={user.query}
          onChange={handleData}
          name="query"
          placeholder="Enter the query..."
        />
        <button onClick={submit_data}>Submit</button>
      </div>
      <div className="output">
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.query}</p>
      </div>
    </div>
  );
}
