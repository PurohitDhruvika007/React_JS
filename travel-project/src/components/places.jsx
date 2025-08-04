import './places.css';
import Data from './data.jsx';
const Places=()=><>
<h1 className='popular' id="places">Popular Places</h1>
<div className="contain" >
    {Data.map((ele)=>(
 <div className="box" key={ele.id}>
            <img src={ele.image} alt="" />
            <h4>{ele.name}</h4>
            <p>{ele.description}</p>
            <h5>{ele.duration}</h5>
           <div className='price'>
             <h4>{ele.price}$</h4>
            <button>Book now</button>
           </div>

        </div>
    )
       
    )}
    <div className="btn-container">
        <button className="btn">View More Places</button>
    </div>
</div>
</>

export default Places;