import React from 'react'

import Notes from './Notes';


const Home = (props) => {
  const {showAlert,mode,togglemode}=props;
  return (
    <div>
      
      <Notes mode={mode} togglemode={togglemode} showAlert={showAlert} />
    </div>
  )
}

export default Home;
