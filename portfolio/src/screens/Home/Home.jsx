import React,{useState,useEffect} from 'react'
import About from '../../components/About/About'
import axios from 'axios';
import Projects from '../../components/Projects/Projects';
import Contact from '../../components/Contact/Contact';

export default function Home() {

  const[githubData,setGithubData]=useState({});
  const[githubRepo,setGithubRepo]=useState([]);
  useEffect(()=>{
    fetchAPI().then((data) => setGithubData(data));
    fetchRepo().then((data)=>setGithubRepo(data));
  },[])
  const fetchAPI=async()=>{
    const res=await axios.get("https://api.github.com/users/PurohitDhruvika007");
    return res.data;
  }
  const fetchRepo=async()=>{
    const res=await axios.get("https://api.github.com/users/PurohitDhruvika007/repos");
    return res.data;
  }
  return (
    <div id="Home">
      <About user={githubData}/>
      <Projects repos={githubRepo}/>
      <Contact/>
    </div>
  )
}
