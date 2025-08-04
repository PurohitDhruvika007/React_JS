import Review_data from "./review_data";
import './review.css';

const Rewiew=()=><>
    <h1>Reviews from customer</h1>
    {Review_data.map((ele,index)=>(
        <div className="review-box" key={index}>
            <h3>{ele.name}</h3>
            <h4>{ele.location}</h4>
            <h4>Rating : {ele.rating}<i className="ri-star-fill"></i></h4>
            <p> {ele.review}</p>
        </div>
    ))}
    <div className="btn-container">
        <button className="btn">View More rewiews</button>
    </div>
</>

export default Rewiew;