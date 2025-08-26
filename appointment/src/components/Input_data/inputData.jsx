import React, { useState } from 'react'
import './inputData.css'

export default function InputData() {
    const [userData,setUserData]=useState({
        name:"",
        phone:"",
        gender:"",
        age:"",
        date:"",
        doctor:"",
        problem:""
    });
    const inputHandleData=(e)=>{
        const{key:value}=e.target;
        const newData=[...userData,{[key]:value}]
        setUserData(newData);
    }
  return (
    <div>
      <h1>Book an Appointment</h1>
      <div className="form-box">
        <form action="input" className="form">
            <label>Fullname : </label>
            <input type="text" name="name" placeholder="enter the fullname"/>
            <label>Mobile no. : </label>
            <input type="tel" name="phone" placeholder="enter the mobile no." maxLength={10}/>
            <div className="gender-age">
                <div className="gender-box">
                    <label>Gender</label>
            <div className='gender-options'>
                <input type="radio" name="gender" />Male
            <input type="radio" name="gender" />Female
            </div>
                </div>
            <label>Age</label>
            <input type="number" name="age" placeholder="enter the age"/>
            </div>
            <label>Date : </label>
            <input type="date" name="date" />
            <label>Doctor : </label>
            <select name="doctor">
                <option>select doctor:</option>
                <option>Dr.Agarwal</option>
                <option>Dr.panwala</option>
                <option>Dr.walawala</option>
                <option>Dr.patel</option>
            </select>
            <label>Problem : </label>
            <textarea name="problem" placeholder="enter the problem..."></textarea>
            <input type="submit" />
            </form>
      </div>
    </div>
  )
}
