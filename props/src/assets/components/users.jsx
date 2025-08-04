import UsersData from '../user_data.js'
const Users=()=>{
    return (<>
        
            
            {UsersData.map((user,index)=>(
        
                <div key={index}>
                    <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.address.street}</p> 
                </div>

            ))}
            

        
    </>)
}
export default Users;