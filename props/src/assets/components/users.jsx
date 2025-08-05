import "./user.css";
import UsersData from '../user_data.js'

const Users = () => {
    return (
        <div className="user-container">
            {UsersData.map((user, index) => (
                <div className="user-card" key={index}>
                    <h3>name : {user.name}</h3>
                    <h5>email : {user.email}</h5>
                    <h5>address : {user.address.street}</h5>
                </div>
            ))}
        </div>
    );
}

export default Users;
