import React,{useState,useEffect} from 'react'
import About from '../../components/About/About'
import axios from 'axios';

export default function Home() {

  const[githubData,setGithubData]=useState({});
  useEffect(()=>{
    fetchAPI().then((data) => setGithubData(data))
  },[])
  const fetchAPI=async()=>{
    const res=await axios.get("https://api.github.com/users/PurohitDhruvika007");
    return res.data;
  }
  return (
    <div>
      <About user={githubData}/>
    </div>
  )
}
