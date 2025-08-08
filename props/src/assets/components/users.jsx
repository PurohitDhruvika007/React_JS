import "./user.css";

const Users = (props) => {
    return (
        
            <div className="user-container">
                
                    <div className="user-card">
                    <h3>name : {props.name}</h3>
                    <h5>email : {props.email}</h5>
                    <h5>address : {props.address}</h5>
                
                </div>
        </div>
        
    );
}

export default Users;
