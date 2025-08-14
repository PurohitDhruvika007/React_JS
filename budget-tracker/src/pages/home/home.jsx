import { useEffect,useState } from "react"

const Home=()=>{
    const [history,setHistory]=useState([]);
    useEffect(()=>(fetchApi()))
    function fetchApi()
    {
        fetch("http://localhost:3000/category").then(Response=>Response.json()).then(data=>setHistory(data))
    }
    return (
        <>
        <h1>home page</h1>
        {
            history.map((transaction,index)=>(
                <div key={index}>
                    {/* <p>{transaction.category} {transaction.amount}$</p> */}
                    
                    <p>{transaction.id} {transaction.name}</p>
                </div>
            ))
        }
        </>
    )
}
export default Home