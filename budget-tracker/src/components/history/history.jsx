import { useEffect,useState } from "react";
import axios from 'axios';

function History() {
 
    
    const [history,setHistory]=useState([]);

    useEffect(()=>{
        async function fetchApi()
    {
        try
        {
            const res = await axios.get("http://localhost:3000/history");
        const data=res.data;
        setHistory(data);
        }
        catch(e)
    {
        console.log("error is ",e);
    }

    }
        
        fetchApi();})
    
    return (
        <>
        <h1>home page</h1>
        {
            history.map((transaction,index)=>(
                <div key={index}>
                    <p>{transaction.category}-{transaction.status}-{transaction.amount}$</p>
                </div>
            ))
        }
        </>
    )
    

}
export default History
