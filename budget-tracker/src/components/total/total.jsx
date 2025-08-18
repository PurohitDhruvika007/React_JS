import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';

export default function Total() {
    const [history,setHistory]=useState([]);
    const [income,setIncome]=useState(0);

    useEffect(()=>{
        fetchAPI();
},[])

    async function fetchAPI() {
        const res=await axios.get("http://localhost:3000/history");
        const data=res.data;
        setHistory(data)
        totalIncomeExpense(data)
        
    }

    function totalIncomeExpense(data)
    {
        let totalIncome=0
        data.forEach((ele)=>{
                    if(ele.status === "income")
                    {
                        totalIncome+=ele.amount;
                    }
                
           
                        setIncome(totalIncome);

    })
    }
  return (
    <div>
      <h1>total income</h1>
      <p>{income}</p>
    </div>
  )
}
