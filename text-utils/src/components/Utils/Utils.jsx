// -----------------------import library
import './Utils.css';
import {useState} from 'react';
const Utils=()=>{
    // ------------------------usestate
    const [text,setText]=useState("");
    const [i,setI]=useState(0);
    const [array,setArray]=useState(["I like cats","He reads books","She has a dog"]);
    
    const vowels="AEIOUaeiou";
    


    // ------------------------function
    const textFunction=(e)=>setText(e.target.value);
    const addText=()=>{
        setArray([...array,text])
        
    }
    const updateText=(i)=>{
        let temp=[...array];
        temp[i]=text;
        setArray(temp);
    }
    const deleteText=(index)=>{
        let temp = [...array];
        temp.splice(index,1);
        setArray([...temp]);
    }
    const editText=(index)=>{
        setI(index);
        let temp = [...array];
        setText(temp[index]);
    }
    const countWords=(element)=>{
       return (element.split(" ")).length;
    }
    const countTime=(element)=>{
        return ((element.split(" ")).length)*0.25;
    }
    const countVowels=(element)=>{
        return element.split("").filter(ch => vowels.includes(ch)).length;
    }

    const countConsonants = (element) => {
        return element
            .split("")
            .filter(ch => /[A-Za-z]/.test(ch) && !vowels.includes(ch))
            .length;
    };
    
    // --------------------------return component
    return (
        <>
        <h1>TEXT UTILS</h1>
        <textarea id="input" placeholder='Enter the text...' value={text} onChange={textFunction}></textarea>
        <button className='add' onClick={addText}>Add</button>
        <button className='update' onClick={()=>updateText(i)}>Update</button>

        <div className="cards-wrapper">
  {array.map((element,index)=>(
    <div key={index} className='card-container'>
      <div className='card'>
        <div className='elements'>
          <h3 className='main-name'>{element}</h3>
          <p>no.of characters : {element.length}</p>
          <p>no. of words : {countWords(element)}</p>
          <p>uppercase : {element.toUpperCase()}</p>
          <p>lowercase : {element.toLowerCase()}</p>
          <p>read time : {countTime(element)}s</p>
          <p>no of vowels : {countVowels(element)}</p>
          <p>no of consonent : {countConsonants(element)}</p>
          <button className='delete' onClick={()=>deleteText(index)}>Delete</button>
          <button className='edit' onClick={()=>editText(index)}>Edit</button>
        </div>
      </div>
    </div>
  ))}
</div>

        </>
    )
}
export default Utils