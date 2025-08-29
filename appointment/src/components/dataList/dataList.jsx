import React from 'react'
import './dataList.css'

export default function DataList(props) {
  return (
    <div>
      <h1>Data list</h1>
      <div className="data-list">

        {
          props.formList.length === 0 ? (
            <p>No data yet</p>
          ) : (
            props.formList.map((form, index) => (
              <div key={index} className="data-card">
                <h2>{form.userName}</h2>
                <p>Phone : {form.phone}</p>
                <p>Gender : {form.gender}</p>
                <p>Age : {form.age}</p>
                <p>Date : {form.date}</p>
                <p>Doctor : {form.doctor}</p>
                <p>Problem : {form.problem}</p>

              </div>
            )))}
      </div>
    </div>
  )
}
