import React from 'react'
import './About.css'

export default function About(props) {
  const{name,bio,avatar_url}=props.user;
  return (
    <section className='about-section'>
      <div className="about">
        <div className="content">
        <h1>{name}</h1>
      <h4>{bio}</h4>
      <p>Hi, I’m Dhruvika Purohit, a passionate Web Developer & Python Enthusiast. I love building responsive websites and scalable applications using HTML, CSS, JavaScript, React, Python, and SQL. Along with coding, I also have skills in Adobe Photoshop, Git, GitHub, and VS Code, which help me combine creativity with technology. My goal is to create impactful projects that deliver great user experiences.</p>
      <div className="btn">
        <button><a href="https://www.linkedin.com/in/dhruvika-purohit-09b69a363/">LinkedIn</a></button>
        <button><a href="https://github.com/PurohitDhruvika007">Github</a></button>
      </div>
      </div>
      <div className="image">
        <img src={avatar_url} alt="" />
      </div>
      
      </div>
    </section>
  )
}
