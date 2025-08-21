import React from 'react'
import './projects.css'

export default function Projects(props) {
    const repositories=props.repos;
  return (
    <div>
      <h1 className='repository'> repositories = {repositories.length}</h1>
      <div className='projects-container'>
        {
        repositories.map((repo,index)=>(
            <div key={index} className="project-card">
                <h4 className='name'>{repo.name}</h4>
                <p className='lang'>{repo.language ?? "main"}</p>
                <button className='check'><a href={repo.html_url}>Check repo</a></button>
            </div>
        ))
      }
      </div>
    </div>
  )
}
