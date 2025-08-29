import React, { useState } from 'react'
import './inputData.css'
import DataList from '../dataList/dataList.jsx';

export default function InputData() {
  const date = new Date();
  const [userData, setUserData] = useState({
    userName: "",
    phone: "",
    gender: "male",
    age: "",
    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    doctor: "",
    problem: ""
  });
  const [formList, setFormList] = useState([]);
  const inputHandleData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value.trim() });
  }
  const submitData = (e) => {
    e.preventDefault();
    if (userData.userName != "" && userData.phone != "" && userData.age != "" && userData.problem != "") {
      const arr = [...formList];
      arr.push(userData)
      setFormList(arr);
      console.log(userData);
    }
    else {
      alert("fill all the required feilds")
    }

  }
  return (
    <div className='main'>
      <div className='main-input'>
        <h1>Book an Appointment</h1>
        <div className="form-box">

          <form action="input" className="form" onSubmit={submitData}>
            <label>Fullname : </label>
            <input type="text" onChange={inputHandleData} name="userName" placeholder="enter the fullname" />
            <label>Mobile no. : </label>
            <input type="tel" onChange={inputHandleData} name="phone" placeholder="enter the mobile no." maxLength={10} />
            <div className="gender-age">
              <div className="gender-box">
                <label>Gender</label>
                <div className='gender-options'>
                  <input type="radio" name="gender" onChange={inputHandleData} value="male" defaultChecked />Male
                  <input type="radio" name="gender" onChange={inputHandleData} value="female" />Female
                </div>
              </div>
              <label>Age</label>
              <input type="number" name="age" onChange={inputHandleData} placeholder="enter the age" />
            </div>
            <label>Date : </label>
            <input type="date" onChange={inputHandleData} name="date" />
            <label>Doctor : </label>
            <select name="doctor" onChange={inputHandleData}>
              <option>select doctor:</option>
              <option value="Dr.Agarwal">Dr.Agarwal</option>
              <option value="Dr.panwala">Dr.panwala</option>
              <option value="Dr.walawala">Dr.walawala</option>
              <option value="Dr.patel">Dr.patel</option>
            </select>
            <label>Problem : </label>
            <textarea name="problem" placeholder="enter the problem..." onChange={inputHandleData}></textarea>
            <input type="submit" />
          </form>
        </div>
      </div>
      <div className='main-output'>
        <DataList formList={formList} />
      </div>
    </div>
  )
}
