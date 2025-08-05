import { useState } from 'react';
import './counter.css';

const Counter =()=>{
    const [count,setCount] = useState(0);
    return (<>
    <div>
        <div>
        <h1>{count}</h1>
    </div>
    <div className='button'>
        <button onClick={() => setCount(count + 1)}>{count}++</button>
        <button onClick={()=>setCount(count-1)}>{count}--</button>
        <button onClick={()=>setCount(count*2)}>{count}*2</button>
        <button onClick={()=>setCount(count/2)}>{count}/2</button>
    </div>
    </div>
    </>)
}

export default Counter;