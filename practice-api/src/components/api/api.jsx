import { useEffect,useState } from "react"


export default function API() {

    const [user,setUser]=useState([]);

    useEffect(()=>{
        fetch("http://localhost:3001/user").then(Response=>Response.json()).then(data=>setUser(data))
    })
    
  return (
    <div>
      <h1>fetch API</h1>
      {
        user.map((Ele,index)=>(
            <div key={index}>
                <h3>Name : {Ele.name}</h3>
                <p>email : {Ele.email}</p>
                <p>address : {Ele.address.city}</p>
            </div>
        ))
       
      }
      
    </div>
  )
}
