import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';




const Navbar = (props) => {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">CloudNotes</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`}  aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}  to="/about">About</Link>
              </li>
            </ul>
            <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`} onClick={props.togglemode}>
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              
            </div><label className="form-check-label" for="flexSwitchCheckDefault" style={{color:props.mode==='light'?'black':'white',marginRight:"5px"}}>enable dark mode</label>
            
            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-1" to='/' role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to='/signup' role="button">SignUp</Link>
            </form> : <button onClick={handleLogout} className='btn btn-primary '>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
