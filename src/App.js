// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const [mode, setmode] = useState('light');//show whether the dark mode is on or not 
  const togglemode = () => {
    if (mode === 'light') {
      setmode('dark');
      document.body.style.backgroundColor = "black"
    }
    else {
      setmode('light');
      document.body.style.backgroundColor = "white"
    }
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} togglemode={togglemode} />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/about" element={<About mode={mode} togglemode={togglemode} />} />
              <Route path="/" element={<Login mode={mode} togglemode={togglemode} showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup mode={mode} togglemode={togglemode} showAlert={showAlert} />} />
              <Route path="/home" element={<Home mode={mode} togglemode={togglemode} showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
