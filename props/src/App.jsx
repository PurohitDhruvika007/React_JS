import Users from './assets/components/users.jsx';
import UsersData from './assets/user_data.js'
import './App.css';


const App=()=>{
  return <>
  <div className="main-container">
  {
    UsersData.map((user,index)=>(
      <Users key={index}  name={user.name} email={user.email} address={user.address.city}/>
    ))
  }
  </div>
  </>
}
export default App;