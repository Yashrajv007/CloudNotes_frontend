import React from 'react'


const About = (props) => {

  return (
    <div className="container" style={{color:props.mode==='light'?'black':'white'}}>
      <p>CloudNotes Web application (also called note-taking app) allow students to:
        Store all notes and important information digitally, usually in a cloud-based storage system.
        Type notes on the device of choice just as one would using pen and paper.
        Add files to their notes to enrich the meaning and context.
        Collaborate and share notes with others instantaneously and in real-time.</p>
    </div>
  )
}

export default About
