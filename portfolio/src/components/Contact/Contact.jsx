import React, { useRef } from 'react'
import './Contact.css'

export default function Contact() {
    const email=useRef("");
    const name=useRef("");
    const phone=useRef("");
    const query=useRef("");
    const submit_data=()=>{
        if(name.current.value!=="")
        {
             alert(`name ${name.current.value} submitted successfully!`)
             name.current.value="";
        }
        if(email.current.value!=="")
        {
             alert(`email ${email.current.value} submitted successfully!`)
             email.current.value="";
        }
        if(phone.current.value!=="")
        {
             alert(`phone ${phone.current.value} submitted successfully!`)
             phone.current.value="";
        }
        if(query.current.value!=="")
        {
             alert(`query ${query.current.value} submitted successfully!`)
             query.current.value="";
        }
         
    }
  return (
    <div id="Contact">
      <h1 className='contact'>Contact</h1>
      <div className="contact-box">
        <input type="text" placeholder='Enter the name...' ref={name}/>
        <input type="email" placeholder='Enter the email...' ref={email}/>
        <input type="tel" placeholder='Enter the mobile number...' ref={phone}/>
          <input type="text" placeholder='Enter the query...' ref={query}/>
          <button onClick={submit_data}>Submit</button>
      </div>
    </div>
  )
}
